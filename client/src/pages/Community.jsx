import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertTriangle, X } from 'lucide-react';
import CommunityHeader from '../components/community/CommunityHeader';
import Composer from '../components/community/Composer';
import FilterBar from '../components/community/FilterBar';
import ReportFeed from '../components/community/ReportFeed';
import PendingSubmissions from '../components/community/PendingSubmissions';
import CommunitySidebar from '../components/community/CommunitySidebar';
import CreateReportSection from '../components/community/CreateReportSection';
import ReportContentModal from '../components/community/ReportContentModal';
import DemoNotice from '../components/ui/DemoNotice';
import { useReports } from '../hooks/useReports';
import { PAGE_SIZE } from '../data/communityData';
import { ENV } from '../utils/constants';
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filterAndSortReports,
} from '../utils/reportFilters';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function Community() {
  const {
    reports,
    commentsByReport,
    pending,
    votedIds,
    flaggedReportIds,
    loading,
    error,
    actionError,
    clearActionError,
    reload,
    clearLocalData,
    toggleUpvote,
    addComment,
    flagComment,
    flagReport,
    submitReport,
    withdrawPending,
  } = useReports();

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [flagTarget, setFlagTarget] = useState(null);

  // Every "create a report" button bumps this counter. The effect below scrolls
  // to the form once the feed has finished loading, so the page height is
  // final and the scroll lands in the right place.
  const [scrollTick, setScrollTick] = useState(0);
  const handledTickRef = useRef(0);

  const openCreate = () => setScrollTick((t) => t + 1);

  useEffect(() => {
    if (scrollTick === 0 || loading) return;
    if (handledTickRef.current === scrollTick) return;
    handledTickRef.current = scrollTick;

    const reduce = prefersReducedMotion();
    requestAnimationFrame(() => {
      document
        .getElementById('create-report')
        ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      // Put the cursor in the Title field once the scroll has (mostly) finished
      setTimeout(
        () => document.getElementById('rpt-title')?.focus({ preventScroll: true }),
        reduce ? 0 : 600,
      );
    });
  }, [scrollTick, loading]);

  // "Report an Issue" in the navbar and "Share a concern" on the Home page link to
  // /community?new=1. Scroll to the form, then remove the parameter so a
  // refresh does not repeat it.
  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setScrollTick((t) => t + 1);
      const next = new URLSearchParams(searchParams);
      next.delete('new');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // After "Done" or "Cancel" in the form, go back up to the user's pending reports.
  const handleFormFinished = () => {
    const reduce = prefersReducedMotion();
    requestAnimationFrame(() => {
      const target = document.getElementById('awaiting-moderation');
      if (target) {
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  };

  const matches = useMemo(() => filterAndSortReports(reports, filters), [reports, filters]);
  const shown = matches.slice(0, visible);
  const activeCount = countActiveFilters(filters);

  const updateFilters = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setVisible(PAGE_SIZE);
  };

  const clearFilters = () => {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, sort: prev.sort }));
    setVisible(PAGE_SIZE);
  };

  const handleClearLocal = () => {
    if (window.confirm('Remove the reports and comments you added in this browser?')) {
      clearLocalData();
    }
  };

  return (
    <>
      <CommunityHeader onCreate={openCreate} />

      <section className="py-10 sm:py-12">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            {actionError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p className="flex-1 leading-relaxed">{actionError}</p>
                <button
                  type="button"
                  onClick={clearActionError}
                  aria-label="Dismiss message"
                  className="rounded p-0.5 text-red-500 hover:bg-red-100"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {ENV.USE_DEMO_DATA && (
              <DemoNotice>
                <strong>Demo mode.</strong> Reports and comments you add are saved only in this
                browser (local storage). They are not shared with other users or devices.{' '}
                <button
                  type="button"
                  onClick={handleClearLocal}
                  className="font-semibold underline underline-offset-2 hover:no-underline"
                >
                  Clear my demo data
                </button>
              </DemoNotice>
            )}

            <Composer onCreate={openCreate} />
            <PendingSubmissions items={pending} onWithdraw={withdrawPending} />
            <FilterBar
              filters={filters}
              onChange={updateFilters}
              onClear={clearFilters}
              activeCount={activeCount}
              resultCount={matches.length}
              totalCount={reports.length}
            />

            <ReportFeed
              reports={shown}
              totalMatches={matches.length}
              loading={loading}
              error={error}
              onRetry={reload}
              hasFilters={activeCount > 0}
              onClearFilters={clearFilters}
              onCreate={openCreate}
              hasMore={shown.length < matches.length}
              onLoadMore={() => setVisible((v) => v + PAGE_SIZE)}
              commentsByReport={commentsByReport}
              votedIds={votedIds}
              flaggedReportIds={flaggedReportIds}
              onUpvote={toggleUpvote}
              onFlag={setFlagTarget}
              onAddComment={addComment}
              onFlagComment={flagComment}
            />
          </div>

          <aside className="lg:col-span-4" aria-label="Community guidelines">
            <CommunitySidebar />
          </aside>
        </div>
      </section>

      <CreateReportSection onSubmit={submitReport} onFinished={handleFormFinished} />

      <ReportContentModal
        report={flagTarget}
        onClose={() => setFlagTarget(null)}
        onSubmit={flagReport}
      />
    </>
  );
}
