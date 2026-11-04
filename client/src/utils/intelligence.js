import { CASE_STATUS } from './status';

/** Order in which legal statuses are always displayed. */
export const STATUS_ORDER = ['allegation', 'investigation', 'court', 'conviction'];

export const STATUS_COLORS = {
  allegation: '#F59E0B',
  investigation: '#1685FF',
  court: '#A78BFA',
  conviction: '#F87171',
};

export const SECTOR_ORDER = ['Government', 'Private', 'Mixed'];

export const AREA_COLORS = ['#38BDF8', '#1685FF', '#A78BFA', '#F59E0B', '#34D399', '#F472B6'];

/** Timeline event kinds: the four legal statuses plus neutral background. */
export const EVENT_KINDS = {
  context: { label: 'Background', color: '#94A3B8' },
  ...Object.fromEntries(
    STATUS_ORDER.map((key) => [key, { label: CASE_STATUS[key].label, color: STATUS_COLORS[key] }]),
  ),
};

export const DEFAULT_CASE_FILTERS = { query: '', status: '', sector: '', state: '' };

export function countActiveCaseFilters(filters) {
  return Object.values(filters).filter((v) => String(v).trim() !== '').length;
}

export function filterCases(cases, filters) {
  const q = filters.query.trim().toLowerCase();

  return cases.filter((c) => {
    if (filters.status && c.status !== filters.status) return false;
    if (filters.sector && c.sector !== filters.sector) return false;
    if (filters.state && c.state !== filters.state) return false;

    if (q) {
      const haystack = [c.title, c.summary, c.outcome, c.state, c.location, c.area, c.period, c.sector]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function countStatuses(cases) {
  const result = Object.fromEntries(STATUS_ORDER.map((s) => [s, 0]));
  cases.forEach((c) => {
    result[c.status] += 1;
  });
  return result;
}

export function countBy(cases, keyFn) {
  const map = new Map();
  cases.forEach((c) => {
    const key = keyFn(c);
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || String(a.name).localeCompare(String(b.name)));
}

function emptyRow(label) {
  return { label, total: 0, ...Object.fromEntries(STATUS_ORDER.map((s) => [s, 0])) };
}

/** Rows like { label, total, allegation, investigation, court, conviction }. */
export function stackedByStatus(
  cases,
  keyFn,
  sorter = (a, b) => b.total - a.total || a.label.localeCompare(b.label),
) {
  const map = new Map();
  cases.forEach((c) => {
    const label = String(keyFn(c));
    const row = map.get(label) ?? emptyRow(label);
    row[c.status] += 1;
    row.total += 1;
    map.set(label, row);
  });
  return [...map.values()].sort(sorter);
}

/** One row per year from the earliest to the latest case (gaps stay visible). */
export function yearRows(cases) {
  if (!cases.length) return [];
  const years = cases.map((c) => c.startYear);
  const min = Math.min(...years);
  const max = Math.max(...years);
  const byLabel = new Map(stackedByStatus(cases, (c) => c.startYear).map((r) => [r.label, r]));

  const rows = [];
  for (let year = min; year <= max; year += 1) {
    rows.push(byLabel.get(String(year)) ?? emptyRow(String(year)));
  }
  return rows;
}

export function decadeRows(cases) {
  return stackedByStatus(
    cases,
    (c) => `${Math.floor(c.startYear / 10) * 10}s`,
    (a, b) => a.label.localeCompare(b.label),
  );
}

/** Groups cases that have real coordinates by place. Cases without geo are skipped. */
export function geoPoints(cases) {
  const map = new Map();
  cases.forEach((c) => {
    if (!c.geo) return;
    const key = c.geo.place;
    if (!map.has(key)) {
      map.set(key, { place: c.geo.place, x: c.geo.lng, y: c.geo.lat, z: 0, titles: [] });
    }
    const point = map.get(key);
    point.z += 1;
    point.titles.push(c.title);
  });
  return [...map.values()];
}

export function collectTimeline(cases) {
  return cases
    .flatMap((c) =>
      c.timeline.map((event, i) => ({
        ...event,
        key: `${c.id}-${i}`,
        caseId: c.id,
        caseTitle: c.title,
      })),
    )
    .sort((a, b) => a.year - b.year || a.caseTitle.localeCompare(b.caseTitle));
}

export function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
}