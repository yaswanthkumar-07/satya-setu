import { useMemo, useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { EVENT_KINDS, collectTimeline } from '../../utils/intelligence';

const INITIAL = 10;

export default function Timeline({ cases, onOpen }) {
  const [showAll, setShowAll] = useState(false);
  const events = useMemo(() => collectTimeline(cases), [cases]);
  const visible = showAll ? events : events.slice(0, INITIAL);

  return (
    <Card dark className="p-5 sm:p-8">
      <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Timeline colour key">
        {Object.entries(EVENT_KINDS).map(([key, kind]) => (
          <li key={key} className="inline-flex items-center gap-2 text-xs text-slate-300">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: kind.color }}
              aria-hidden="true"
            />
            {kind.label}
          </li>
        ))}
      </ul>

      <ol className="relative ml-2 mt-8 border-l border-white/15">
        {visible.map((event) => {
          const kind = EVENT_KINDS[event.kind] ?? EVENT_KINDS.context;
          return (
            <li key={event.key} className="relative pb-8 pl-7 last:pb-0">
              <span
                className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-navy"
                style={{ backgroundColor: kind.color }}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-serif text-xl font-bold text-white">{event.year}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
                  style={{ color: kind.color, backgroundColor: `${kind.color}22` }}
                >
                  {kind.label}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{event.text}</p>
              <button
                type="button"
                onClick={() => onOpen(event.caseId)}
                className="mt-1 text-xs font-semibold text-cyan hover:underline"
              >
                {event.caseTitle}
              </button>
            </li>
          );
        })}
      </ol>

      {events.length > INITIAL && (
        <div className="mt-8 flex justify-center">
          <Button variant="onDark" onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show fewer events' : `Show all ${events.length} events`}
          </Button>
        </div>
      )}
    </Card>
  );
}