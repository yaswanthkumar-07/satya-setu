import { Loader2, Inbox, AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

/** Spinner for data that is still loading. */
export function LoadingState({ message = 'Loading…', dark = false, className = '' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-3 py-16 text-center ${className}`}
    >
      <Loader2
        className={`h-8 w-8 animate-spin ${dark ? 'text-cyan' : 'text-electric'}`}
        aria-hidden="true"
      />
      <p className={`text-sm ${dark ? 'text-slate-300' : 'text-muted'}`}>{message}</p>
    </div>
  );
}

/** Shown when a list or search returns nothing. */
export function EmptyState({
  title = 'Nothing to show yet',
  description,
  action,
  dark = false,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-14 text-center ${
        dark ? 'border-white/15 bg-white/5' : 'border-line bg-white'
      } ${className}`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          dark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'
        }`}
      >
        <Inbox className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className={`mt-4 font-sans text-base font-semibold ${dark ? 'text-white' : 'text-midnight'}`}>
        {title}
      </h3>
      {description && (
        <p className={`mt-1 max-w-sm text-sm ${dark ? 'text-slate-400' : 'text-muted'}`}>{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Shown when a request fails. Pass onRetry to show a retry button. */
export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  dark = false,
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center rounded-2xl border px-6 py-14 text-center ${
        dark ? 'border-red-400/30 bg-red-500/10' : 'border-red-200 bg-red-50'
      } ${className}`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          dark ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-600'
        }`}
      >
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className={`mt-4 font-sans text-base font-semibold ${dark ? 'text-white' : 'text-midnight'}`}>
        {title}
      </h3>
      <p className={`mt-1 max-w-sm text-sm ${dark ? 'text-slate-300' : 'text-muted'}`}>{message}</p>
      {onRetry && (
        <Button
          variant={dark ? 'onDark' : 'outline'}
          size="sm"
          icon={RefreshCw}
          iconPosition="left"
          onClick={onRetry}
          className="mt-5"
        >
          Try again
        </Button>
      )}
    </div>
  );
}