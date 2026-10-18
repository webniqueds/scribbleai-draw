import { SITE, ROUTES, mailto } from '../lib/site';
import { Link } from '../lib/router';
import { RotateCcw, Clock, FileText, AlertTriangle } from 'lucide-react';

interface Section {
  title: string;
  body: string[];
}

const SECTIONS: Section[] = [
  {
    title: '1. Scope',
    body: [
      `This Refund Policy applies to paid "Pro" plans of ${SITE.product} bought by individuals through the in-app checkout. It sits alongside our Terms & Conditions; if you are a consumer within the meaning of the Consumer Protection Act, 2019, your statutory rights are unaffected and nothing here limits them.`,
      'The Free plan is not a purchase and is not refundable. Amounts are in Indian Rupees (₹) and include any tax shown at checkout.',
    ],
  },
  {
    title: '2. Pro is a one-time payment',
    body: [
      'Pro does not auto-renew. Paying once buys access for the period you chose (one month or one year) and nothing charges again on its own, so there is no subscription to cancel in advance.',
      'If you want to stop using Pro, you can end the paid period at any time from inside the app. Access stays active until the end of the period you have already paid for.',
    ],
  },
  {
    title: '3. When we refund in full',
    body: [
      `Technical failure — Pro features do not work on a browser and device we support, and we cannot fix it for you. Ask within seven (7) days of the payment and we will either fix it or refund you in full.`,
      'Duplicate or wrong charge — you were charged twice, or charged for a plan you did not select. Tell us and the duplicate or incorrect amount is refunded in full.',
      'Accidental purchase — you bought Pro by mistake and have not used any Pro-only feature. Ask within seven (7) days of the payment.',
      'Chargeback risk on our side — if Razorpay, your bank or our own systems take the payment back, the full amount is returned to you automatically.',
    ],
  },
  {
    title: '4. When we cannot refund',
    body: [
      'More than seven (7) days have passed since the payment and no qualifying problem remains.',
      'Pro-only features have been used (templates, transparent export, replay, recording, background images) and you are asking for a change of mind. In that case we will happily extend your plan instead.',
      'The request is based on a device or browser we do not support, or on a network or camera setup we have documented as unsupported.',
      'The payment was made by someone who is not the account holder, or the request comes from someone who is not the account holder.',
      'Where a payment was completed, we cannot refund simply because a period has ended. Periods expire as described at checkout.',
    ],
  },
  {
    title: '5. How to request a refund',
    body: [
      `Email ${SITE.billingEmail} with the subject line "Refund request" and include: the email address on your account, the date of payment, the amount paid, the plan, and the payment id or Razorpay receipt. Receipts look like scribble-air-xxxxxxxx-1234567890 and are also visible inside the app under your payment history.`,
      'Tell us briefly what went wrong. For a technical failure, a screenshot or a short note about your browser and device speeds things up a lot.',
    ],
  },
  {
    title: '6. How long a refund takes',
    body: [
      'We acknowledge every refund request within two working days and decide it within seven working days.',
      'Approved refunds are sent back to the same payment method through Razorpay. Your bank or UPI provider then takes a further five to seven working days to credit the amount — that timeline is theirs, not ours, and we cannot speed it up.',
      'We do not charge any processing or cancellation fee.',
    ],
  },
  {
    title: '7. Disputes and chargebacks',
    body: [
      'Before raising a chargeback with your bank, please email us — most disputes are resolved in a day and it is much faster for you. If you raise a chargeback anyway, we will submit Razorpay’s transaction evidence, and repeated unresolved disputes can lead to the account being closed.',
    ],
  },
  {
    title: '8. Promotional and partner pricing',
    body: [
      'Codes, campus offers or partner pricing may have their own terms. Where they differ from this policy, the terms of the offer apply, and we will state them at the point of purchase.',
    ],
  },
  {
    title: '9. Contact',
    body: [
      `Refund requests: ${SITE.billingEmail}. Anything else: ${SITE.supportEmail}. Company: ${SITE.company}, ${SITE.jurisdiction}.`,
    ],
  },
];

export default function RefundPage() {
  return (
    <>
      <section className="lp-wrap lp-pagehead">
        <span className="lp-eyebrow">Legal</span>
        <h1 className="lp-h1 lp-pagehead-h1">Refund Policy</h1>
        <p className="lp-lead lp-pagehead-lead">
          Short version: ask within seven days and if Pro did not work for you, we refund you. No
          processing fees, no forms to fill in.
        </p>
        <p className="lp-muted" style={{ marginTop: 14 }}>
          Last updated: {SITE.legalUpdated} · Applies to {SITE.product} by {SITE.company}
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-highlightgrid">
          <div className="lp-highlight">
            <Clock size={18} />
            <div>
              <b>7 days to ask</b>
              <p className="lp-body" style={{ marginTop: 4 }}>
                Technical failures, duplicate charges and accidental purchases are refunded in full.
              </p>
            </div>
          </div>
          <div className="lp-highlight">
            <RotateCcw size={18} />
            <div>
              <b>Back to the same method</b>
              <p className="lp-body" style={{ marginTop: 4 }}>
                Refunds go back through Razorpay to the original payment method, usually within a
                week of approval.
              </p>
            </div>
          </div>
          <div className="lp-highlight">
            <FileText size={18} />
            <div>
              <b>Nothing is deleted</b>
              <p className="lp-body" style={{ marginTop: 4 }}>
                A refund drops you back to Free. Your drawings and history stay exactly where they
                are.
              </p>
            </div>
          </div>
          <div className="lp-highlight">
            <AlertTriangle size={18} />
            <div>
              <b>Statutory rights</b>
              <p className="lp-body" style={{ marginTop: 4 }}>
                Your rights as a consumer under Indian law are unaffected by anything on this page.
              </p>
            </div>
          </div>
        </div>

        <article className="legal">
          {SECTIONS.map((s) => (
            <section key={s.title} className="legal-sec">
              <h2 className="legal-h2">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 48)} className="lp-body legal-p">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <div className="legal-note">
            <RotateCcw size={18} />
            <div>
              <b>Ready to ask for a refund?</b>
              <p className="lp-body" style={{ marginTop: 6 }}>
                Email{' '}
                <a className="lp-link" href={mailto(SITE.billingEmail, 'Refund request')}>
                  {SITE.billingEmail}
                </a>{' '}
                with your payment id, or read the full{' '}
                <Link className="lp-link" to={ROUTES.terms}>
                  Terms &amp; Conditions
                </Link>{' '}
                first.
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
