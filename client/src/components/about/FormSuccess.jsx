import { Check } from 'lucide-react';
import Button from '../ui/Button';

/** Shared confirmation panel for the contact and feedback forms. */
export default function FormSuccess({ title, children, onReset, resetLabel = 'Send another' }) {
  return (
    <div className="py-6 text-center" role="status">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-2xl font-bold text-midnight">{title}</h3>
      <div className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">{children}</div>
      <Button variant="outline" size="sm" onClick={onReset} className="mt-6">
        {resetLabel}
      </Button>
    </div>
  );
}