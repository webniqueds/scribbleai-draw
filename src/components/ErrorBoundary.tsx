import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * A render crash used to leave a blank white page with the error sitting in the
 * console. This puts the message on screen instead, with the two things people
 * actually need: what went wrong, and how to get unstuck.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="lp-shell" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
        <div className="lp-card" style={{ maxWidth: 560, width: '100%' }}>
          <span className="lp-eyebrow">Something broke</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '14px 0 10px', letterSpacing: '-0.03em' }}>
            This screen could not be displayed.
          </h1>
          <p className="lp-body">
            Reloading usually fixes it. If it keeps happening, the details below tell us exactly
            what to fix — send them to support along with what you were doing.
          </p>
          <pre className="lp-errbox">{String(error?.message || error)}</pre>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
            <button type="button" className="lp-btn lp-btn-primary lp-btn-sm" onClick={() => window.location.reload()}>
              Reload the page
            </button>
            <a className="lp-btn lp-btn-ghost lp-btn-sm" href="/contact">
              Contact support
            </a>
          </div>
        </div>
      </div>
    );
  }
}
