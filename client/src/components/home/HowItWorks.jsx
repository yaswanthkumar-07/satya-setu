import { FileText, ShieldCheck, MessagesSquare, Route } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { HOW_IT_WORKS } from '../../data/homeData';

const ICONS = { FileText, ShieldCheck, MessagesSquare, Route };

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-line bg-white py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From a citizen’s concern to the right official channel"
            description="Four steps, designed so that reporting stays responsible and nobody is publicly accused without proof."
          />
        </Reveal>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <Reveal key={step.id} delay={i * 0.08}>
                <li className="relative h-full rounded-2xl border border-line bg-paper p-6">
                  <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-midnight/5">
                    {i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-cyan text-white shadow-glow">
                    {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-semibold text-midnight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}