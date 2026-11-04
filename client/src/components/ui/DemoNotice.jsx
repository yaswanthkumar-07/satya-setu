import { Info } from 'lucide-react';

/** Banner that labels synthetic / illustrative content. */
export default function DemoNotice({ children, dark = false, className = '' }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        dark
          ? 'border-amber/30 bg-amber/10 text-amber'
          : 'border-amber/40 bg-amber/10 text-amber-800'
      } ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}