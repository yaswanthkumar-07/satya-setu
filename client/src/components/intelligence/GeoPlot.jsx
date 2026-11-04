import { useMemo } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import ChartCard, { NoChartData } from './ChartCard';
import { AXIS_TICK, GRID_STROKE } from './chartTheme';
import { geoPoints } from '../../utils/intelligence';

function GeoTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="max-w-xs rounded-xl border border-white/15 bg-midnight px-3 py-2 text-xs text-slate-200 shadow-lg">
      <p className="font-semibold text-white">{point.place}</p>
      <p className="mt-0.5 text-slate-400">
        {point.z} case{point.z === 1 ? '' : 's'}
      </p>
      <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
        {point.titles.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Schematic location plot (longitude on X, latitude on Y). It is NOT a map.
 * Only cases that carry real coordinates are plotted.
 */
export default function GeoPlot({ cases }) {
  const points = useMemo(() => geoPoints(cases), [cases]);
  const skipped = cases.length - points.reduce((sum, p) => sum + p.z, 0);

  return (
    <ChartCard
      title="Where the cases were centred"
      description="Each point is the city where a matter was centred or tried. Larger points hold more cases. The plot is schematic and does not show where the effects were felt."
    >
      {points.length === 0 ? (
        <NoChartData />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-[26rem] w-full lg:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid stroke={GRID_STROKE} />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Longitude"
                  domain={[67, 98]}
                  ticks={[70, 75, 80, 85, 90, 95]}
                  tick={AXIS_TICK}
                  tickFormatter={(v) => `${v}°E`}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Latitude"
                  domain={[6, 37]}
                  ticks={[10, 15, 20, 25, 30, 35]}
                  tick={AXIS_TICK}
                  tickFormatter={(v) => `${v}°N`}
                />
                <ZAxis type="number" dataKey="z" range={[180, 560]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<GeoTooltip />} />
                <Scatter data={points} fill="#38BDF8" fillOpacity={0.7} stroke="#38BDF8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cyan">
              Plotted locations
            </h4>
            <ul className="mt-3 divide-y divide-white/10">
              {[...points]
                .sort((a, b) => b.z - a.z || a.place.localeCompare(b.place))
                .map((p) => (
                  <li key={p.place} className="flex items-center justify-between py-2 text-sm text-slate-200">
                    <span>{p.place}</span>
                    <span className="font-semibold text-white">{p.z}</span>
                  </li>
                ))}
            </ul>
            {skipped > 0 && (
              <p className="mt-3 text-xs text-slate-400">
                {skipped} case{skipped === 1 ? ' has' : 's have'} no location data and
                {skipped === 1 ? ' is' : ' are'} not plotted.
              </p>
            )}
          </div>
        </div>
      )}
    </ChartCard>
  );
}