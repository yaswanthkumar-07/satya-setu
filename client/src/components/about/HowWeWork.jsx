import { BarChart3, FileText, Route } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { HOW_WE_WORK } from '../../data/aboutData';

const ICONS = { FileText, BarChart3, Route };

export default function HowWeWork() {
  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How the platform works"
            title="Three parts, one purpose"
            description="Everything on SATYA SETU is designed so that concerns are shared responsibly and nobody is publicly accused without proof."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {HOW_WE_WORK.map((item, i) => {
            const Icon = ICONS[item.icon] ?? FileText;
            return (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-paper p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-midnight text-cyan">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-semibold text-midnight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}