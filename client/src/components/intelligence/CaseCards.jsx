import { useState } from 'react';
import { ArrowRight, Briefcase, Building2, Calendar, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import StatusBadge from '../ui/StatusBadge';
import Reveal from '../ui/Reveal';

const INITIAL = 6;

function CaseCard({ item, onOpen }) {
  const SectorIcon = item.sector === 'Private' ? Briefcase : Building2;

  return (
    <Card dark hover as="article" className="flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge type="case" status={item.status} dark />
        <Badge dark tone="neutral">
          {item.sector}
        </Badge>
      </div>

      <h3 className="mt-4 font-sans text-lg font-semibold leading-snug text-white">{item.title}</h3>
      <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-300">{item.summary}</p>
      <p className="mt-3 text-xs italic leading-relaxed text-slate-400">{item.statusNote}</p>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          {item.period}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {item.state}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <SectorIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {item.area}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-cyan hover:underline"
      >
        View case file
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </Card>
  );
}

export default function CaseCards({ cases, onOpen }) {
  const [visible, setVisible] = useState(INITIAL);
  const shown = cases.slice(0, visible);

  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, i) => (
          <li key={item.id}>
            <Reveal delay={(i % 3) * 0.06} className="h-full">
              <CaseCard item={item} onOpen={onOpen} />
            </Reveal>
          </li>
        ))}
      </ul>

      {cases.length > visible && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400">
            Showing {shown.length} of {cases.length} cases
          </p>
          <Button variant="onDark" onClick={() => setVisible((v) => v + INITIAL)}>
            Show more cases
          </Button>
        </div>
      )}
    </div>
  );
}