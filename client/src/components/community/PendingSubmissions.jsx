import { Clock, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { timeAgo } from '../../utils/format';

/**
 * Shows the user's own submissions that are waiting for moderation.
 * These are NOT in the public feed.
 */
export default function PendingSubmissions({ items, onWithdraw }) {
  if (!items.length) return null;

  return (
    <Card className="border-blue-200 p-5">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-electric" aria-hidden="true" />
        <h2 className="font-sans text-base font-semibold text-midnight">
          Your submissions awaiting moderation
        </h2>
      </div>
      <p className="mt-1 text-xs text-muted">
        Only you can see these. Nothing is published until moderators have reviewed it.
      </p>

      <ul className="mt-4 divide-y divide-line">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="break-words text-sm font-semibold text-midnight">{item.title}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                <Badge tone="blue">Pending moderation</Badge>
                <span>
                  {item.district}, {item.state}
                </span>
                <span>{timeAgo(item.createdAt)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onWithdraw(item.id)}
              aria-label={`Withdraw submission: ${item.title}`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}