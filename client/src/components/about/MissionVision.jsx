import { Eye, Landmark, Lock, ShieldCheck, Target } from 'lucide-react';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { MISSION, VALUES, VISION } from '../../data/aboutData';

const ICONS = { ShieldCheck, Eye, Lock, Landmark };

export default function MissionVision() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-midnight">Our mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{MISSION}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-midnight">Our vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{VISION}</p>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = ICONS[v.icon] ?? ShieldCheck;
            return (
              <Reveal key={v.title} delay={i * 0.06} className="h-full">
                <Card hover className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-cyan text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sans text-base font-semibold text-midnight">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}