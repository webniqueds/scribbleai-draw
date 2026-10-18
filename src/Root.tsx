import { useUser } from '@clerk/clerk-react';
import { useRoute, isPublicRoute } from './lib/router';
import PublicSite from './components/PublicSite';
import App from './App';

/**
 * Route gate, mounted inside ClerkProvider.
 *
 * `/` is the studio (camera, sign-in, drawings). Every other known slug is a
 * public page that renders without touching the camera or the account state.
 */
export default function Root() {
  const { path } = useRoute();
  // Subscribes so the shell re-renders if auth changes underneath a public page.
  useUser();

  if (isPublicRoute(path)) return <PublicSite />;
  return <App />;
}
