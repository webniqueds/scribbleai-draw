import { Link } from '../lib/router';
import { SITE, ROUTES, mailto } from '../lib/site';
import { Mail, Receipt, ShieldCheck, Clock, MessageSquare, AlertTriangle, ArrowRight, MapPin } from 'lucide-react';

const CHANNELS = [
  {
    Icon: MessageSquare,
    title: 'General support',
    text: 'Camera trouble, a drawing that will not save, a question about anything else.',
    email: SITE.supportEmail,
    cta: 'Email support',
  },
  {
    Icon: Receipt,
    title: 'Billing & payments',
    text: 'Payment not reflected, receipt needed, plan change or a duplicate charge.',
    email: SITE.billingEmail,
    cta: 'Email billing',
  },
  {
    Icon: ShieldCheck,
    title: 'Privacy & data',
    text: 'Access, correction or deletion of your data, or a question about how we handle it.',
    email: SITE.privacyEmail,
    cta: 'Email privacy',
  },
];

const SELF_SERVE = [
  {
    q: 'The camera does nothing / blank screen',
    a: 'Allow camera access for the site in your browser’s address-bar controls, close other apps that may be using the camera, and reload. Private/incognito windows can block the camera on some browsers — try a normal window.',
  },
  {
    q: 'My drawing was not saved',
    a: 'Check that you are signed in with the account you drew with, and that your browser says “Saved” under the gallery panel. If it was a signed-in session and the strokes are still missing, send us the approximate time and we will look into it.',
  },
  {
    q: 'I was charged but Pro did not unlock',
    a: 'Send us the payment id from your bank or the Razorpay receipt (it looks like scribble-air-xxxxxxxx-1234567890) and we will activate it manually, usually the same day.',
  },
  {
    q: 'I want a refund',
    a: 'See the Refund Policy first — it explains the 7-day window and exactly what to send. Then write to billing and we will take it from there.',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="lp-wrap lp-pagehead">
        <span className="lp-eyebrow">Contact us</span>
        <h1 className="lp-h1 lp-pagehead-h1">Talk to a human, not a ticket queue.</h1>
        <p className="lp-lead lp-pagehead-lead">
          We are a small team in {SITE.jurisdiction}. Every message lands in a real inbox and gets
          answered by someone who can actually fix the problem — usually within one working day.
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-cardgrid">
          {CHANNELS.map((c) => (
            <div key={c.title} className="lp-card">
              <span className="lp-feature-icon">
                <c.Icon size={19} strokeWidth={2} />
              </span>
              <div className="lp-h3" style={{ marginTop: 14 }}>
                {c.title}
              </div>
              <p className="lp-body" style={{ marginTop: 6 }}>
                {c.text}
              </p>
              <a className="lp-btn lp-btn-warm lp-btn-sm" style={{ marginTop: 16 }} href={mailto(c.email, `${SITE.product} — ${c.title}`)}>
                <Mail size={14} />
                {c.cta}
              </a>
              <div className="lp-muted" style={{ marginTop: 8, wordBreak: 'break-all' }}>
                {c.email}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-split">
          <div>
            <span className="lp-eyebrow">Company details</span>
            <h2 className="lp-h2" style={{ marginTop: 14 }}>
              Who you are writing to.
            </h2>
            <p className="lp-body" style={{ marginTop: 14 }}>
              {SITE.product} is operated by {SITE.company}, a technology company registered in{' '}
              {SITE.jurisdiction}. The same company builds {SITE.brandLong}, our solutions platform
              for businesses.
            </p>

            <div className="lp-details">
              <div className="lp-detail">
                <MapPin size={16} />
                <div>
                  <b>{SITE.company}</b>
                  <span>{SITE.jurisdiction}</span>
                </div>
              </div>
              <div className="lp-detail">
                <Mail size={16} />
                <div>
                  <b>{SITE.supportEmail}</b>
                  <span>General support and complaints</span>
                </div>
              </div>
              <div className="lp-detail">
                <Clock size={16} />
                <div>
                  <b>Mon – Sat, 10:00 – 19:00 IST</b>
                  <span>Billing escalations are picked up the same working day</span>
                </div>
              </div>
              <div className="lp-detail">
                <AlertTriangle size={16} />
                <div>
                  <b>Grievance Officer</b>
                  <span>
                    Write to <a href={mailto(SITE.privacyEmail, 'Grievance')} className="lp-link">{SITE.privacyEmail}</a>;
                    we respond within 15 days as required under Indian data-protection rules.
                  </span>
                </div>
              </div>
            </div>

            <p className="lp-body" style={{ marginTop: 16 }}>
              Looking for the legal small print? It is all published:{' '}
              <Link to={ROUTES.terms} className="lp-link">Terms &amp; Conditions</Link>,{' '}
              <Link to={ROUTES.privacy} className="lp-link">Privacy Policy</Link> and the{' '}
              <Link to={ROUTES.refundPolicy} className="lp-link">Refund Policy</Link>.
            </p>
          </div>

          <div className="lp-card">
            <div className="lp-h3">Fix it yourself first</div>
            <p className="lp-body" style={{ marginTop: 6 }}>
              Most messages we receive are one of these four, and all four have a quick answer.
            </p>
            <div style={{ marginTop: 16 }}>
              {SELF_SERVE.map((item) => (
                <details key={item.q} className="lp-faqitem">
                  <summary>{item.q}</summary>
                  <p className="lp-body" style={{ marginTop: 8 }}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
            <Link to={ROUTES.home} className="lp-btn lp-btn-warm lp-btn-sm" style={{ marginTop: 16 }}>
              Back to the studio
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
