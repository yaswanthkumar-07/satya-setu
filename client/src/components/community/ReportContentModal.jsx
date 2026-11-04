import { useState } from 'react';
import { Check } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { FLAG_REASONS } from '../../data/communityData';
import { getErrorMessage } from '../../services/api';

function FlagForm({ report, onSubmit, onClose }) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    if (!reason) {
      setError('Please choose a reason.');
      return;
    }

    setBusy(true);
    try {
      await onSubmit(report.id, reason, details.trim());
      setDone(true);
    } catch (err) {
      setError(getErrorMessage(err, 'Your report could not be sent. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="py-4 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-serif text-xl font-bold text-midnight">Thank you</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Your report has been sent to the moderators. Reports that break the guidelines are held or
          removed.
        </p>
        <Button onClick={onClose} className="mt-6">
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="rounded-xl bg-paper p-3 text-sm text-ink">
        <span className="font-semibold">Reporting: </span>
        {report?.title}
      </p>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">Why are you reporting this?</legend>
        <div className="mt-3 space-y-2">
          {FLAG_REASONS.map((r) => (
            <label
              key={r.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-3.5 py-3 text-sm text-ink transition has-[:checked]:border-electric has-[:checked]:bg-electric/5"
            >
              <input
                type="radio"
                name="flag-reason"
                value={r.value}
                checked={reason === r.value}
                onChange={() => {
                  setReason(r.value);
                  setError('');
                }}
                className="accent-electric"
              />
              {r.label}
            </label>
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </fieldset>

      <div className="mt-5">
        <label htmlFor="flag-details" className="mb-1.5 block text-sm font-semibold text-ink">
          Extra details <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id="flag-details"
          rows={3}
          maxLength={300}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full resize-y rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20"
        />
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose} disabled={busy}>
          Cancel
        </Button>
        <Button type="submit" disabled={busy}>
          {busy ? 'Sending…' : 'Send to moderators'}
        </Button>
      </div>
    </form>
  );
}

export default function ReportContentModal({ report, onClose, onSubmit }) {
  return (
    <Modal
      open={Boolean(report)}
      onClose={onClose}
      size="sm"
      title="Report this post"
      description="Help keep the community safe and accurate."
    >
      <FlagForm key={report?.id} report={report} onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
}