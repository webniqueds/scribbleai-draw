// Company identity for every public page, footer and legal document.
// One place to edit when the company name, address or support inbox changes.

export const SITE = {
  /** Product name shown in nav, checkout and receipts. */
  product: 'Scribble Air Draw',
  /** Parent company behind the product. */
  company: 'Webnique Digital Solutions Pvt. Ltd.',
  /** Consumer-facing brand family (wb-roots.com). */
  brand: 'WBROOTS',
  brandLong: 'Webnique Business Roots',
  /** Support inbox — also the contact address on every legal page. */
  supportEmail: 'support@wb-roots.com',
  privacyEmail: 'privacy@wb-roots.com',
  billingEmail: 'billing@wb-roots.com',
  /** Company site these pages reference. */
  companyUrl: 'https://www.wb-roots.com',
  productsUrl: 'https://www.wb-roots.com/about',
  jurisdiction: 'India',
  governingLaw: 'the laws of India',
  /** Effective date stamped on the legal pages. */
  legalUpdated: '18 October 2026',
  copyrightYear: 2026,
} as const;

/** Canonical public routes — the exact slugs to paste into Razorpay. */
export const ROUTES = {
  home: '/',
  about: '/about',
  pricing: '/pricing',
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
  refundPolicy: '/refund-policy',
} as const;

/**
 * Absolute URL for a route on the current deployment. Marketing/legal links
 * and meta tags always point at the domain the visitor is actually on, so
 * there is nothing to reconfigure per environment.
 */
export function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  const origin = window.location.origin;
  return `${origin}${path === '/' ? '/' : path}`;
}

export function mailto(email: string, subject: string, body = ''): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}
