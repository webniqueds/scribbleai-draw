import { StrictMode, useState } from 'react';
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

/**
 * Without a Clerk key there is no sign-in and no studio, but throwing here used
 * to leave a completely blank page. Instead the marketing side of the app still
 * renders, and the CTA explains what is missing.
 */
function MarketingWithoutAuth() {
  const { path } = useRoute();
  const [showNotice, setShowNotice] = useState(false);

  if (isPublicRoute(path)) return <PublicSite />;

  return (
    <>
      <LandingScreen onGetStarted={() => setShowNotice(true)} />
      {showNotice && <ConfigNotice onClose={() => setShowNotice(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {clerkPublishableKey ? (
        <ClerkProvider publishableKey={clerkPublishableKey}>
          <Root />
        </ClerkProvider>
      ) : (
        <MarketingWithoutAuth />
      )}
    </ErrorBoundary>
  </StrictMode>
);
