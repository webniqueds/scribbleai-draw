import { TriangleAlert, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  onClose?: () => void;
  detail?: ReactNode;
}

/**
 * Shown when the app is served without a Clerk publishable key: sign-in and the
 * studio cannot work, but the marketing pages still do, so say what is missing
 * instead of leaving a blank screen.
 */
export default function ConfigNotice({ onClose, detail }: Props) {
  return (
    <div className="lp-configbar" role="alert">
      <TriangleAlert size={17} />
      <div className="lp-configtext">
        <b>Sign-in is not configured.</b>{' '}
        {detail ?? (
          <>
            Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> in{' '}
            <code>.env.local</code> (and in your Vercel project variables), then restart or rebuild.
            Everything else on this page works without it.
          </>
        )}
      </div>
      {onClose && (
        <button type="button" className="lp-configclose" onClick={onClose} aria-label="Dismiss">
          <X size={15} />
        </button>
      )}
    </div>
  );
}
