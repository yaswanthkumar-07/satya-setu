import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Briefcase, Building2, Check, Landmark, Send } from 'lucide-react';
import { Field, Select, TextArea, TextInput } from '../ui/FormControls';
import Button from '../ui/Button';
import MediaPicker from './MediaPicker';
import { CATEGORIES, STATES, STATE_DISTRICTS } from '../../data/communityData';
import { detectPersonalInfo, personalInfoMessage } from '../../utils/safety';

const INITIAL = {
  title: '',
  description: '',
  category: '',
  sector: '',
  state: '',
  district: '',
  locality: '',
  organisation: '',
  incidentDate: '',
  ack1: false,
  ack2: false,
  ack3: false,
};

function validate(v) {
  const e = {};
  const title = v.title.trim();
  const description = v.description.trim();

  if (title.length < 10) e.title = 'Give your report a clear title (at least 10 characters).';
  else if (title.length > 140) e.title = 'Keep the title under 140 characters.';

  if (description.length < 40) e.description = 'Please describe what happened (at least 40 characters).';
  else if (description.length > 1500) e.description = 'Keep the description under 1500 characters.';

  if (!v.category) e.category = 'Choose a category.';
  if (!v.sector) e.sector = 'Select government or private sector.';
  if (!v.state) e.state = 'Choose a state.';
  if (!v.district) e.district = 'Choose a district.';

  ['title', 'description', 'locality', 'organisation'].forEach((key) => {
    if (!e[key]) {
      const found = detectPersonalInfo(v[key]);
      if (found.length) e[key] = personalInfoMessage(found);
    }
  });

  if (!(v.ack1 && v.ack2 && v.ack3)) e.ack = 'Please confirm all three statements before submitting.';
  return e;
}

function SuccessView({ report, onClose }) {
  return (
    <div className="py-4 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-2xl font-bold text-midnight">Submitted for moderation</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        &ldquo;{report.title}&rdquo; is now in your pending list. It is <strong>not public</strong>.
        Moderators will check it for safety and policy compliance before anything is published.
      </p>

      <div className="mx-auto mt-6 max-w-md rounded-xl border border-amber/40 bg-amber/10 p-4 text-left text-sm text-amber-800">
        <p className="font-semibold">This is not an official complaint.</p>
        <p className="mt-1">
          To start formal action, contact the right government body directly.
        </p>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/resources" variant="outline" icon={Landmark} iconPosition="left">
          Find official channels
        </Button>
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}

export default function CreateReportForm({ onSubmit, onClose }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [media, setMedia] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const summaryRef = useRef(null);
  const mediaRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    mediaRef.current = media;
  }, [media]);

  // Release preview URLs and timers when the dialog closes
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      mediaRef.current.forEach((m) => URL.revokeObjectURL(m.url));
    },
    [],
  );

  const setField = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { district: '' } : {}),
    }));
    setErrors((prev) => {
      const key = name.startsWith('ack') ? 'ack' : name;
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (submitting) return;

  const found = validate(values);
  setErrors(found);

  if (Object.keys(found).length > 0) {
    summaryRef.current?.focus();
    return;
  }

  setSubmitting(true);

  try {
    const item = await onSubmit({
      title: values.title.trim(),
      summary: values.description.trim(),
      category: values.category,
      sector: values.sector,
      state: values.state,
      district: values.district,
      locality: values.locality.trim(),
      organisation: values.organisation.trim(),
      incidentDate: values.incidentDate || null,
      media: {
        images: media.filter((m) => m.kind === 'image').length,
        videos: media.filter((m) => m.kind === 'video').length,
      },
    });

    setSubmitted(item);
  } catch (error) {
    setErrors((prev) => ({
      ...prev,
      submit: error.message || 'Unable to submit report. Please try again.',
    }));
  } finally {
    setSubmitting(false);
  }
};

  if (submitted) return <SuccessView report={submitted} onClose={onClose} />;

  const errorCount = Object.keys(errors).length;
  const districts = values.state ? (STATE_DISTRICTS[values.state] ?? []) : [];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        className={
          errorCount
            ? 'flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 outline-none'
            : 'sr-only'
        }
      >
        {errorCount > 0 && (
          <>
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              Please fix {errorCount} item{errorCount === 1 ? '' : 's'} highlighted below.
            </p>
          </>
        )}
      </div>

      <div className="rounded-xl border border-electric/25 bg-electric/5 p-4 text-sm leading-relaxed text-ink">
        This form shares a concern with the community. It does <strong>not</strong> file an official
        complaint. For formal action, use the{' '}
        <Link to="/resources" className="font-semibold text-electric hover:underline">
          official channels
        </Link>
        . Report the <em>office or department</em>, never a named private individual.
      </div>

      {/* What happened */}
      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-electric">What happened</legend>

        <Field id="rpt-title" label="Title" required error={errors.title} hint="One clear sentence. Use words like 'alleged' or 'reportedly' for unproven claims.">
          <TextInput
            id="rpt-title"
            value={values.title}
            maxLength={140}
            invalid={!!errors.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="e.g. Alleged unofficial payment sought at a service counter"
          />
        </Field>

        <Field id="rpt-description" label="Description" required error={errors.description} hint={`${values.description.length}/1500. Facts only: what, when, where and what you have as proof.`}>
          <TextArea
            id="rpt-description"
            rows={5}
            maxLength={1500}
            value={values.description}
            invalid={!!errors.description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="Describe what you personally saw or experienced. Do not include names, phone numbers or ID details."
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="rpt-category" label="Category" required error={errors.category}>
            <Select
              id="rpt-category"
              value={values.category}
              invalid={!!errors.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>

          <Field id="rpt-date" label="Date of incident" hint="Optional">
            <TextInput
              id="rpt-date"
              type="date"
              max={today}
              value={values.incidentDate}
              onChange={(e) => setField('incidentDate', e.target.value)}
            />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold text-ink">
            Sector <span className="text-red-500" aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { value: 'Government', icon: Building2, hint: 'Public offices, agencies, public servants' },
              { value: 'Private', icon: Briefcase, hint: 'Companies, institutions, private services' },
            ].map(({ value, icon: Icon, hint }) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white p-3.5 transition has-[:checked]:border-electric has-[:checked]:bg-electric/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/30"
              >
                <input
                  type="radio"
                  name="sector"
                  value={value}
                  checked={values.sector === value}
                  onChange={() => setField('sector', value)}
                  className="mt-1 accent-electric"
                />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-midnight">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {value} sector
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{hint}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.sector && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.sector}</p>}
        </fieldset>
      </fieldset>

      {/* Where */}
      <fieldset className="space-y-4">
        <legend className="text-xs font-bold uppercase tracking-widest text-electric">Where</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="rpt-state" label="State" required error={errors.state}>
            <Select
              id="rpt-state"
              value={values.state}
              invalid={!!errors.state}
              onChange={(e) => setField('state', e.target.value)}
            >
              <option value="">Select a state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>

          <Field id="rpt-district" label="District" required error={errors.district}>
            <Select
              id="rpt-district"
              value={values.district}
              disabled={!values.state}
              invalid={!!errors.district}
              onChange={(e) => setField('district', e.target.value)}
            >
              <option value="">{values.state ? 'Select a district' : 'Choose a state first'}</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="rpt-locality" label="Town, area or landmark" error={errors.locality} hint="Optional. No house addresses.">
            <TextInput
              id="rpt-locality"
              value={values.locality}
              maxLength={80}
              invalid={!!errors.locality}
              onChange={(e) => setField('locality', e.target.value)}
              placeholder="e.g. Main bazaar area"
            />
          </Field>

          <Field id="rpt-org" label="Office, department or company" error={errors.organisation} hint="Optional. Name the office, not a person.">
            <TextInput
              id="rpt-org"
              value={values.organisation}
              maxLength={100}
              invalid={!!errors.organisation}
              onChange={(e) => setField('organisation', e.target.value)}
              placeholder="e.g. Municipal licensing counter"
            />
          </Field>
        </div>
      </fieldset>

      {/* Evidence */}
      <fieldset className="space-y-3">
        <legend className="text-xs font-bold uppercase tracking-widest text-electric">Evidence (optional)</legend>
        <MediaPicker items={media} onChange={setMedia} />
      </fieldset>

      {/* Acknowledgements */}
      <fieldset className="space-y-3 rounded-xl border border-line bg-paper p-4">
        <legend className="px-1 text-xs font-bold uppercase tracking-widest text-electric">Before you submit</legend>
        {[
          ['ack1', 'I have not included private personal information (phone numbers, ID numbers, bank details or home addresses) or named a private individual.'],
          ['ack2', 'I understand this is a claim, not a proven fact, and that moderators may edit, hold or reject it.'],
          ['ack3', 'I understand SATYA SETU is independent, is not a government authority, and that this does not file an official complaint.'],
        ].map(([name, label]) => (
          <label key={name} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
            <input
              type="checkbox"
              checked={values[name]}
              onChange={(e) => setField(name, e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-electric"
            />
            <span>{label}</span>
          </label>
        ))}
        {errors.ack && <p className="text-xs font-medium text-red-600">{errors.ack}</p>}
      </fieldset>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" icon={Send} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit for moderation'}
        </Button>
      </div>
    </form>
  );
}