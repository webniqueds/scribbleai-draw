import { Link } from '../lib/router';
import { SITE, ROUTES, mailto } from '../lib/site';
import { ArrowRight, Globe, ShieldCheck, Sparkles, HeartHandshake, Lightbulb, Target } from 'lucide-react';

const VALUES = [
  {
    Icon: Globe,
    title: 'Built in India',
    text: 'Designed, engineered and supported in India for people who expect world-class software without the wait or the price tag.',
  },
  {
    Icon: ShieldCheck,
    title: 'Trust first',
    text: 'Your camera feed never leaves your browser. Your drawings are yours. We would rather ship less than trade on your data.',
  },
  {
    Icon: Lightbulb,
    title: 'Innovation driven',
    text: 'Hand tracking used to need a studio and a green screen. We keep pushing until it fits in a browser tab and works on a ₹30,000 laptop.',
  },
  {
    Icon: Target,
    title: 'Customer obsessed',
    text: 'Every release starts with the same question: does this make drawing in the air feel easier for the person actually drawing?',
  },
];

const NUMBERS = [
  { value: '0', label: 'frames of video uploaded' },
  { value: '1', label: 'finger is all you need' },
  { value: '₹99', label: 'to unlock every Pro tool' },
  { value: '∞', label: 'drawings on Pro' },
];

export default function AboutPage() {
  return (
    <>
      <section className="lp-wrap lp-pagehead">
        <span className="lp-eyebrow">About us</span>
        <h1 className="lp-h1 lp-pagehead-h1">A drawing studio that fits in a browser tab.</h1>
        <p className="lp-lead lp-pagehead-lead">
          {SITE.product} turns your webcam into a canvas and your fingertip into a brush. It is built
          by {SITE.company}, the team behind {SITE.brandLong} — the same company that builds
          software for small businesses across India.
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-split">
          <div>
            <span className="lp-eyebrow">Who we are</span>
            <h2 className="lp-h2" style={{ marginTop: 14 }}>
              Drawing should not need a stylus.
            </h2>
            <p className="lp-body" style={{ marginTop: 14 }}>
              Most drawing apps assume you have a pen and a screen. We started from the opposite
              end: everyone has a webcam and a hand, so we built a studio around those two things.
              Point one finger at the camera and a line appears — no pressure to calibrate, no
              tablet to buy, no drivers to install.
            </p>
            <p className="lp-body" style={{ marginTop: 12 }}>
              The heavy lifting happens on your device: hand tracking runs in the browser, the
              camera frames are processed locally, and the drawings you make are stored against
              your account so they follow you to any device you sign in on. Nothing you draw is
              ever used to train anything.
            </p>
          </div>

          <div className="lp-statgrid">
            {NUMBERS.map((n) => (
              <div key={n.label} className="lp-stat">
                <div className="lp-statvalue">{n.value}</div>
                <div className="lp-statlabel">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div style={{ maxWidth: '38rem' }}>
          <span className="lp-eyebrow">What we believe</span>
          <h2 className="lp-h2" style={{ marginTop: 14 }}>
            Four things we will not trade away.
          </h2>
        </div>
        <div className="lp-valuegrid">
          {VALUES.map((v) => (
            <div key={v.title} className="lp-card">
              <span className="lp-feature-icon">
                <v.Icon size={19} strokeWidth={2} />
              </span>
              <div className="lp-h3" style={{ marginTop: 14 }}>
                {v.title}
              </div>
              <p className="lp-body" style={{ marginTop: 6 }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-band lp-band--left">
          <div className="lp-split">
            <div>
              <span className="lp-eyebrow" style={{ color: '#ffcf9e' }}>
                <Sparkles size={13} /> The company behind it
              </span>
              <h2 className="lp-h2" style={{ marginTop: 14, color: '#fff8f2', fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}>
                {SITE.company}
              </h2>
              <p style={{ marginTop: 14, fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,246,236,0.8)' }}>
                We are a technology company registered in {SITE.jurisdiction}, building practical
                software for businesses and people across the country. {SITE.brandLong} is our
                solutions platform for businesses — GST-compliant billing, inventory, analytics and
                AI support — and {SITE.product} is our consumer studio, built with the same team
                and the same obsession with keeping things simple.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26 }}>
                <Link to={ROUTES.home} className="lp-btn lp-btn-warm">
                  Try the studio
                  <ArrowRight size={16} />
                </Link>
                <a className="lp-btn lp-btn-warm" href={SITE.companyUrl} target="_blank" rel="noreferrer noopener">
                  Visit {SITE.brand}
                </a>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="lp-factlight">
                <HeartHandshake size={16} />
                <span>
                  <b>Sister products.</b> WBFlow for business management, Quip AI for customer
                  support — same company, same support team.
                </span>
              </div>
              <div className="lp-factlight">
                <ShieldCheck size={16} />
                <span>
                  <b>Your data.</b> Drawings are private to your account by default and are never
                  sold or shared.
                </span>
              </div>
              <div className="lp-factlight">
                <Globe size={16} />
                <span>
                  <b>Reach us.</b> {SITE.supportEmail} — a real person reads every message.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-cta">
          <h2 className="lp-h2" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)' }}>
            Come and draw something.
          </h2>
          <p className="lp-lead" style={{ marginTop: 14, color: 'rgba(255,246,236,0.8)' }}>
            It takes about ten seconds to go from camera permission to your first line.
          </p>
          <div className="lp-cta-actions">
            <Link to={ROUTES.home} className="lp-btn lp-btn-warm">
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link to={ROUTES.contact} className="lp-btn lp-btn-warm">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
