import { Landmark, Layers, FileText, Scale } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import StatCard from '../ui/StatCard';
import Reveal from '../ui/Reveal';
import { FEATURED_REPORTS, OFFICIAL_CHANNEL_COUNT } from '../../data/homeData';
import { CASE_STATUS } from '../../utils/status';

/**
 * These figures describe the PLATFORM itself (how it is built), not corruption
 * levels. No corruption statistics are invented here. Live community and case
 * counts will replace the demonstration values once the backend is connected.
 */
export default function PlatformStats() {
  const stats = [
    {
      icon: Landmark,
      value: OFFICIAL_CHANNEL_COUNT,
      label: 'Official channels listed',
      note: 'Government portals and helplines, linked to their official sites only.',
    },
    {
      icon: Layers,
      value: Object.keys(CASE_STATUS).length,
      label: 'Legal status levels',
      note: 'Allegation, investigation, court finding and conviction are always kept separate.',
    },
    {
      icon: FileText,
      value: FEATURED_REPORTS.length,
      label: 'Demo reports on this page',
      note: 'Synthetic examples. Real community counts will appear after backend integration.',
    },
    {
      icon: Scale,
      value: 0,
      label: 'Guilt verdicts issued by SATYA SETU',
      note: 'Only courts decide guilt. This platform never will.',
    },
  ];

  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Platform at a glance"
            title="Built for responsibility, not rumour"
            description="These are facts about how the platform is designed. They are not corruption statistics."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <StatCard {...stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}