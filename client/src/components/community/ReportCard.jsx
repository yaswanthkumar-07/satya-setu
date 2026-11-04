import { useState } from 'react';
import {
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronUp,
  Flag,
  MapPin,
  MessageSquare,
  Paperclip,
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import StatusBadge from '../ui/StatusBadge';
import CommentSection from './CommentSection';
import { REPORT_STATUS } from '../../utils/status';
import { formatDate, timeAgo } from '../../utils/format';

function mediaLabel(media) {
  if (!media) return '';
  const parts = [];
  if (media.images) parts.push(`${media.images} image${media.images === 1 ? '' : 's'}`);
  if (media.videos) parts.push(`${media.videos} video${media.videos === 1 ? '' : 's'}`);
  return parts.join(' and ');
}

export default function ReportCard({
  report,
  comments,
  voted,
  flagged,
  onUpvote,
  onFlag,
  onAddComment,
  onFlagComment,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const SectorIcon = report.sector === 'Government' ? Building2 : Briefcase;
  const isLong = report.summary.length > 220;
  const place = [report.locality, report.district, report.state].filter(Boolean).join(', ');
  const attachments = mediaLabel(report.media);
  const statusNote = REPORT_STATUS[report.status]?.description;
  const commentsId = `comments-${report.id}`;

  return (
    <Card as="article" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={report.status} />
        <Badge tone="neutral">{report.category}</Badge>
        <Badge tone={report.sector === 'Government' ? 'blue' : 'violet'}>{report.sector} sector</Badge>
        {report.isDemo && <Badge tone="amber">Demo</Badge>}
      </div>

      <h3 className="mt-4 font-sans text-lg font-semibold leading-snug text-midnight">{report.title}</h3>

      <p className={`mt-2 text-sm leading-relaxed text-muted ${expanded ? '' : 'line-clamp-3'}`}>
        {report.summary}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 text-xs font-semibold text-electric hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {statusNote && <p className="mt-3 text-xs italic text-muted">{statusNote}</p>}

      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <div className="inline-flex items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <dd>{place}</dd>
        </div>
        {report.organisation && (
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Office or organisation</dt>
            <SectorIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <dd>{report.organisation}</dd>
          </div>
        )}
        {report.incidentDate && (
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Incident date</dt>
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <dd>Incident: {formatDate(report.incidentDate)}</dd>
          </div>
        )}
        {attachments && (
          <div
            className="inline-flex items-center gap-1.5"
            title="Attachments are placeholders in this prototype and are not displayed."
          >
            <dt className="sr-only">Attachments</dt>
            <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
            <dd>{attachments}</dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <button
          type="button"
          onClick={onUpvote}
          aria-pressed={voted}
          aria-label={`${voted ? 'Remove upvote' : 'Upvote'}. ${report.upvotes} upvotes`}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
            voted
              ? 'border-electric bg-electric/10 text-electric'
              : 'border-line text-midnight hover:border-electric hover:text-electric'
          }`}
        >
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
          {report.upvotes}
        </button>

        <button
          type="button"
          onClick={() => setShowComments((v) => !v)}
          aria-expanded={showComments}
          aria-controls={commentsId}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-midnight transition hover:border-electric hover:text-electric"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          {report.commentCount}
          <span className="sr-only"> comments</span>
        </button>

        {flagged ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            Reported to moderators
          </span>
        ) : (
          <button
            type="button"
            onClick={onFlag}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-red-50 hover:text-red-600"
          >
            <Flag className="h-4 w-4" aria-hidden="true" />
            Report
          </button>
        )}

        <span className="ml-auto text-xs text-muted">{timeAgo(report.createdAt)}</span>
      </div>

      {showComments && (
        <CommentSection
          id={commentsId}
          comments={comments}
          onAdd={onAddComment}
          onFlag={onFlagComment}
        />
      )}
    </Card>
  );
}