import Card from '../ui/Card';

/** Dark panel with a title, optional description and optional header action. */
export default function ChartCard({ title, description, action, className = '', children }) {
  return (
    <Card dark className={`min-w-0 p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-sans text-base font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </Card>
  );
}

export function NoChartData() {
  return (
    <p className="flex h-48 items-center justify-center text-sm text-slate-400">
      No data for the current filters.
    </p>
  );
}