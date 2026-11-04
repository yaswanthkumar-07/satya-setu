import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import Card from '../ui/Card';
import { Field, Select } from '../ui/FormControls';
import { CATEGORIES, SECTORS, SORT_OPTIONS, STATES, STATE_DISTRICTS } from '../../data/communityData';
import { REPORT_STATUS } from '../../utils/status';

export default function FilterBar({ filters, onChange, onClear, activeCount, resultCount, totalCount }) {
  const [open, setOpen] = useState(false);
  const districts = filters.state ? (STATE_DISTRICTS[filters.state] ?? []) : [];

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="report-search" className="sr-only">
            Search reports
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="report-search"
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search by keyword, office, district…"
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-slate-400 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20"
          />
        </div>

        <div className="flex gap-3">
          <Field id="report-sort" label="Sort by" hideLabel className="flex-1 sm:w-44 sm:flex-none">
            <Select
              id="report-sort"
              value={filters.sort}
              onChange={(e) => onChange({ sort: e.target.value })}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="filter-panel"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-3.5 text-sm font-semibold text-midnight md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>
        </div>
      </div>

      <div
        id="filter-panel"
        className={`${open ? 'grid' : 'hidden'} mt-4 grid-cols-2 gap-3 md:grid lg:grid-cols-3`}
      >
        <Field id="filter-state" label="State" hideLabel>
          <Select
            id="filter-state"
            value={filters.state}
            onChange={(e) => onChange({ state: e.target.value, district: '' })}
          >
            <option value="">All states</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <Field id="filter-district" label="District" hideLabel>
          <Select
            id="filter-district"
            value={filters.district}
            disabled={!filters.state}
            onChange={(e) => onChange({ district: e.target.value })}
          >
            <option value="">{filters.state ? 'All districts' : 'Choose a state first'}</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </Field>

        <Field id="filter-category" label="Category" hideLabel>
          <Select
            id="filter-category"
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>

        <Field id="filter-sector" label="Sector" hideLabel>
          <Select
            id="filter-sector"
            value={filters.sector}
            onChange={(e) => onChange({ sector: e.target.value })}
          >
            <option value="">Government &amp; private</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s} sector
              </option>
            ))}
          </Select>
        </Field>

        <Field id="filter-status" label="Verification status" hideLabel className="col-span-2 lg:col-span-2">
          <Select
            id="filter-status"
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
          >
            <option value="">All verification statuses</option>
            {Object.entries(REPORT_STATUS).map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div
        className="mt-4 flex items-center justify-between text-xs text-muted"
        aria-live="polite"
      >
        <span>
          Showing {resultCount} of {totalCount} reports
        </span>
        {activeCount > 0 && (
          <button type="button" onClick={onClear} className="font-semibold text-electric hover:underline">
            Clear filters
          </button>
        )}
      </div>
    </Card>
  );
}