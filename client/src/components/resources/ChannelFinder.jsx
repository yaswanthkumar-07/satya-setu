import { useState } from 'react';
import { ExternalLink, Phone, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { CHANNELS, SITUATIONS } from '../../data/resourcesData';

const byId = Object.fromEntries(CHANNELS.map((c) => [c.id, c]));

export default function ChannelFinder() {
  const [selectedId, setSelectedId] = useState('');
  const selected = SITUATIONS.find((s) => s.id === selectedId);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Channel finder"
            title="Not sure where to go?"
            description="Pick the situation that is closest to yours. We will point to the body that normally handles it. This is general guidance, not legal advice."
          />
          <fieldset className="mt-6">
            <legend className="sr-only">Choose your situation</legend>
            <div className="space-y-2.5">
              {SITUATIONS.map((s) => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm leading-snug text-ink transition has-[:checked]:border-electric has-[:checked]:bg-electric/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric/30"
                >
                  <input
                    type="radio"
                    name="situation"
                    value={s.id}
                    checked={selectedId === s.id}
                    onChange={() => setSelectedId(s.id)}
                    className="mt-0.5 accent-electric"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </fieldset>
        </Reveal>

        <div className="lg:col-span-7" aria-live="polite">
          {!selected ? (
            <Card className="flex h-full min-h-[16rem] flex-col items-center justify-center p-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 font-sans text-base font-semibold text-midnight">
                Your recommendation will appear here
              </p>
              <p className="mt-1 max-w-sm text-sm text-muted">
                Choose a situation on the left to see which official channel fits.
              </p>
            </Card>
          ) : (
            <Card className="p-6 sm:p-8">
              <p className="eyebrow">Suggested next step</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">{selected.note}</p>

              {selected.channelIds.length > 0 && (
                <ul className="mt-6 space-y-4">
                  {selected.channelIds.map((id) => {
                    const channel = byId[id];
                    if (!channel) return null;
                    return (
                      <li key={id} className="rounded-xl border border-line bg-paper p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-sans text-base font-semibold text-midnight">
                            {channel.name}
                          </h3>
                          <Badge tone={channel.level === 'state' ? 'blue' : 'violet'}>
                            {channel.levelLabel}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {channel.jurisdiction}
                        </p>
                        {channel.helplines.length > 0 && (
                          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-midnight">
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                            {channel.helplines.map((h) => h.number).join(' · ')}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button
                            href={channel.actionUrl ?? channel.website}
                            size="sm"
                            icon={ExternalLink}
                          >
                            {channel.actionLabel ?? 'Visit official site'}
                          </Button>
                          <Button href="#channel-list" size="sm" variant="outline" target="_self" rel="">
                            Read the details
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {selected.anchor && (
                <div className="mt-6">
                  <Link
                    to={`/resources${selected.anchor}`}
                    className="font-semibold text-electric hover:underline"
                  >
                    {selected.anchorLabel} →
                  </Link>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}