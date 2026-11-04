import { useMemo, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import CommunityHeader from '../components/community/CommunityHeader';
import Composer from '../components/community/Composer';
import FilterBar from '../components/community/FilterBar';
import ReportFeed from '../components/community/ReportFeed';
import PendingSubmissions from '../components/community/PendingSubmissions';
import CommunitySidebar from '../components/community/CommunitySidebar';
import CreateReportModal from '../components/community/CreateReportModal';
import ReportContentModal from '../components/community/ReportContentModal';
import { useReports } from '../hooks/useReports';
import { PAGE_SIZE } from '../data/communityData';
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filterAndSortReports,
} from '../utils/reportFilters';

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
    toggleUpvote,
    addComment,
    flagComment,
    flagReport,
    submitReport,
    withdrawPending,
  } = useReports();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [createOpen, setCreateOpen] = useState(false);
  const [flagTarget, setFlagTarget] = useState(null);

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

  const openCreate = () => setCreateOpen(true);

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

      <CreateReportModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={submitReport}
      />

      <ReportContentModal
        report={flagTarget}
        onClose={() => setFlagTarget(null)}
        onSubmit={flagReport}
      />
    </>
  );
}