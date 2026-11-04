import { ChevronDown, Search } from 'lucide-react';
import Card from '../ui/Card';
import { CASE_STATUS } from '../../utils/status';
import { SECTOR_ORDER } from '../../utils/intelligence';

const FIELD =
  'w-full rounded-xl border border-white/15 bg-midnight/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30 [color-scheme:dark]';

function DarkSelect({ id, label, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <select id={id} value={value} onChange={onChange} className={`${FIELD} appearance-none pr-9`}>
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function CaseFilters({
  filters,
  onChange,
  onClear,
  states,
  activeCount,
  resultCount,
  totalCount,
}) {
  return (
    <Card dark className="p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
        Search and filter the whole dashboard
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-4">
          <label htmlFor="case-search" className="sr-only">
            Search cases
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="case-search"
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search by case name, place, keyword…"
            className={`${FIELD} pl-10`}
          />
        </div>

        <DarkSelect
          id="case-status"
          label="Legal status"
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value })}
        >
          <option value="">All legal statuses</option>
          {Object.entries(CASE_STATUS).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.label}
            </option>
          ))}
        </DarkSelect>

        <DarkSelect
          id="case-sector"
          label="Sector"
          value={filters.sector}
          onChange={(e) => onChange({ sector: e.target.value })}
        >
          <option value="">All sectors</option>
          {SECTOR_ORDER.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </DarkSelect>

        <DarkSelect
          id="case-state"
          label="State or UT"
          value={filters.state}
          onChange={(e) => onChange({ state: e.target.value })}
        >
          <option value="">All states</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </DarkSelect>

        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className="rounded-xl border border-white/15 px-3.5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear filters
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-400" aria-live="polite">
        Showing {resultCount} of {totalCount} cases
      </p>
    </Card>
  );
}