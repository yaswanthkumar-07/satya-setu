import { useMemo } from 'react';
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
import { SECTOR_ORDER, STATUS_COLORS, STATUS_ORDER, stackedByStatus } from '../../utils/intelligence';
import { CASE_STATUS } from '../../utils/status';

export default function SectorComparison({ cases }) {
  const rows = useMemo(
    () =>
      stackedByStatus(
        cases,
        (c) => c.sector,
        (a, b) => SECTOR_ORDER.indexOf(a.label) - SECTOR_ORDER.indexOf(b.label),
      ),
    [cases],
  );

  return (
    <ChartCard
      title="Government vs private sector"
      description="Where the alleged wrongdoing took place. “Mixed” means a public body and a private entity were both central to the matter."
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