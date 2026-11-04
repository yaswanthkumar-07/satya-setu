import { ChevronDown } from 'lucide-react';

const BASE =
  'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400';
const OK = 'border-line focus:border-electric focus:ring-electric/20';
const BAD = 'border-red-400 focus:border-red-500 focus:ring-red-200';

/** Label + control + hint/error wrapper. */
export function Field({ id, label, hint, error, required, hideLabel = false, className = '', children }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={hideLabel ? 'sr-only' : 'mb-1.5 block text-sm font-semibold text-ink'}
      >
        {label}
        {required && (
          <span className="text-red-500" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ id, invalid = false, className = '', ...props }) {
  return (
    <input
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
      className={`${BASE} ${invalid ? BAD : OK} ${className}`}
      {...props}
    />
  );
}

export function TextArea({ id, invalid = false, className = '', ...props }) {
  return (
    <textarea
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
      className={`${BASE} resize-y ${invalid ? BAD : OK} ${className}`}
      {...props}
    />
  );
}

export function Select({ id, invalid = false, className = '', children, ...props }) {
  return (
    <div className="relative">
      <select
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : `${id}-hint`}
        className={`${BASE} appearance-none pr-9 ${invalid ? BAD : OK} ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}