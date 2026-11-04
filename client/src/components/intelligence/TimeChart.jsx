import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import ChartCard, { NoChartData } from './ChartCard';
import { AXIS_TICK, GRID_STROKE, LEGEND_STYLE, TOOLTIP_PROPS } from './chartTheme';
import { STATUS_COLORS, STATUS_ORDER, decadeRows, yearRows } from '../../utils/intelligence';
import { CASE_STATUS } from '../../utils/status';

const MODES = [
  { value: 'decade', label: 'By decade' },
  { value: 'year', label: 'By year' },
];

export default function TimeChart({ cases }) {
  const [mode, setMode] = useState('decade');

  const rows = useMemo(
    () => (mode === 'year' ? yearRows(cases) : decadeRows(cases)),
    [cases, mode],
  );

  const toggle = (
    <div className="inline-flex rounded-lg border border-white/15 p-0.5" role="group" aria-label="Group cases by">
      {MODES.map((m) => (
        <button
          key={m.value}
          type="button"
          aria-pressed={mode === m.value}
          onClick={() => setMode(m.value)}
          className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
            mode === m.value ? 'bg-cyan text-midnight' : 'text-slate-300 hover:text-white'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );

  return (
    <ChartCard
      title="Cases by year first surfaced"
      description="When each matter first became public or was first registered, coloured by its latest legal status."
      action={toggle}
    >
      {rows.length === 0 ? (
        <NoChartData />
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke={GRID_STROKE} vertical={false} />
              <XAxis dataKey="label" tick={AXIS_TICK} />
              <YAxis allowDecimals={false} tick={AXIS_TICK} />
              <Tooltip {...TOOLTIP_PROPS} />
              <Legend wrapperStyle={LEGEND_STYLE} />
              {STATUS_ORDER.map((status) => (
                <Bar
                  key={status}
                  dataKey={status}
                  name={CASE_STATUS[status].label}
                  stackId="status"
                  fill={STATUS_COLORS[status]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
}