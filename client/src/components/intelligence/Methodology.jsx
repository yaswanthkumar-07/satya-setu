import { Link } from 'react-router-dom';
import { BarChart3, BookOpenCheck, Scale } from 'lucide-react';
import Card from '../ui/Card';

const ITEMS = [
  {
    icon: BookOpenCheck,
    title: 'How cases are chosen',
    text: 'Only matters that are widely reported and backed by official records such as court orders, audit reports or agency action. Unproven claims from individuals are never listed here.',
  },
  {
    icon: Scale,
    title: 'How status is assigned',
    text: 'Status is the latest recorded stage of the principal proceeding. Many matters involve several separate trials and appeals, so every case carries a note explaining the nuance. Status can be out of date.',
  },
  {
    icon: BarChart3,
    title: 'What the charts show',
    text: 'Counts of cases in this small register. They are not national statistics, and they cannot be used to compare states, sectors or years.',
  },
];

export default function Methodology() {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <Card key={title} dark className="p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-sans text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Spotted an error or an out-of-date status? Tell us on the{' '}
        <Link to="/about#contact" className="font-semibold text-cyan hover:underline">
          Contact &amp; Feedback
        </Link>{' '}
        page. For formal complaints, use the{' '}
        <Link to="/resources" className="font-semibold text-cyan hover:underline">
          official channels
        </Link>
        .
      </p>
    </div>
  );
}