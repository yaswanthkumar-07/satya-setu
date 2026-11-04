import { ArrowRight, Calendar, MapPin, Building2, Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import DemoNotice from '../ui/DemoNotice';
import Reveal from '../ui/Reveal';
import { EmptyState } from '../ui/States';
import { HISTORICAL_PREVIEW } from '../../data/homeData';
import { CASE_STATUS } from '../../utils/status';

export default function HistoricalPreview({ cases = HISTORICAL_PREVIEW }) {
  return (
    <section className="relative overflow-hidden bg-midnight py-20 text-white sm:py-24">
      <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-page relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Historical intelligence"
              title="Public-record history, labelled by legal status"
              description="Every case on the dashboard is tagged so that an allegation is never confused with an investigation, a court finding or a conviction."
            />
          </Reveal>
          <Button to="/intelligence" variant="onDark" icon={ArrowRight}>
            Open the dashboard
          </Button>
        </div>

        {/* Status legend */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(CASE_STATUS).map(([key, cfg], i) => (
            <Reveal key={key} delay={i * 0.06}>
              <Card dark className="h-full p-4">
                <StatusBadge type="case" status={key} dark />
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{cfg.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <DemoNotice dark className="mt-10">
          <strong>Curated, not verified.</strong> These entries come from the dashboard&rsquo;s small
          curated register. Legal positions change, so always check the judgment and official records
          for the current position.
        </DemoNotice>

        <div className="mt-8">
          {cases.length === 0 ? (
            <EmptyState dark title="No cases to preview" description="Case data is not available right now." />
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {cases.map((c, i) => {
                const SectorIcon = c.sector === 'Private' ? Briefcase : Building2;
                return (
                  <Reveal key={c.id} delay={i * 0.08} className="h-full">
                    <Card dark hover className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <StatusBadge type="case" status={c.status} dark />
                        <Badge dark tone="neutral">
                          {c.sector}
                        </Badge>
                      </div>

                      <h3 className="mt-4 font-sans text-lg font-semibold text-white">{c.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{c.summary}</p>
                      {c.statusNote && (
                        <p className="mt-3 text-xs italic leading-relaxed text-slate-400">{c.statusNote}</p>
                      )}

                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <SectorIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.sector}
                        </span>
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}