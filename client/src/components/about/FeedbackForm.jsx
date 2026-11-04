import { useEffect, useRef, useState } from 'react';
import { Send, Star } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Field, Select, TextArea } from '../ui/FormControls';
import FormSuccess from './FormSuccess';
import { FEEDBACK_TOPICS } from '../../data/aboutData';
import { detectPersonalInfo, personalInfoMessage } from '../../utils/safety';

const INITIAL = { rating: 0, topic: '', message: '' };
const RATING_LABELS = ['Very poor', 'Poor', 'Okay', 'Good', 'Excellent'];

function validate(v) {
  const e = {};
  if (!v.rating) e.rating = 'Please give a rating.';
  if (!v.topic) e.topic = 'Choose what your feedback is about.';

  const message = v.message.trim();
  if (message.length < 10) e.message = 'Please write at least 10 characters.';
  else if (message.length > 800) e.message = 'Keep the feedback under 800 characters.';
  else {
    const found = detectPersonalInfo(message);
    if (found.length) e.message = personalInfoMessage(found);
  }
  return e;
}

/**
 * Anonymous feedback. `onSubmit` is optional and is wired to the API in Batch 6.
 * Until then the form simulates a send and says so.
 */
export default function FeedbackForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | failed
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      if (onSubmit) {
        await onSubmit({ ...values, message: values.message.trim() });
        setStatus('done');
      } else {
        timerRef.current = setTimeout(() => setStatus('done'), 700);
      }
    } catch {
      setStatus('failed');
    }
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setStatus('idle');
  };

  return (
    <Card className="p-6 sm:p-7">
      <h3 className="font-serif text-2xl font-bold text-midnight">Share feedback</h3>
      <p className="mt-1 text-sm text-muted">
        Help us improve. Feedback is anonymous. Please do not include personal details.
      </p>

      {status === 'done' ? (
        <FormSuccess title="Thank you" onReset={reset} resetLabel="Give more feedback">
          {onSubmit ? (
            <p>Your feedback has been received.</p>
          ) : (
            <p>
              This prototype has no server yet, so your feedback was <strong>not</strong> transmitted
              or stored.
            </p>
          )}
        </FormSuccess>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <fieldset>
            <legend className="mb-1.5 text-sm font-semibold text-ink">
              How would you rate your experience?{' '}
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="flex items-center gap-1">
              {RATING_LABELS.map((label, i) => {
                const value = i + 1;
                const active = values.rating >= value;
                return (
                  <label key={label} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      checked={values.rating === value}
                      onChange={() => setField('rating', value)}
                      className="peer sr-only"
                    />
                    <span className="sr-only">{`${value} of 5: ${label}`}</span>
                    <Star
                      aria-hidden="true"
                      className={`h-8 w-8 rounded transition peer-focus-visible:ring-2 peer-focus-visible:ring-electric/40 ${
                        active ? 'fill-amber text-amber' : 'text-slate-300 hover:text-amber'
                      }`}
                    />
                  </label>
                );
              })}
              {values.rating > 0 && (
                <span className="ml-2 text-sm text-muted">{RATING_LABELS[values.rating - 1]}</span>
              )}
            </div>
            {errors.rating && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.rating}</p>}
          </fieldset>

          <Field id="fb-topic" label="Feedback is about" required error={errors.topic}>
            <Select
              id="fb-topic"
              value={values.topic}
              invalid={!!errors.topic}
              onChange={(e) => setField('topic', e.target.value)}
            >
              <option value="">Select a topic</option>
              {FEEDBACK_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            id="fb-message"
            label="Your feedback"
            required
            error={errors.message}
            hint={`${values.message.length}/800`}
          >
            <TextArea
              id="fb-message"
              rows={4}
              maxLength={800}
              value={values.message}
              invalid={!!errors.message}
              onChange={(e) => setField('message', e.target.value)}
            />
          </Field>

          {status === 'failed' && (
            <p role="alert" className="text-sm font-medium text-red-600">
              We could not send your feedback. Please try again.
            </p>
          )}

          <Button type="submit" icon={Send} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit feedback'}
          </Button>
        </form>
      )}
    </Card>
  );
}