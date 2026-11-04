import { FileSearch, ListChecks, Receipt, ShieldAlert, ShieldCheck, ClipboardList } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import {
  EVIDENCE_CHECKLIST,
  REPORTING_STEPS,
  RIGHTS,
} from '../../data/resourcesData';

const ICONS = { FileSearch, Receipt, ListChecks, ShieldCheck };

export default function RightsGuidance() {
  return (
    <section id="rights" className="scroll-mt-20 border-t border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Citizen rights and guidance"
            title="Know your rights. Report safely."
            description="General guidance for ordinary citizens. It is not legal advice, and details vary by department and state."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {RIGHTS.map((r, i) => {
            const Icon = ICONS[r.icon] ?? ShieldCheck;
            return (
              <Reveal key={r.title} delay={(i % 2) * 0.06} className="h-full">
                <Card className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-sans text-lg font-semibold text-midnight">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="font-serif text-2xl font-bold text-midnight">How to report, step by step</h3>
            <ol className="mt-6 space-y-5">
              {REPORTING_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-midnight font-serif text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-sans text-base font-semibold text-midnight">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="space-y-5 lg:col-span-5">
            <Reveal>
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-electric" aria-hidden="true" />
                  <h3 className="font-sans text-base font-semibold text-midnight">Evidence checklist</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {EVIDENCE_CHECKLIST.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-snug text-ink">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Do not share Aadhaar, PAN or bank details with anyone who is not an official body
                  that requires them.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <div
                role="note"
                className="flex items-start gap-3 rounded-2xl border border-amber/40 bg-amber/10 p-5 text-sm text-amber-800"
              >
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p className="leading-relaxed">
                  <strong>Watch out for impersonators.</strong> Real agencies do not demand money by
                  phone to stop a raid, arrest or case. If you receive such a call, do not pay.
                  Report it to the police or call the agency&rsquo;s official number, and for online
                  fraud call 1930.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}