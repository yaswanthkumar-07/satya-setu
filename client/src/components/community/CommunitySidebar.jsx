import { Ban, Check, Landmark, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import { REPORT_STATUS } from '../../utils/status';

const DO = [
  'Describe what happened, roughly when and in which town or district.',
  'Name the office or department, not a person.',
  'Share only what you saw or hold documents for.',
  'Use official channels for formal complaints.',
];

const DONT = [
  'Name or accuse private individuals.',
  'Post phone numbers, Aadhaar, PAN, bank or home address details.',
  'Show faces of private people or children in photos.',
  'Call anyone "guilty". Only courts decide guilt.',
];

export default function CommunitySidebar() {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-electric" aria-hidden="true" />
          <h2 className="font-sans text-base font-semibold text-midnight">Posting guidelines</h2>
        </div>

        <ul className="mt-4 space-y-2.5">
          {DO.map((text) => (
            <li key={text} className="flex gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

        <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
          {DONT.map((text) => (
            <li key={text} className="flex gap-2.5 text-sm text-ink">
              <Ban className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5">
        <h2 className="font-sans text-base font-semibold text-midnight">What the labels mean</h2>
        <ul className="mt-4 space-y-4">
          {Object.entries(REPORT_STATUS).map(([key, cfg]) => (
            <li key={key}>
              <StatusBadge status={key} />
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{cfg.description}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-midnight p-5 text-white" dark>
        <div className="flex items-center gap-2">
          <Landmark className="h-4 w-4 text-cyan" aria-hidden="true" />
          <h2 className="font-sans text-base font-semibold">Need official action?</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Only government agencies and courts can investigate and decide. Find the right portal for
          your situation.
        </p>
        <Button to="/resources" variant="onDark" size="sm" className="mt-4">
          Open Citizen Resources
        </Button>
      </Card>
    </div>
  );
}