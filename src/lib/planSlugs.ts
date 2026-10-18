// Razorpay wiring, in one place.
//
// The slugs below are the contract between this app and the Razorpay
// dashboard. Everything sent to Razorpay (order notes, receipt ids, item
// names) uses `BILLING_APP_SLUG` + a plan slug, so a payment can always be
// traced back to the account that made it and the plan it paid for.
//
// Server mirror: api-lib/planSlugs.js (kept in sync — api/*.js is plain
// Node ESM and cannot import this TypeScript module).

export const BILLING_APP_SLUG = 'scribble-air-draw';

/** Razorpay Checkout `name` field — what the customer sees on the sheet. */
export const CHECKOUT_MERCHANT_NAME = 'Scribble Air Draw';

/** Razorpay Checkout theme. Must be a hex value; CSS vars do not work here. */
export const CHECKOUT_THEME = '#c2410c';

export type PaidPlanSlug = 'monthly' | 'yearly';
export type PlanSlug = 'free' | PaidPlanSlug;

export interface PlanSlugDef {
  id: PlanSlug;
  label: string;
  /** Rupees, as shown to the customer. */
  rupees: number;
  /** Paise, as sent to Razorpay (`price`). */
  paise: number;
  period: 'monthly' | 'yearly';
  /** Value of the `plan` note on the Razorpay order / subscription. */
  note: string;
  /** Value of the Razorpay plan `item.name` (for recurring plans). */
  itemName: string;
  description: string;
  free: boolean;
}

/**
 * Canonical plan slugs. `id` is what the client sends as `planId` to
 * /api/create-order and what the server stores as the account's plan.
 */
export const PLAN_SLUGS: Record<PlanSlug, PlanSlugDef> = {
  free: {
    id: 'free',
    label: 'Free',
    rupees: 0,
    paise: 0,
    period: 'monthly',
    note: 'free',
    itemName: 'Scribble Air Draw — Free',
    description: 'Start drawing for free',
    free: true,
  },
  monthly: {
    id: 'monthly',
    label: 'Monthly',
    rupees: 99,
    paise: 9900,
    period: 'monthly',
    note: 'monthly',
    itemName: 'Scribble Air Draw Pro — Monthly (1 month)',
    description: 'Scribble Air Pro — one month',
    free: false,
  },
  yearly: {
    id: 'yearly',
    label: 'Yearly',
    rupees: 999,
    paise: 99900,
    period: 'yearly',
    note: 'yearly',
    itemName: 'Scribble Air Draw Pro — Yearly (12 months)',
    description: 'Scribble Air Pro — one year',
    free: false,
  },
};

export const PAID_PLAN_SLUGS: PaidPlanSlug[] = ['monthly', 'yearly'];

/** Narrow an arbitrary string to a known plan slug, or null. */
export function asPlanSlug(value: unknown): PlanSlug | null {
  if (typeof value !== 'string') return null;
  const key = value.trim().toLowerCase() as PlanSlug;
  return key in PLAN_SLUGS ? key : null;
}

export function isPaidPlan(value: unknown): boolean {
  const slug = asPlanSlug(value);
  return !!slug && !PLAN_SLUGS[slug].free;
}

/** Notes attached to every Razorpay order / plan / subscription. */
export function billingNotes(plan: PlanSlug): Record<string, string> {
  return { app: BILLING_APP_SLUG, plan: PLAN_SLUGS[plan].note };
}

/** Receipt id shape Razorpay stores: `scribble-air-<uid8>-<timestamp>`. */
export function receiptFor(userId: string, ts = Date.now()): string {
  return `${BILLING_APP_SLUG}-${(userId || 'anon').slice(0, 8)}-${ts}`;
}
