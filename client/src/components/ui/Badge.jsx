const LIGHT = {
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  blue: 'bg-electric/10 text-electric ring-electric/20',
  cyan: 'bg-cyan/15 text-sky-700 ring-cyan/30',
  amber: 'bg-amber/15 text-amber-700 ring-amber/30',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  red: 'bg-red-50 text-red-700 ring-red-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200',
};

const DARK = {
  neutral: 'bg-white/10 text-slate-200 ring-white/15',
  blue: 'bg-electric/20 text-sky-300 ring-electric/30',
  cyan: 'bg-cyan/15 text-cyan ring-cyan/30',
  amber: 'bg-amber/15 text-amber ring-amber/30',
  green: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/30',
  red: 'bg-red-500/15 text-red-300 ring-red-400/30',
  violet: 'bg-violet-500/15 text-violet-300 ring-violet-400/30',
};

/** Small pill label. tone: neutral | blue | cyan | amber | green | red | violet */
export default function Badge({
  tone = 'neutral',
  dark = false,
  icon: Icon,
  className = '',
  children,
  ...rest
}) {
  const palette = dark ? DARK : LIGHT;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        palette[tone] ?? palette.neutral
      } ${className}`}
      {...rest}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  );
}