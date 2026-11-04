import { Component } from 'react';

/**
 * Last line of defence: if any component throws while rendering, show a
 * friendly screen instead of a blank page. It sits outside the router, so it
 * uses a plain link.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Hook a monitoring service in here later. Never send personal data.
    if (import.meta.env.DEV) console.error('Render error:', error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-electric">Unexpected error</p>
        <h1 className="mt-3 max-w-xl font-serif text-4xl font-bold text-midnight">
          Something broke on this page
        </h1>
        <p className="mt-4 max-w-md text-muted">
          This is a problem on our side. Reloading usually fixes it. Nothing you typed was sent.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-electric px-5 py-3 text-sm font-semibold text-white hover:bg-electric/90"
          >
            Reload the page
          </button>
          <a
            href="/"
            className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-midnight hover:border-electric hover:text-electric"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
}