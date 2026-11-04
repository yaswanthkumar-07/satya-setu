import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Field, Select, TextArea, TextInput } from '../ui/FormControls';
import FormSuccess from './FormSuccess';
import { CONTACT_EMAIL, CONTACT_TOPICS } from '../../data/aboutData';
import { detectPersonalInfo, personalInfoMessage } from '../../utils/safety';

const INITIAL = { name: '', email: '', topic: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address so we can reply.';
  if (!v.topic) e.topic = 'Choose a topic.';

  const message = v.message.trim();
  if (message.length < 20) e.message = 'Please write at least 20 characters.';
  else if (message.length > 1000) e.message = 'Keep the message under 1000 characters.';
  else {
    const found = detectPersonalInfo(message);
    if (found.length) {
      e.message = `${personalInfoMessage(found)} Use the email field above to be reached.`;
    }
  }
  return e;
}

/**
 * `onSubmit` is optional. In Batch 6 the page passes a function that calls the
 * API service. Until then the form simulates a send and tells the user honestly
 * that nothing was transmitted.
 */
export default function ContactForm({ onSubmit }) {
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
        await onSubmit({ ...values, name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
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
      <h3 className="font-serif text-2xl font-bold text-midnight">Contact us</h3>
      <p className="mt-1 text-sm text-muted">
        For questions, corrections or collaboration. Do not use this form to report corruption. Use
        the official channels for that.
      </p>

      {status === 'done' ? (
        <FormSuccess title={onSubmit ? 'Message sent' : 'Thanks for writing'} onReset={reset}>
          {onSubmit ? (
            <p>We will reply to the email address you gave.</p>
          ) : (
            <p>
              This prototype has no server yet, so your message was <strong>not</strong> transmitted
              or stored.
              {CONTACT_EMAIL && (
                <>
                  {' '}
                  Please write to{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-electric hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>{' '}
                  instead.
                </>
              )}
            </p>
          )}
        </FormSuccess>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="ct-name" label="Your name" required error={errors.name}>
              <TextInput
                id="ct-name"
                autoComplete="name"
                value={values.name}
                invalid={!!errors.name}
                onChange={(e) => setField('name', e.target.value)}
              />
            </Field>
            <Field id="ct-email" label="Email" required error={errors.email}>
              <TextInput
                id="ct-email"
                type="email"
                autoComplete="email"
                value={values.email}
                invalid={!!errors.email}
                onChange={(e) => setField('email', e.target.value)}
              />
            </Field>
          </div>

          <Field id="ct-topic" label="Topic" required error={errors.topic}>
            <Select
              id="ct-topic"
              value={values.topic}
              invalid={!!errors.topic}
              onChange={(e) => setField('topic', e.target.value)}
            >
              <option value="">Select a topic</option>
              {CONTACT_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            id="ct-message"
            label="Message"
            required
            error={errors.message}
            hint={`${values.message.length}/1000`}
          >
            <TextArea
              id="ct-message"
              rows={5}
              maxLength={1000}
              value={values.message}
              invalid={!!errors.message}
              onChange={(e) => setField('message', e.target.value)}
            />
          </Field>

          {status === 'failed' && (
            <p role="alert" className="text-sm font-medium text-red-600">
              We could not send your message. Please try again.
            </p>
          )}

          <Button type="submit" icon={Send} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      )}
    </Card>
  );
}