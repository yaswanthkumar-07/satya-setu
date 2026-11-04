import { Megaphone, Eye, Scale, Lock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import { MISSION_PILLARS } from '../../data/homeData';

const ICONS = { Megaphone, Eye, Scale, Lock };

export default function MissionSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Our mission"
            title="Corruption thrives where citizens cannot see, report or follow through."
            description="SATYA SETU (సత్య సేతు) means “The Bridge to Truth”. The platform connects everyday citizens with public-record history and the official institutions that exist to act on corruption. It does not replace them."
          />
          <blockquote className="mt-8 border-l-4 border-electric pl-5 font-serif text-lg italic text-midnight">
            “Connecting Citizens. Revealing Truth.”
          </blockquote>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {MISSION_PILLARS.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            return (
              <Reveal key={pillar.id} delay={i * 0.08}>
                <Card hover className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-semibold text-midnight">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}