import { useRef, useState } from 'react';
import { Flag, Send, User } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { detectPersonalInfo, personalInfoMessage } from '../../utils/safety';
import { timeAgo } from '../../utils/format';
import { getErrorMessage } from '../../services/api';

const MAX_LENGTH = 500;

function fullDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function CommentSection({ id, comments, onAdd, onFlag }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false); // blocks double-clicks before React re-renders

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busyRef.current) return;
    const value = text.trim();

    if (value.length < 3) {
      setError('Please write at least a few words.');
      return;
    }
    const found = detectPersonalInfo(value);
    if (found.length) {
      setError(personalInfoMessage(found));
      return;
    }

    busyRef.current = true;
    setBusy(true);
    try {
      await onAdd(value);
      setText('');
      setError('');
    } catch (err) {
      setError(getErrorMessage(err, 'Your comment could not be posted. Please try again.'));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  return (
    <div id={id} className="mt-5 border-t border-line pt-5">
      {comments.length === 0 ? (
        <p className="text-sm text-muted">No comments yet. Add useful context, not accusations.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <User className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                  <span className="font-semibold text-ink">{c.author}</span>
                  {c.isDemo && <Badge tone="amber">Demo</Badge>}
                  <time dateTime={c.createdAt} title={fullDate(c.createdAt)}>
                    {timeAgo(c.createdAt)}
                  </time>
                </div>

                {c.flagged ? (
                  <p className="mt-1 text-sm italic text-muted">
                    You reported this comment. It is hidden while moderators review it.
                  </p>
                ) : (
                  <>
                    <p className="mt-1 break-words text-sm leading-relaxed text-ink">{c.text}</p>
                    <button
                      type="button"
                      onClick={() => onFlag(c.id)}
                      className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted transition hover:text-red-600"
                    >
                      <Flag className="h-3 w-3" aria-hidden="true" />
                      Report comment
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-5" noValidate>
        <label htmlFor={`${id}-input`} className="sr-only">
          Add a comment
        </label>
        <textarea
          id={`${id}-input`}
          rows={2}
          maxLength={MAX_LENGTH}
          value={text}
          disabled={busy}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Add context. Do not include names, phone numbers or ID details."
          aria-invalid={error ? true : undefined}
          className={`w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-line focus:border-electric focus:ring-electric/20'
          }`}
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <p
            className={`text-xs ${error ? 'font-medium text-red-600' : 'text-muted'}`}
            role={error ? 'alert' : undefined}
          >
            {error || `${text.length}/${MAX_LENGTH}`}
          </p>
          <Button type="submit" size="sm" icon={Send} disabled={busy}>
            {busy ? 'Posting…' : 'Comment'}
          </Button>
        </div>
      </form>
    </div>
  );
}