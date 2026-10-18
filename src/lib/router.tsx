// Minimal history-API router.
//
// The app ships as a single Vercel SPA (every path rewrites to index.html),
// so routing only has to do one job: tell the shell which page to paint, and
// let nav links change the URL without a full reload.

import { useCallback, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

/** Every public (signed-out readable) page. The studio itself lives at `/`. */
export const PUBLIC_ROUTES = [
  '/about',
  '/pricing',
  '/contact',
  '/terms',
  '/privacy',
  '/refund-policy',
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

export function isPublicRoute(path: string): path is PublicRoute {
  return (PUBLIC_ROUTES as readonly string[]).includes(normalizePath(path));
}

/**
 * Slash aliases. Razorpay (and humans) will type or paste `/terms-and-conditions`,
 * `/refund`, `/contact-us` and friends — all of them land on the real page
 * instead of silently rendering the studio.
 */
const ALIASES: Record<string, PublicRoute> = {
  '/about-us': '/about',
  '/aboutus': '/about',
  '/team': '/about',
  '/plans': '/pricing',
  '/plan': '/pricing',
  '/pricing-plans': '/pricing',
  '/contact-us': '/contact',
  '/contactus': '/contact',
  '/support': '/contact',
  '/help': '/contact',
  '/terms': '/terms',
  '/terms-of-service': '/terms',
  '/terms-and-conditions': '/terms',
  '/tos': '/terms',
  '/privacy': '/privacy',
  '/privacy-policy': '/privacy',
  '/refund': '/refund-policy',
  '/refunds': '/refund-policy',
  '/refund-policy': '/refund-policy',
  '/refundpolicies': '/refund-policy',
  '/cancellation': '/refund-policy',
};

/** Lowercased, query/hash-free, no trailing slash. `/` stays `/`. */
export function normalizePath(path: string): string {
  const clean = (path || '/').split('?')[0].split('#')[0].trim().replace(/\/+$/, '').toLowerCase() || '/';
  return ALIASES[clean] || clean;
}

/** Imperative navigation for buttons and programmatic redirects. */
export function navigate(to: string, opts: { replace?: boolean } = {}) {
  if (typeof window === 'undefined') return;
  const target = to || '/';
  if (normalizePath(window.location.pathname) === normalizePath(target)) return;
  if (opts.replace) window.history.replaceState({}, '', target);
  else window.history.pushState({}, '', target);
  window.dispatchEvent(new Event('popstate'));
}

/** Current path, kept in sync with back/forward and `navigate()`. */
export function useRoute() {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const onChange = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  const go = useCallback((to: string) => navigate(to), []);
  return { path, normalized: path, navigate: go };
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

/** Same-origin link that routes client-side. Falls back to a normal href. */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        // Let the browser handle modified clicks (new tab, download, etc).
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
