import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import Root from './Root';
import PublicSite from './components/PublicSite';
import LandingScreen from './components/LandingScreen';
import ConfigNotice from './components/ConfigNotice';
import { ErrorBoundary } from './components/ErrorBoundary';
import { isPublicRoute, useRoute } from './lib/router';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

const CLERK_LOAD_FAILED_NOTICE =
  'Clerk could not load its scripts, so sign-in is unavailable. This publishable key points at ' +
  'a custom domain that is not serving Clerk assets (404 / CORS). Replace ' +
  'VITE_CLERK_PUBLISHABLE_KEY with the standard key from your Clerk dashboard ' +
  '(pk_test_...clerk.accounts.dev) and redeploy.';

/**
 * Without a Clerk key there is no sign-in and no studio, but throwing here used
 * to leave a completely blank page. Instead the marketing side of the app still
 * renders, and the CTA explains what is missing.
 */
function MarketingWithoutAuth({ notice }: { notice?: string }) {
  const { path } = useRoute();
  const [showNotice, setShowNotice] = useState(Boolean(notice));

  if (isPublicRoute(path)) return <PublicSite />;

  return (
    <>
      <LandingScreen onGetStarted={() => setShowNotice(true)} />
      {showNotice && <ConfigNotice detail={notice} onClose={() => setShowNotice(false)} />}
    </>
  );
}

/**
 * ClerkProvider renders nothing until clerk-js finishes loading. If the script
 * fails (bad key, blocked proxy domain, offline), that promise never resolves
 * and the page stays blank forever. Watch for the failure and fall back to the
 * public site so something always renders.
 */
function ClerkGate({ publishableKey }: { publishableKey: string }) {
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as { code?: string; message?: string } | undefined;
      const message = String(reason?.message ?? reason ?? '');
      if (
        (reason?.code && reason.code.startsWith('failed_to_load_clerk')) ||
        message.includes('Failed to load Clerk')
      ) {
        setLoadFailed(true);
      }
    };

    // If clerk-js never mounted anything, stop waiting.
    const timer = window.setTimeout(() => {
      const root = document.getElementById('root');
      if (root && root.childElementCount === 0) setLoadFailed(true);
    }, 10000);

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
      window.clearTimeout(timer);
    };
  }, []);

  if (loadFailed) return <MarketingWithoutAuth notice={CLERK_LOAD_FAILED_NOTICE} />;

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Root />
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {clerkPublishableKey ? (
        <ClerkGate publishableKey={clerkPublishableKey} />
      ) : (
        <MarketingWithoutAuth />
      )}
    </ErrorBoundary>
  </StrictMode>
);
