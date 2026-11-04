import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { DISCLAIMER_POINTS } from '../../data/aboutData';

export default function DisclaimerSection() {
  return (
    <section id="disclaimer" className="scroll-mt-20 border-t border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </span>
            <SectionHeading
              eyebrow="Please read"
              title="Disclaimer"
              description="What SATYA SETU is, what it is not, and how to use it responsibly."
            />
          </div>
        </Reveal>

        <dl className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
          {DISCLAIMER_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={(i % 2) * 0.05}>
              <div className="border-l-4 border-electric pl-5">
                <dt className="font-sans text-base font-semibold text-midnight">{point.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{point.text}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <p className="mt-10 text-sm text-muted">
          Need to take formal action? Go to the{' '}
          <Link to="/resources" className="font-semibold text-electric hover:underline">
            Citizen Resources
          </Link>{' '}
          page.
        </p>
      </div>
    </section>
  );
}