import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import ChannelCard from './ChannelCard';
import { CHANNELS } from '../../data/resourcesData';
import { EmptyState } from '../ui/States';

const TABS = [
  { value: 'all', label: 'All channels' },
  { value: 'state', label: 'Andhra Pradesh' },
  { value: 'central', label: 'Central and national' },
];

export default function ChannelGrid() {
  const [tab, setTab] = useState('all');
  const channels = tab === 'all' ? CHANNELS : CHANNELS.filter((c) => c.level === tab);

  return (
    <section id="channel-list" className="scroll-mt-20 border-y border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Know the difference"
            title="Who handles what"
            description="Each body has its own jurisdiction. Reporting to the right one saves time and avoids your complaint being returned."
          />
        </Reveal>

        <div
          className="mt-8 inline-flex flex-wrap gap-1 rounded-xl border border-line bg-paper p-1"
          role="group"
          aria-label="Filter channels by level"
        >
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={tab === t.value}
              onClick={() => setTab(t.value)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                tab === t.value ? 'bg-midnight text-white' : 'text-ink hover:text-electric'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {channels.length === 0 ? (
            <EmptyState title="No channels in this group" />
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {channels.map((channel, i) => (
                <Reveal key={channel.id} delay={(i % 2) * 0.06} className="h-full">
                  <ChannelCard channel={channel} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}