import { Plus } from 'lucide-react';
import ReportCard from './ReportCard';
import Button from '../ui/Button';
import { EmptyState, ErrorState, LoadingState } from '../ui/States';

export default function ReportFeed({
  reports,
  totalMatches,
  loading,
  error,
  onRetry,
  hasFilters,
  onClearFilters,
  onCreate,
  hasMore,
  onLoadMore,
  commentsByReport,
  votedIds,
  flaggedReportIds,
  onUpvote,
  onFlag,
  onAddComment,
  onFlagComment,
}) {
  if (loading) return <LoadingState message="Loading community reports…" />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  if (reports.length === 0) {
    return (
      <EmptyState
        title={hasFilters ? 'No reports match your filters' : 'No reports yet'}
        description={
          hasFilters
            ? 'Try removing a filter or searching with different words.'
            : 'Be the first to share a concern responsibly.'
        }
        action={
          hasFilters ? (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              Clear filters
            </Button>
          ) : (
            <Button size="sm" icon={Plus} iconPosition="left" onClick={onCreate}>
              Create a report
            </Button>
          )
        }
      />
    );
  }

  return (
    <div>
      <ul className="space-y-5">
        {reports.map((report) => (
          <li key={report.id}>
            <ReportCard
              report={report}
              comments={commentsByReport[report.id] ?? []}
              voted={votedIds.includes(report.id)}
              flagged={flaggedReportIds.includes(report.id)}
              onUpvote={() => onUpvote(report.id)}
              onFlag={() => onFlag(report)}
              onAddComment={(text) => onAddComment(report.id, text)}
              onFlagComment={(commentId) => onFlagComment(report.id, commentId)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-xs text-muted">
          Showing {reports.length} of {totalMatches} matching reports
        </p>
        {hasMore && (
          <Button variant="outline" onClick={onLoadMore}>
            Load more reports
          </Button>
        )}
      </div>
    </div>
  );
}