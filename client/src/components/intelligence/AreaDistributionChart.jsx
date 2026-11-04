import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard, { NoChartData } from './ChartCard';
import { TOOLTIP_PROPS } from './chartTheme';
import { AREA_COLORS, countBy } from '../../utils/intelligence';

export default function AreaDistributionChart({ cases }) {
  const rows = useMemo(() => countBy(cases, (c) => c.area), [cases]);

  return (
    <ChartCard
      title="Distribution by area"
      description="The kind of activity each matter concerned. A case is counted once, under its main area."
    >
      {rows.length === 0 ? (
        <NoChartData />
      ) : (
        <div className="grid items-center gap-4 sm:grid-cols-2">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rows}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={56}
                  outerRadius={92}
                  paddingAngle={2}
                  stroke="none"
                >
                  {rows.map((row, i) => (
                    <Cell key={row.name} fill={AREA_COLORS[i % AREA_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...TOOLTIP_PROPS} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="space-y-3">
            {rows.map((row, i) => (
              <li key={row.name} className="flex items-start gap-3 text-sm text-slate-200">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: AREA_COLORS[i % AREA_COLORS.length] }}
                  aria-hidden="true"
                />
                <span className="flex-1">{row.name}</span>
                <span className="font-semibold text-white">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ChartCard>
  );
}