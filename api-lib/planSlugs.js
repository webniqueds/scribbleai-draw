// Server mirror of src/lib/planSlugs.ts.
//
// api/*.js run as plain Node ESM on Vercel and cannot import the TypeScript
// module, so the billing constants are declared here too. Keep both files in
// sync — the slugs are the contract with the Razorpay dashboard.

export const BILLING_APP_SLUG = 'scribble-air-draw';

export const PLAN_SLUGS = {
  free: { note: 'free', rupees: 0, paise: 0, period: 'monthly', free: true },
  monthly: { note: 'monthly', rupees: 99, paise: 9900, period: 'monthly', free: false },
  yearly: { note: 'yearly', rupees: 999, paise: 99900, period: 'yearly', free: false },
};

/** Names used when a recurring plan is created in the Razorpay dashboard. */
export const PLAN_ITEM_NAMES = {
  monthly: 'Scribble Air Draw Pro — Monthly (1 month)',
  yearly: 'Scribble Air Draw Pro — Yearly (12 months)',
};

export const PAID_PLAN_SLUGS = ['monthly', 'yearly'];

/** Narrow an arbitrary string to a known paid plan slug, or null. */
export function asPaidPlan(value) {
  if (typeof value !== 'string') return null;
  const key = value.trim().toLowerCase();
  return PAID_PLAN_SLUGS.includes(key) ? key : null;
}

export function billingNotes(plan) {
  return { app: BILLING_APP_SLUG, plan: PLAN_SLUGS[plan]?.note || plan };
}

/** Receipt id shape: `scribble-air-<uid8>-<timestamp>`. */
export function receiptFor(userId, ts = Date.now()) {
  return `${BILLING_APP_SLUG}-${String(userId || 'anon').slice(0, 8)}-${ts}`;
}
