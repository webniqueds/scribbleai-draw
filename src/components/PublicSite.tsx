// Shared chrome for the public pages (about / pricing / contact / legal).
// The studio lives at `/` and never renders inside here.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Hand, ArrowRight, Mail, Menu, X } from 'lucide-react';
import { Link, useRoute, type PublicRoute } from '../lib/router';
import { SITE, ROUTES, mailto } from '../lib/site';
import AboutPage from '../pages/AboutPage';
import PricingPage from '../pages/PricingPage';
import ContactPage from '../pages/ContactPage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import RefundPage from '../pages/RefundPage';

interface Props {
  /** Reserved: the studio itself is not rendered inside the public shell. */
  authAvailable?: boolean;
}

const NAV: { to: PublicRoute; label: string }[] = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/terms', label: 'Terms' },
];

const PAGES: Record<PublicRoute, ReactNode> = {
  '/about': <AboutPage />,
  '/pricing': <PricingPage />,
  '/contact': <ContactPage />,
  '/terms': <TermsPage />,
  '/privacy': <PrivacyPage />,
  '/refund-policy': <RefundPage />,
};

const TITLES: Record<PublicRoute, string> = {
  '/about': 'About us',
  '/pricing': 'Pricing',
  '/contact': 'Contact us',
  '/terms': 'Terms & Conditions',
  '/privacy': 'Privacy Policy',
  '/refund-policy': 'Refund Policy',
};

const DESCRIPTIONS: Record<PublicRoute, string> = {
  '/about': `${SITE.product} is an air-drawing studio by ${SITE.company} — draw with your webcam and your fingertip.`,
  '/pricing': 'Start drawing free. Upgrade to Pro for templates, transparent export, replay, recording and unlimited drawings.',
  '/contact': `Questions about ${SITE.product}? Reach the team at ${SITE.supportEmail}.`,
  '/terms': `The terms that govern your use of ${SITE.product}, published by ${SITE.company}.`,
  '/privacy': `How ${SITE.company} collects, uses and protects your data when you use ${SITE.product}.`,
  '/refund-policy': `Refund and cancellation terms for ${SITE.product} Pro plans.`,
};

export default function PublicSite(_props: Props = {}) {
  const { path } = useRoute();
  const page = (PAGES[path] ? path : '/about') as PublicRoute;
  const [menuOpen, setMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  // A route change inside the shell should start at the top, the way a real
  // page load would — `body` itself never scrolls in this app.
  useEffect(() => {
    shellRef.current?.scrollTo({ top: 0 });
    setMenuOpen(false);
  }, [path]);

  // Keep the tab title and social/SEO meta in step with the page.
  useEffect(() => {
    const title = `${TITLES[page]} · ${SITE.product}`;
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', DESCRIPTIONS[page]);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', DESCRIPTIONS[page]);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE.product);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = typeof window === 'undefined' ? path : `${window.location.origin}${path}`;
  }, [page]);

  return (
    <div className="lp-shell" ref={shellRef}>
      <header className="lp-nav">
        <Link to={ROUTES.home} className="lp-brand">
          <span className="lp-mark">
            <Hand size={17} strokeWidth={2.2} />
          </span>
          {SITE.product}
        </Link>

        <nav className="lp-navlinks" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={'lp-navlink' + (path === item.to ? ' lp-navlink--active' : '')}
              aria-current={path === item.to ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link to={ROUTES.home} className="lp-btn lp-btn-primary lp-btn-sm">
            Get Started
            <ArrowRight size={15} />
          </Link>
        </nav>

        <button
          type="button"
          className="lp-navmenu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {menuOpen && (
        <div className="lp-navdrawer">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="lp-navdrawerlink">
              {item.label}
            </Link>
          ))}
          <Link to={ROUTES.home} className="lp-btn lp-btn-primary lp-btn-sm">
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <main className="lp-main">{PAGES[page]}</main>

      <footer className="lp-wrap">
        <div className="lp-foot">
          <div className="lp-footcol">
            <span style={{ fontWeight: 700, color: 'var(--forest)' }}>{SITE.product}</span>
            <span className="lp-muted">Draw in the air with nothing but a webcam.</span>
          </div>
          <div className="lp-footlinks">
            <Link to={ROUTES.about}>About us</Link>
            <Link to={ROUTES.pricing}>Pricing</Link>
            <Link to={ROUTES.contact}>Contact us</Link>
            <Link to={ROUTES.terms}>Terms</Link>
            <Link to={ROUTES.privacy}>Privacy</Link>
            <Link to={ROUTES.refundPolicy}>Refunds</Link>
          </div>
          <a className="lp-footmail" href={mailto(SITE.supportEmail, `${SITE.product} support`)}>
            <Mail size={13} />
            {SITE.supportEmail}
          </a>
        </div>
        <div className="lp-legal">
          <span>
            © {SITE.copyrightYear} {SITE.company}. All rights reserved.
          </span>
          <span>
            A product of{' '}
            <a href={SITE.companyUrl} target="_blank" rel="noreferrer noopener">
              {SITE.brandLong}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
