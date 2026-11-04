import { useMemo, useState } from 'react';
import IntelligenceHero from '../components/intelligence/IntelligenceHero';
import KpiRow from '../components/intelligence/KpiRow';
import CaseFilters from '../components/intelligence/CaseFilters';
import CaseCards from '../components/intelligence/CaseCards';
import CaseDetailModal from '../components/intelligence/CaseDetailModal';
import TimeChart from '../components/intelligence/TimeChart';
import SectorComparison from '../components/intelligence/SectorComparison';
import StateChart from '../components/intelligence/StateChart';
import AreaDistributionChart from '../components/intelligence/AreaDistributionChart';
import GeoPlot from '../components/intelligence/GeoPlot';
import Timeline from '../components/intelligence/Timeline';
import CaseTable from '../components/intelligence/CaseTable';
import Methodology from '../components/intelligence/Methodology';
import DashSection from '../components/intelligence/DashSection';
import Button from '../components/ui/Button';
import { EmptyState, ErrorState, LoadingState } from '../components/ui/States';
import { useCases } from '../hooks/useCases';
import {
  DEFAULT_CASE_FILTERS,
  countActiveCaseFilters,
  filterCases,
  uniqueSorted,
} from '../utils/intelligence';

export default function Intelligence() {
  const { cases, loading, error, reload } = useCases();
  const [filters, setFilters] = useState(DEFAULT_CASE_FILTERS);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => filterCases(cases, filters), [cases, filters]);
  const states = useMemo(() => uniqueSorted(cases.map((c) => c.state)), [cases]);
  const selected = cases.find((c) => c.id === selectedId) ?? null;
  const activeCount = countActiveCaseFilters(filters);

  const updateFilters = (patch) => setFilters((prev) => ({ ...prev, ...patch }));
  const clearFilters = () => setFilters(DEFAULT_CASE_FILTERS);

  let body;

  if (loading) {
    body = <LoadingState dark message="Loading the case register…" />;
  } else if (error) {
    body = <ErrorState dark message={error} onRetry={reload} />;
  } else {
    body = (
      <>
        <KpiRow cases={filtered} totalCases={cases.length} />

        <CaseFilters
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
          states={states}
          activeCount={activeCount}
          resultCount={filtered.length}
          totalCount={cases.length}
        />

        {filtered.length === 0 ? (
          <EmptyState
            dark
            title="No cases match your filters"
            description="Try removing a filter or searching with different words."
            action={
              <Button variant="onDark" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <DashSection
              id="cases"
              eyebrow="Case files"
              title="Historical case cards"
              description="Each card shows the latest recorded legal status and a plain-language note on what that does and does not mean. Open a case file for the key events and where to verify."
            >
              <CaseCards cases={filtered} onOpen={setSelectedId} />
            </DashSection>

            <DashSection
              id="patterns"
              eyebrow="Patterns"
              title="Year, state, sector and area"
              description="These charts count only the cases in this register, so they describe the register and nothing wider."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <TimeChart cases={filtered} />
                <SectorComparison cases={filtered} />
                <StateChart cases={filtered} />
                <AreaDistributionChart cases={filtered} />
              </div>
            </DashSection>

            <DashSection
              id="locations"
              eyebrow="Geography"
              title="Where the cases were centred"
              description="Only cases with real location data are plotted."
            >
              <GeoPlot cases={filtered} />
            </DashSection>

            <DashSection
              id="timeline"
              eyebrow="Timeline"
              title="Historical timeline"
              description="Key events across the selected cases in date order, colour-coded by what kind of event each one was."
            >
              <Timeline cases={filtered} onOpen={setSelectedId} />
            </DashSection>

            <DashSection
              id="register"
              eyebrow="Register"
              title="Searchable case table"
              description="Sort by any column. Select a case name to open its file."
            >
              <CaseTable cases={filtered} onOpen={setSelectedId} />
            </DashSection>
          </>
        )}

        <DashSection
          id="method"
          eyebrow="Method"
          title="How to read this dashboard"
        >
          <Methodology />
        </DashSection>
      </>
    );
  }

  return (
    <>
      <IntelligenceHero total={cases.length} />

      <div className="container-page space-y-14 py-12 sm:py-16">{body}</div>

      <CaseDetailModal item={selected} onClose={() => setSelectedId(null)} />
    </>
  );
}