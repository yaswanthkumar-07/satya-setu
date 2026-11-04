import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import { EmptyState } from '../ui/States';
import { STATUS_ORDER } from '../../utils/intelligence';

const COLUMNS = [
  { key: 'title', label: 'Case' },
  { key: 'startYear', label: 'Year' },
  { key: 'sector', label: 'Sector' },
  { key: 'state', label: 'State' },
  { key: 'status', label: 'Legal status' },
];

const PAGE = 8;

function compare(a, b, key) {
  if (key === 'status') return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
  if (key === 'startYear') return a.startYear - b.startYear;
  return String(a[key]).localeCompare(String(b[key]));
}

export default function CaseTable({ cases, onOpen }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'startYear', dir: 'desc' });
  const [limit, setLimit] = useState(PAGE);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = q
      ? cases.filter((c) =>
          [c.title, c.state, c.location, c.sector, c.area, c.summary]
            .join(' ')
            .toLowerCase()
            .includes(q),
        )
      : cases;
    const sorted = [...matched].sort((a, b) => compare(a, b, sort.key));
    return sort.dir === 'desc' ? sorted.reverse() : sorted;
  }, [cases, query, sort]);

  const toggleSort = (key) => {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  };

  const shown = rows.slice(0, limit);

  return (
    <Card dark className="p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300" aria-live="polite">
          {rows.length} of {cases.length} cases. Dashboard filters also apply here.
        </p>
        <div className="relative sm:w-72">
          <label htmlFor="table-search" className="sr-only">
            Search the case register
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="table-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Search this table…"
            className="w-full rounded-xl border border-white/15 bg-midnight/60 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          dark
          className="mt-5"
          title="No cases match"
          description="Try a different search word or clear the dashboard filters."
        />
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <caption className="sr-only">Searchable register of historical cases</caption>
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                {COLUMNS.map((col) => {
                  const active = sort.key === col.key;
                  const Icon = !active ? ArrowUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown;
                  return (
                    <th
                      key={col.key}
                      scope="col"
                      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                      className="px-3 py-3 font-semibold"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key)}
                        className={`inline-flex items-center gap-1.5 uppercase tracking-wider transition hover:text-white ${
                          active ? 'text-cyan' : ''
                        }`}
                      >
                        {col.label}
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {shown.map((c) => (
                <tr key={c.id} className="border-b border-white/5 transition hover:bg-white/5">
                  <td className="max-w-xs px-3 py-3.5">
                    <button
                      type="button"
                      onClick={() => onOpen(c.id)}
                      className="text-left font-semibold text-white hover:text-cyan hover:underline"
                    >
                      {c.title}
                    </button>
                  </td>
                  <td className="px-3 py-3.5 text-slate-300">{c.startYear}</td>
                  <td className="px-3 py-3.5 text-slate-300">{c.sector}</td>
                  <td className="px-3 py-3.5 text-slate-300">{c.state}</td>
                  <td className="px-3 py-3.5">
                    <StatusBadge type="case" status={c.status} dark />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > limit && (
        <div className="mt-5 flex justify-center">
          <Button variant="onDark" size="sm" onClick={() => setLimit((l) => l + PAGE)}>
            Show more rows
          </Button>
        </div>
      )}
    </Card>
  );
}