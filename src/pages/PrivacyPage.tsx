import { SITE, ROUTES, mailto } from '../lib/site';
import { Link } from '../lib/router';
import { VideoOff, Lock } from 'lucide-react';

interface Section {
  title: string;
  body: string[];
}

const SECTIONS: Section[] = [
  {
    title: '1. Who we are',
    body: [
      `${SITE.company} operates ${SITE.product}. In this policy "${SITE.company}", "we", "us" means the company; "you" means the person using the Service. Our solutions platform for businesses is ${SITE.brandLong} (${SITE.companyUrl}).`,
      `Our data-protection queries and grievance officer can be reached at ${SITE.privacyEmail}.`,
    ],
  },
  {
    title: '2. What we collect',
    body: [
      'Account and sign-in data — your user id, email address and basic profile details. Sign-in is handled by Clerk; we receive the verified user id and email, never your password.',
      'Product data — your drawings (as strokes, not as images of people), their names, favourites, version history, your nickname, bio, friends, groups, battles and competition entries you create, and the plan status on your account.',
      'Payment data — whether a payment succeeded, the plan purchased, the amount, the Razorpay payment id and the timestamp. Card numbers, UPI PINs and CVVs are entered on Razorpay’s own secure screens and never reach us.',
      'Technical data — IP address, browser and device type, and pages/actions you use, collected through our hosting and logs to keep the Service secure and to understand which features are used.',
      'Support data — the contents of any email or message you send us, so we can answer you.',
      'We do not collect facial images, voice recordings or any other biometric information. We do not run advertising trackers or sell personal data to third parties for their marketing.',
    ],
  },
  {
    title: '3. Your camera and hand tracking',
    body: [
      'This is the important one. Hand tracking runs entirely inside your browser. Camera frames are processed on your device and are never uploaded to us, and we never record video or audio.',
      'What leaves your device is the mathematical description of your strokes — a list of points and colours — and that is what we save so your drawing can be reopened later.',
      'On first use your browser asks for camera permission. You can withdraw it at any time from your browser’s site settings; drawing simply stops working until you grant it again.',
      'The hand-tracking model files are fetched at runtime from a public content-delivery network (jsDelivr). Loading them means that CDN sees your IP address under its own privacy policy — that is outside our control and is the same as loading any script from a CDN.',
    ],
  },
  {
    title: '4. How we use your data',
    body: [
      'To run the Service: signing you in, storing and redisplaying your drawings, keeping your gallery and social features working, and applying the plan features you are entitled to.',
      'To process payments: confirming a Razorpay payment and recording what you bought.',
      'To secure and support the Service: detecting abuse, debugging failures, and answering your messages.',
      'To improve the Service: understanding, in aggregate and without identifying you, which features are used. We do not use your drawings to train machine-learning models.',
      'To meet legal obligations, such as keeping transaction records where the law requires it.',
    ],
  },
  {
    title: '5. Cookies and local storage',
    body: [
      'We use cookies and similar browser storage for sign-in sessions, to remember your preferences such as theme, and to keep you signed in. These are not advertising cookies and we do not run third-party ad trackers on our pages.',
      'You can clear or block cookies in your browser settings. Blocking them will stop sign-in from working.',
    ],
  },
  {
    title: '6. Who we share it with',
    body: [
      'We share only what is needed to run the Service, with: Clerk (sign-in), MongoDB Atlas (database hosting), Razorpay (payments), our hosting and content-delivery provider (serving the app, including its infrastructure logs such as IP addresses), and jsDelivr / Google Fonts for the runtime scripts and fonts described above.',
      'These providers act as processors on our instructions and under their own published terms. We do not sell your personal information, and we do not share it for anyone else’s marketing.',
      'We may disclose information where required by law, a valid court or government order, or to protect the rights and safety of the Service, our users or the public.',
    ],
  },
  {
    title: '7. How long we keep it',
    body: [
      'Account data and drawings are kept for as long as your account is active, so your work is there when you come back.',
      'Payment records are kept for the period required by Indian tax and accounting law, even if you close your account.',
      'Security and diagnostic logs are kept for a short period and then deleted.',
      'When you ask us to delete your account, we remove your profile and your drawings from our active database within 30 days and from encrypted backups within 90 days. Records we are legally required to keep are retained in a restricted form only.',
    ],
  },
  {
    title: '8. Your rights',
    body: [
      `You can ask us for a copy of the personal data we hold about you, ask us to correct it, ask us to delete it, restrict or object to how we process it, or withdraw a consent you gave. Email ${SITE.privacyEmail} with the subject line "Data request" and we will respond within 30 days. We may need to verify your identity first so we do not hand your data to someone else.`,
      'If you are not satisfied with our response you can complain to the relevant data-protection authority in India. Raising a grievance with us first does not stop you from doing so — write to us at ' + SITE.privacyEmail + ' with the subject line "Grievance" and we aim to respond within 15 days.',
      'You can stop using the Service and delete your account at any time by writing to ' + SITE.supportEmail + '.',
    ],
  },
  {
    title: '9. Children',
    body: [
      `The Service is not directed at children under 18. We do not knowingly collect data from children. If you are under 18, please do not create an account — if you believe a child has done so, tell us at ${SITE.privacyEmail} and we will delete the account.`,
    ],
  },
  {
    title: '10. Where your data is processed',
    body: [
      'We are registered in India. Some of our providers store data outside India (for example, hosting, authentication and payment infrastructure). Where your data is processed in another country, it is done under the safeguards those providers publish, including standard contractual protections.',
    ],
  },
  {
    title: '11. Security',
    body: [
      'We encrypt data in transit with TLS, store it in access-controlled databases, limit staff access to what each person needs to do their job, and keep audit logs of privileged access. No method of storage or transmission is completely secure, so please use the Service as you would any other online tool and avoid sharing anything confidential through your drawings.',
    ],
  },
  {
    title: '12. Changes to this policy',
    body: [
      'We may update this policy as the Service or the law changes. The "last updated" date shows the current version, and material changes will be announced in the app or by email. Continuing to use the Service after a change means you accept the updated policy.',
    ],
  },
  {
    title: '13. Contact',
    body: [
      `Privacy questions, data requests and grievances: ${SITE.privacyEmail}. General support: ${SITE.supportEmail}. ${SITE.company}, ${SITE.jurisdiction}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="lp-wrap lp-pagehead">
        <span className="lp-eyebrow">Legal</span>
        <h1 className="lp-h1 lp-pagehead-h1">Privacy Policy</h1>
        <p className="lp-lead lp-pagehead-lead">
          What we collect, what we never touch, and what you can ask us to do about it.
        </p>
        <p className="lp-muted" style={{ marginTop: 14 }}>
          Last updated: {SITE.legalUpdated} · Applies to {SITE.product} by {SITE.company}
        </p>
      </section>

      <section className="lp-wrap lp-section lp-section--tight">
        <div className="lp-highlightgrid">
          <div className="lp-highlight">
            <VideoOff size={18} />
            <div>
              <b>Your camera stays with you</b>
              <p className="lp-body" style={{ marginTop: 4 }}>
                Video frames never leave your device. We store strokes, not footage.
              </p>
            </div>
          </div>
          <div className="lp-highlight">
            <Lock size={18} />
            <div>
              <b>No selling, no ad tracking</b>
              <p className="lp-body" style={{ marginTop: 4 }}>
                We do not sell personal data and do not run advertising trackers.
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
            <Lock size={18} />
            <div>
              <b>Exercising a right, or reading the money side?</b>
              <p className="lp-body" style={{ marginTop: 6 }}>
                Data requests go to{' '}
                <a className="lp-link" href={mailto(SITE.privacyEmail, 'Data request')}>
                  {SITE.privacyEmail}
                </a>
                . Payments, refunds and cancellations are covered by the{' '}
                <Link className="lp-link" to={ROUTES.refundPolicy}>
                  Refund Policy
                </Link>
                , and the ground rules are in the{' '}
                <Link className="lp-link" to={ROUTES.terms}>
                  Terms &amp; Conditions
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
