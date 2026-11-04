export const DEFAULT_FILTERS = {
  query: '',
  state: '',
  district: '',
  category: '',
  sector: '',
  status: '',
  sort: 'newest',
};

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

const SORTERS = {
  newest: byNewest,
  upvoted: (a, b) => b.upvotes - a.upvotes || byNewest(a, b),
  discussed: (a, b) => b.commentCount - a.commentCount || byNewest(a, b),
};

export function filterAndSortReports(reports, filters) {
  const q = filters.query.trim().toLowerCase();

  const matches = reports.filter((r) => {
    if (filters.state && r.state !== filters.state) return false;
    if (filters.district && r.district !== filters.district) return false;
    if (filters.category && r.category !== filters.category) return false;
    if (filters.sector && r.sector !== filters.sector) return false;
    if (filters.status && r.status !== filters.status) return false;

    if (q) {
      const haystack = [r.title, r.summary, r.category, r.organisation, r.locality, r.district, r.state]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return [...matches].sort(SORTERS[filters.sort] ?? SORTERS.newest);
}

/** Number of filters (excluding sort) that differ from the defaults. */
export function countActiveFilters(filters) {
  return ['query', 'state', 'district', 'category', 'sector', 'status'].filter(
    (key) => String(filters[key] ?? '').trim() !== '',
  ).length;
}