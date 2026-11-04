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
import { STATUS_COLORS, STATUS_ORDER, stackedByStatus } from '../../utils/intelligence';
import { CASE_STATUS } from '../../utils/status';

export default function StateChart({ cases }) {
  const rows = useMemo(() => stackedByStatus(cases, (c) => c.state), [cases]);
  const height = Math.max(260, rows.length * 46 + 70);

  return (
    <ChartCard
      title="Cases by state"
      description="The state or UT where the matter arose or was principally handled. National matters are counted under Delhi."
    >
      {rows.length === 0 ? (
        <NoChartData />
      ) : (
        <div className="w-full" style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={GRID_STROKE} horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={AXIS_TICK} />
              <YAxis type="category" dataKey="label" width={104} tick={AXIS_TICK} />
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