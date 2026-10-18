import { SITE, ROUTES, mailto } from '../lib/site';
import { Link } from '../lib/router';
import { ShieldCheck } from 'lucide-react';

interface Section {
  title: string;
  body: string[];
}

const SECTIONS: Section[] = [
  {
    title: '1. Acceptance of these Terms',
    body: [
      `These Terms & Conditions ("Terms") are a legal agreement between you and ${SITE.company} ("we", "us") regarding your use of ${SITE.product} ("the Service"), the webcam-based air-drawing studio we operate. By creating an account or using the Service you accept these Terms. If you do not agree, do not use the Service.`,
      'These Terms apply to every visitor, whether or not you create an account. Where a specific section says it applies only to paid plans, it does so.',
    ],
  },
  {
    title: '2. What the Service does',
    body: [
      'The Service lets you draw using your webcam: your camera feed acts as the canvas, hand tracking converts gestures into strokes, and your drawings are saved to your account so you can return to them on any device you sign in on.',
      'The Service also offers social features — friends, groups and drawing battles — and, on the Pro plan, additional creative tools such as trace templates, transparent PNG export, replay and session recording.',
      'The Service requires a modern browser (we test current versions of Chrome, Edge, Safari and Firefox), a working webcam and a stable internet connection for sign-in and saving. Free trial software and third-party browser features are outside our control and may change without notice.',
    ],
  },
  {
    title: '3. Accounts',
    body: [
      'You must be at least 18 years old to create an account. If you are under 18, please do not create an account or make any payment — if a payment is made on your behalf, it may be refunded on request.',
      'You are responsible for keeping your sign-in credentials confidential and for everything done through your account. Tell us immediately at ' + SITE.supportEmail + ' if you believe your account has been used without your permission.',
      'You may not create more than one account to bypass Free-plan limits, share an account with others, or use the Service on behalf of someone else without their permission.',
    ],
  },
  {
    title: '4. Your drawings and your content',
    body: [
      'Your drawings, nicknames, bios and other content you create ("Your Content") remain yours. We claim no ownership of Your Content and we do not sell it to anyone.',
      'You grant us a limited, worldwide, non-exclusive, royalty-free licence to host, store, back up, transmit and display Your Content solely to the extent needed to run the Service — for example, to show your drawings back to you, to render them in group battles and competitions you join, and to let you share a link to a drawing. That licence ends when you delete the content or close your account, except for copies retained in backups that are deleted on our normal backup cycle.',
      'Content that is private to you stays private. If you deliberately publish or submit a drawing to a group battle, a competition or a shared gallery, it becomes visible to the people in that group and, where the feature says so, to anyone with the link.',
      'You confirm you have the right to create and upload everything you draw or submit, and that doing so does not infringe anyone else’s rights.',
    ],
  },
  {
    title: '5. Acceptable use',
    body: [
      'You agree not to use the Service to: upload or share unlawful, infringing, defamatory, hateful, sexually explicit or violent content; harass or impersonate anyone; attempt to gain unauthorised access to the Service, another account or our infrastructure; probe, scan or test the vulnerability of our systems without our written permission; scrape, bulk-download or reverse-engineer the Service; circumvent Free-plan limits, plan entitlements or payment; or interfere with the Service for other users (for example, by flooding it with automated traffic).',
      'We may remove content or suspend access that breaches this section, and we may cooperate with lawful requests from authorities.',
    ],
  },
  {
    title: '6. Plans, prices and payments',
    body: [
      'The Service has a Free plan and paid Pro plans. The Free plan is free forever and includes a limited gallery of drawings. Pro is a one-time payment for the period you choose; it does not renew automatically unless we expressly tell you it does, and you can end your paid period at any time from inside the app.',
      'All prices are in Indian Rupees (₹) and are exclusive of any applicable taxes unless stated otherwise. Taxes, if applicable, are shown to you before payment.',
      'Payments are processed by Razorpay (' + SITE.company + ' is the merchant of record). We never see or store your UPI PIN, card number or CVV — Razorpay handles those. A payment counts as successful only after Razorpay confirms it to us and our server has verified the payment signature against your signed-in session.',
      'You are responsible for taxes and duties arising from your use, and for keeping your payment details accurate. If a payment fails or is reversed, the associated Pro access may be removed.',
      'We may change prices or plan contents prospectively. Existing paid periods are honoured at the price paid. We will give reasonable notice before any price change takes effect, and a price change never applies retroactively to a period you have already paid for.',
    ],
  },
  {
    title: '7. Cancellation and refunds',
    body: [
      'You can cancel at any time from inside the app. Cancelling ends your paid period immediately; it does not delete your account, your drawings or your payment history.',
      'Refunds are governed by our Refund Policy, which forms part of these Terms: ' + SITE.supportEmail + '.',
    ],
  },
  {
    title: '8. Third-party services',
    body: [
      'The Service relies on third parties, each governed by its own terms: authentication and account management by Clerk; database hosting by MongoDB Atlas; payments by Razorpay; hosting and content delivery by our infrastructure provider (Vercel); hand-tracking models and scripts loaded at runtime from a public content-delivery network (jsDelivr); and web fonts from Google Fonts.',
      'We do not control those services. If one of them is unavailable, part of the Service may not work — that is not a failure on our part, but we will work to restore it as quickly as we reasonably can.',
    ],
  },
  {
    title: '9. Camera, privacy and security',
    body: [
      'Hand tracking runs in your browser. Camera frames are processed on your device and are not transmitted to us or to anyone else — we never record your camera.',
      'We store the strokes you draw, your profile details and your plan status so the Service can work across devices. We encrypt data in transit, restrict access to staff who need it, and review who can reach production systems. No system is perfectly secure, so please do not treat the Service as a place for confidential material.',
      'Details are in our Privacy Policy: ' + SITE.supportEmail + '.',
    ],
  },
  {
    title: '10. Intellectual property',
    body: [
      'The Service — including our software, design system, brand, logos, marketing copy and the trace template artwork we ship — is owned by ' + SITE.company + ' or its licensors, and is protected by copyright and other laws.',
      'You may use the Service for personal and internal business use. You may not copy, modify, reverse-engineer, resell, sublicense or create derivative works from our software or assets without written permission. Your own drawings remain yours under section 4.',
      'Third-party names and marks, including Razorpay, Clerk, MongoDB and Google, belong to their respective owners.',
    ],
  },
  {
    title: '11. Warranties and disclaimers',
    body: [
      'The Service is provided "as is" and "as available". To the maximum extent permitted by law we disclaim all implied warranties, including merchantability, fitness for a particular purpose, accuracy and non-infringement.',
      'Hand tracking depends on lighting, camera quality and how your hand is held; results vary from device to device. We do not promise a specific level of availability, that the Service will be uninterrupted or error-free, or that every drawing will be recognised exactly as intended.',
    ],
  },
  {
    title: '12. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, data or goodwill, arising out of your use of the Service.',
      'Our total aggregate liability for any claim relating to the Service is limited to the amount you actually paid us for the Service in the twelve (12) months before the event giving rise to the claim.',
      'Nothing in these Terms excludes liability that cannot be excluded by law, including liability for fraud, or for death or personal injury caused by our negligence.',
    ],
  },
  {
    title: '13. Indemnity',
    body: [
      'You agree to indemnify and hold harmless ' + SITE.company + ' and its team from any claim, demand, loss or expense (including reasonable legal fees) arising from Your Content, your use of the Service in breach of these Terms, or your violation of any law or the rights of a third party.',
    ],
  },
  {
    title: '14. Suspension and termination',
    body: [
      'You may stop using the Service and delete your account at any time by writing to ' + SITE.supportEmail + '.',
      'We may suspend or terminate access, and delete or restrict content, if you materially breach these Terms, if a payment is fraudulent or reversed, if we are required to do so by law, or if we discontinue the Service. Where the situation allows, we will warn you first and give you a chance to fix it.',
      'Provisions that by their nature should survive termination — including ownership, indemnities, liability limits and governing law — survive termination.',
    ],
  },
  {
    title: '15. Changes to these Terms',
    body: [
      'We may update these Terms from time to time. The "last updated" date at the top of this page shows the current version. Material changes will be announced in the app or by email before they take effect. Continuing to use the Service after a change means you accept the revised Terms.',
    ],
  },
  {
    title: '16. Governing law and jurisdiction',
    body: [
      `These Terms are governed by ${SITE.governingLaw}. Subject to Section 17, the courts at the place where ${SITE.company} is registered have exclusive jurisdiction over any dispute arising from them. Nothing here limits any right you have to approach a consumer forum or the authorities.`,
    ],
  },
  {
    title: '17. Grievances and contact',
    body: [
      `If you have a concern about these Terms, a payment or the treatment of your data, write to ${SITE.supportEmail} with the subject line "Grievance". We acknowledge every complaint and aim to resolve it within fifteen (15) days. Consumer disputes may also be raised through the relevant consumer forum in ${SITE.jurisdiction}.`,
      `Company: ${SITE.company} · Product: ${SITE.product} · Email: ${SITE.supportEmail}`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="lp-wrap lp-pagehead">
        <span className="lp-eyebrow">Legal</span>
        <h1 className="lp-h1 lp-pagehead-h1">Terms &amp; Conditions</h1>
        <p className="lp-lead lp-pagehead-lead">
          The rules for using {SITE.product}. Written to be read, not to be skipped.
        </p>
        <p className="lp-muted" style={{ marginTop: 14 }}>
          Last updated: {SITE.legalUpdated} · Applies to {SITE.product} by {SITE.company}
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <nav className="lp-toc" aria-label="Contents">
          <div className="lp-h3">On this page</div>
          <ol className="lp-toclist">
            {SECTIONS.map((s) => (
              <li key={s.title}>{s.title.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        </nav>

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
            <ShieldCheck size={18} />
            <div>
              <b>Questions about these terms?</b>
              <p className="lp-body" style={{ marginTop: 6 }}>
                Write to{' '}
                <a className="lp-link" href={mailto(SITE.supportEmail, `${SITE.product} — Terms of Service`)}>
                  {SITE.supportEmail}
                </a>{' '}
                or read the{' '}
                <Link className="lp-link" to={ROUTES.privacy}>
                  Privacy Policy
                </Link>{' '}
                and the{' '}
                <Link className="lp-link" to={ROUTES.refundPolicy}>
                  Refund Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
