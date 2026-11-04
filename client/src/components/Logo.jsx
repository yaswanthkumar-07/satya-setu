import { Link } from 'react-router-dom';
import { SITE } from '../utils/constants';

/**
 * Brand mark: a stylised bridge arch (Setu) with a cyan "truth" point.
 * variant: "light" (for light backgrounds) | "dark" (for dark backgrounds)
 */
export default function Logo({ variant = 'light', showTelugu = true, className = '' }) {
  const isDark = variant === 'dark';

  return (
    <Link
      to="/"
      aria-label={`${SITE.name} home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-cyan shadow-glow">
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 22c3-9 7-13 13-13s10 4 13 13" />
          <path d="M3 25h26" />
          <path d="M10 25v-6M16 25V9M22 25v-6" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-lg font-bold tracking-wide ${
            isDark ? 'text-white' : 'text-midnight'
          }`}
        >
          {SITE.name}
        </span>
        {showTelugu && (
          <span
            className={`mt-1 text-[0.7rem] font-medium tracking-wider ${
              isDark ? 'text-cyan' : 'text-electric'
            }`}
          >
            {SITE.telugu}
          </span>
        )}
      </span>
    </Link>
  );
}