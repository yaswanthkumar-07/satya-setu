import { ExternalLink, Info } from 'lucide-react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import StatusBadge from '../ui/StatusBadge';
import { EVENT_KINDS } from '../../utils/intelligence';

function Block({ title, children }) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-electric">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export default function CaseDetailModal({ item, onClose }) {
  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      size="lg"
      title={item?.title ?? ''}
      description={item ? `${item.period} · ${item.location}` : ''}
    >
      {item && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge type="case" status={item.status} />
            <Badge tone={item.sector === 'Private' ? 'violet' : 'blue'}>{item.sector}</Badge>
            <Badge tone="neutral">{item.area}</Badge>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber/40 bg-amber/10 p-4 text-sm text-amber-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>Read the status carefully. </strong>
              {item.statusNote}
            </p>
          </div>

          <Block title="What was alleged or examined">
            <p>{item.summary}</p>
          </Block>

          <Block title="Latest recorded outcome">
            <p>{item.outcome}</p>
          </Block>

          <Block title="Key events">
            <ol className="space-y-3">
              {item.timeline.map((event, i) => {
                const kind = EVENT_KINDS[event.kind] ?? EVENT_KINDS.context;
                return (
                  <li key={`${event.year}-${i}`} className="flex gap-3">
                    <span className="w-12 shrink-0 font-serif text-base font-bold text-midnight">
                      {event.year}
                    </span>
                    <div>
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
                        style={{ color: '#1b2437', backgroundColor: `${kind.color}33` }}
                      >
                        {kind.label}
                      </span>
                      <p className="mt-1">{event.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Block>

          <Block title="Where to verify">
            <p className="text-muted">
              These are the official institutions that hold the primary records. Search by the case
              name on their sites.
            </p>
            <ul className="mt-3 space-y-2">
              {item.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-electric hover:underline"
                  >
                    {s.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Block>

          <p className="rounded-xl bg-paper p-3 text-xs leading-relaxed text-muted">
            This summary is for education and is not legal advice. SATYA SETU is independent and is
            not a government authority. Only courts decide guilt.
          </p>
        </div>
      )}
    </Modal>
  );
}