import { Link } from '../lib/router';
import { SITE, ROUTES, mailto } from '../lib/site';
import { FEATURE_CATALOG, DEFAULT_FREE_PLAN, DEFAULT_PLANS, galleryLabel } from '../lib/plans';
import { Check, Minus, ArrowRight, HelpCircle } from 'lucide-react';
import { PLAN_SLUGS } from '../lib/planSlugs';

const FAQ = [
  {
    q: 'Do I need a webcam to use Scribble Air Draw?',
    a: 'Yes — the camera feed is the canvas. Any laptop or desktop with a working webcam and a modern browser (Chrome, Edge, Safari) is enough. A phone works too, but a larger screen is more comfortable for drawing.',
  },
  {
    q: 'Is my video ever uploaded?',
    a: 'No. Hand tracking runs entirely in your browser, and the camera frames are never sent to us or to anyone else. We store the strokes you draw, not the video. See the Privacy Policy for the detail.',
  },
  {
    q: 'How does payment work?',
    a: `Pro is a one-time payment per plan, processed by Razorpay — UPI, card or netbanking. Nothing renews automatically, so you are never charged twice by surprise. Payments are made in INR (₹).`,
  },
  {
    q: 'What happens when my Pro period ends?',
    a: 'Your account drops back to the Free plan: you keep every drawing you have made, you can still draw, and you keep up to 3 drawings in the gallery. Nothing is deleted.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes — if Pro does not work for you, email us within 7 days of purchase and we will look at it straight away. The full policy is on the Refund Policy page.',
  },
  {
    q: 'Do you offer student or team pricing?',
    a: 'We do. Write to us with a short note about what you need and we will work something out.',
  },
];

export default function PricingPage() {
  const plans = [DEFAULT_FREE_PLAN, ...DEFAULT_PLANS];
  const featured = 'yearly';

  return (
    <>
      <section className="lp-wrap lp-pagehead">
        <span className="lp-eyebrow">Pricing</span>
        <h1 className="lp-h1 lp-pagehead-h1">Free to draw. Pro when you want more.</h1>
        <p className="lp-lead lp-pagehead-lead">
          Drawing in the air costs nothing and always will. Pro adds the tools that turn a quick
          sketch into a proper drawing — one simple payment, no auto-renewal, cancel any time.
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-plangrid">
          {plans.map((plan) => {
            const isFeatured = plan.id === featured;
            const slug = PLAN_SLUGS[plan.id as keyof typeof PLAN_SLUGS];
            return (
              <div key={plan.id} className={'lp-plan' + (isFeatured ? ' lp-plan--pro' : '')}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span className="lp-plan-name">{plan.label}</span>
                  {plan.free ? (
                    <span className="lp-plan-tag">FREE</span>
                  ) : (
                    isFeatured && <span className="lp-plan-tag">BEST VALUE</span>
                  )}
                </div>

                <div className="lp-plan-price">
                  ₹{plan.amount}
                  <small>/ {plan.id === 'monthly' ? 'month' : 'year'}</small>
                </div>
                <div className="lp-plan-desc">{plan.description}</div>

                <div className="lp-plan-list">
                  {FEATURE_CATALOG.map((f) => {
                    const on = plan.features[f.key];
                    return (
                      <div key={f.key} className={'lp-plan-feat' + (on ? '' : ' lp-plan-feat--off')}>
                        {on ? (
                          <Check size={15} style={{ color: isFeatured ? '#ffcf9e' : 'var(--emerald-deep)' }} />
                        ) : (
                          <Minus size={15} style={{ opacity: 0.5 }} />
                        )}
                        <span style={{ textDecoration: on ? 'none' : 'line-through' }}>{f.label}</span>
                      </div>
                    );
                  })}
                  <div className={'lp-plan-feat' + (plan.galleryLimit === -1 ? '' : ' lp-plan-feat--off')}>
                    {plan.galleryLimit === -1 ? (
                      <Check size={15} style={{ color: isFeatured ? '#ffcf9e' : 'var(--emerald-deep)' }} />
                    ) : (
                      <Minus size={15} style={{ opacity: 0.5 }} />
                    )}
                    <span style={{ textDecoration: plan.galleryLimit === -1 ? 'none' : 'line-through' }}>
                      {galleryLabel(plan.galleryLimit)}
                    </span>
                  </div>
                </div>

                <Link
                  to={ROUTES.home}
                  className={`lp-btn ${isFeatured ? 'lp-btn-warm' : plan.free ? 'lp-btn-ghost' : 'lp-btn-primary'}`}
                  style={{ marginTop: 'auto' }}
                >
                  {plan.free ? 'Start free' : `Get Pro · ₹${slug.rupees}`}
                  <ArrowRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="lp-muted lp-center" style={{ marginTop: 26 }}>
          One-time payment · No auto-renewal · Paid securely via Razorpay (UPI, card, netbanking) ·{' '}
          <Link to={ROUTES.terms} style={{ textDecoration: 'underline' }}>
            Terms
          </Link>{' '}
          ·{' '}
          <Link to={ROUTES.refundPolicy} style={{ textDecoration: 'underline' }}>
            Refund policy
          </Link>
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-tablecard">
          <h2 className="lp-h3" style={{ marginBottom: 16 }}>
            Everything, side by side
          </h2>
          <div className="lp-tablewrap">
            <table className="lp-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col">Pro · Monthly</th>
                  <th scope="col">Pro · Yearly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Draw with hand tracking</th>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                </tr>
                <tr>
                  <th scope="row">Daily challenge &amp; friends</th>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                </tr>
                <tr>
                  <th scope="row">Group battles</th>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                </tr>
                {FEATURE_CATALOG.filter((f) => f.key !== 'battles').map((f) => (
                  <tr key={f.key}>
                    <th scope="row">{f.label}</th>
                    <td><Minus size={15} style={{ opacity: 0.45 }} /></td>
                    <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                    <td><Check size={15} style={{ color: 'var(--leaf)' }} /></td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Saved drawings</th>
                  <td style={{ textAlign: 'center' }}>{galleryLabel(DEFAULT_FREE_PLAN.galleryLimit)}</td>
                  <td style={{ textAlign: 'center' }}>Unlimited</td>
                  <td style={{ textAlign: 'center' }}>Unlimited</td>
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td style={{ textAlign: 'center' }}>₹0</td>
                  <td style={{ textAlign: 'center' }}>₹{PLAN_SLUGS.monthly.rupees}</td>
                  <td style={{ textAlign: 'center' }}>₹{PLAN_SLUGS.yearly.rupees}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div style={{ maxWidth: '38rem' }}>
          <span className="lp-eyebrow">
            <HelpCircle size={13} /> Questions
          </span>
          <h2 className="lp-h2" style={{ marginTop: 14 }}>
            Before you decide.
          </h2>
        </div>
        <div className="lp-faq">
          {FAQ.map((item) => (
            <details key={item.q} className="lp-faqitem">
              <summary>{item.q}</summary>
              <p className="lp-body" style={{ marginTop: 8 }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <div className="lp-cta">
          <h2 className="lp-h2" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}>
            Still deciding? Start free.
          </h2>
          <p className="lp-lead" style={{ marginTop: 14, color: 'rgba(255,246,236,0.8)' }}>
            No card, no trial clock. Allow camera access and the first line is a second away.
          </p>
          <div className="lp-cta-actions">
            <Link to={ROUTES.home} className="lp-btn lp-btn-warm">
              Get Started
              <ArrowRight size={16} />
            </Link>
            <a className="lp-btn lp-btn-warm" href={mailto(SITE.supportEmail, `${SITE.product} — pricing question`)}>
              Ask a question
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
