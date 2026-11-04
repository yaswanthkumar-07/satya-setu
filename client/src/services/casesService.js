import { api, unwrap } from './api';
import { CASE_STATUS } from '../utils/status';
import { SECTOR_ORDER } from '../utils/intelligence';

/**
 * Returns a clean case, or null when the record cannot be shown safely.
 * A case with an unknown legal status is DROPPED rather than guessed, so a
 * wrong status can never reach the dashboard.
 */
export function normalizeCase(raw) {
  const id = String(raw?.id ?? raw?._id ?? '');
  const startYear = Number(raw?.startYear);

  if (!id || !raw?.title || !CASE_STATUS[raw.status] || !Number.isFinite(startYear)) return null;

  const geo =
    raw.geo && Number.isFinite(Number(raw.geo.lat)) && Number.isFinite(Number(raw.geo.lng)) && raw.geo.place
      ? { place: String(raw.geo.place), lat: Number(raw.geo.lat), lng: Number(raw.geo.lng) }
      : null;

  return {
    id,
    title: String(raw.title),
    startYear,
    period: raw.period ?? String(startYear),
    sector: SECTOR_ORDER.includes(raw.sector) ? raw.sector : 'Mixed',
    area: raw.area ?? 'Other',
    state: raw.state ?? 'Unspecified',
    location: raw.location ?? raw.state ?? '',
    geo,
    status: raw.status,
    statusNote: raw.statusNote ?? '',
    summary: raw.summary ?? '',
    outcome: raw.outcome ?? '',
    timeline: Array.isArray(raw.timeline) ? raw.timeline : [],
    sources: Array.isArray(raw.sources) ? raw.sources : [],
  };
}

export const casesService = {
  async list({ signal } = {}) {
    const items = unwrap(await api.get('/cases', { signal }));
    return (Array.isArray(items) ? items : []).map(normalizeCase).filter(Boolean);
  },
};