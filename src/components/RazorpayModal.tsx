import { useState } from 'react';
import { useSession } from '@clerk/clerk-react';
import { BILLING_APP_SLUG, CHECKOUT_MERCHANT_NAME, CHECKOUT_THEME } from '../lib/planSlugs';

interface Props {
  title: string;
  description: string;
  amount: number; // rupees, as shown to the customer
  /** Plan slug the server looks up: `monthly` | `yearly`. */
  planId: string;
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
}

type Step = 'review' | 'processing' | 'success' | 'failed';

const RAZORPAY_SCRIPT_ID = 'razorpay-checkout-script';
const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    const existing = document.getElementById(RAZORPAY_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = RAZORPAY_SCRIPT_ID;
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(Boolean((window as any).Razorpay));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Thin wrapper around Razorpay Checkout.
 *
 * The order is always created server-side first (POST /api/create-order with
 * the plan slug), so the amount, currency and receipt are decided by our own
 * plan record — never by whatever the browser sends. Card and bank details are
 * entered on Razorpay's own frame and never touch this app.
 */
export default function RazorpayModal({ title, description, amount, planId, onClose, onSuccess }: Props) {
  const { session } = useSession();
  const [step, setStep] = useState<Step>('review');
  const [errorMessage, setErrorMessage] = useState('');

  async function pay() {
    setErrorMessage('');
    setStep('processing');

    try {
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const orderData = await orderResponse.json().catch(() => ({}));
      if (!orderResponse.ok || !orderData.orderId || !orderData.keyId) {
        throw new Error(orderData.error || `Payment server returned HTTP ${orderResponse.status}`);
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !(window as any).Razorpay) {
        throw new Error('Razorpay checkout script failed to load. Check your connection and retry.');
      }

      const razorpay = new (window as any).Razorpay({
        key: orderData.keyId,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: CHECKOUT_MERCHANT_NAME,
        description: title,
        prefill: {
          email: session?.user?.emailAddresses?.[0]?.emailAddress || '',
          name: session?.user?.fullName || session?.user?.username || '',
        },
        handler: async (response: any) => {
          try {
            const idToken = await session?.getToken();
            const verificationResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, idToken }),
            });
            const verification = await verificationResponse.json();
            if (!verificationResponse.ok || !verification.verified) {
              throw new Error(verification.error || 'Payment verification failed');
            }
            setStep('success');
            await onSuccess();
            window.setTimeout(onClose, 1200);
          } catch (error) {
            console.error('Razorpay payment verification failed', error);
            setErrorMessage(
              error instanceof Error ? error.message : 'Payment verification failed'
            );
            setStep('failed');
          }
        },
        notes: { app: BILLING_APP_SLUG, plan: planId },
        theme: { color: CHECKOUT_THEME },
        modal: {
          ondismiss: () => setStep('review'),
        },
      });

      razorpay.open();
      setStep('review');
    } catch (error) {
      console.error('Razorpay checkout failed', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start Razorpay Checkout.');
      setStep('failed');
    }
  }

  return (
    <div className="modal-overlay" style={{ zIndex: 90 }}>
      <div
        style={{
          width: 360,
          maxWidth: '92vw',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          background: 'var(--modal-bg)',
          backdropFilter: 'blur(28px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.3)',
          border: '1px solid var(--panel-border)',
          color: 'var(--text)',
          fontFamily: 'var(--font)',
          boxShadow: 'var(--shadow-float), var(--glass-hi)',
        }}
      >
        <div
          style={{
            background:
              'radial-gradient(120% 140% at 12% 0%, rgba(245,158,75,0.34), transparent 62%), linear-gradient(155deg, #241a15, #3a2a20)',
            padding: '16px 18px',
            color: '#fff8f2',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: 'linear-gradient(150deg, #f79a4a, #c2410c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                R
              </div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Razorpay</span>
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: 'rgba(255,246,236,0.82)' }}>{title}</div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 2, letterSpacing: '-0.03em' }}>₹{amount}</div>
        </div>

        <div style={{ padding: 18 }}>
          {step === 'review' && (
            <>
              <div style={{ fontSize: 11.5, color: 'var(--text-dim)', marginBottom: 12 }}>{description}</div>
              <button
                onClick={pay}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 'var(--r-btn)',
                  border: 'none',
                  background: 'var(--emerald-deep)',
                  color: '#fff8f2',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'var(--font)',
                  boxShadow: 'var(--shadow-cta)',
                }}
              >
                {`Pay ₹${amount} securely`}
              </button>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 10, lineHeight: 1.5 }}>
                UPI, cards and netbanking are all accepted on Razorpay's secure checkout. Your card
                details are entered on Razorpay and never reach this app.
              </div>
              <div
                onClick={onClose}
                style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-faint)', marginTop: 12, cursor: 'pointer' }}
              >
                Cancel
              </div>
            </>
          )}

          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  margin: '0 auto 14px',
                  borderRadius: '50%',
                  border: '3px solid var(--card-border)',
                  borderTopColor: 'var(--emerald)',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <div style={{ fontSize: 12.5, color: 'var(--text-dim)' }}>Opening Razorpay Checkout…</div>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  margin: '0 auto 12px',
                  borderRadius: '50%',
                  background: 'var(--leaf)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                ✓
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Payment successful</div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>Unlocking Pro…</div>
            </div>
          )}

          {step === 'failed' && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  margin: '0 auto 12px',
                  borderRadius: '50%',
                  background: 'var(--clay)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                !
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Payment couldn't start</div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2, wordBreak: 'break-word' }}>
                {errorMessage || 'Please try again.'}
              </div>
              <button
                onClick={() => {
                  setErrorMessage('');
                  setStep('review');
                }}
                style={{
                  width: '100%',
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 'var(--r-btn)',
                  border: 'none',
                  background: 'var(--emerald-deep)',
                  color: '#fff8f2',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'var(--font)',
                  boxShadow: 'var(--shadow-cta)',
                }}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
