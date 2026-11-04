import { ArrowRight, Landmark } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { REPORT_ISSUE_PATH } from '../../utils/constants';

export default function CallToAction() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-midnight via-navy to-electric/80 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to be a bridge to truth?
              </h2>
              <p className="mt-4 text-base text-slate-200 sm:text-lg">
                Share a concern responsibly, explore the public record, or go straight to the
                official authority that can act.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button to={REPORT_ISSUE_PATH} size="lg" variant="amber" icon={ArrowRight}>
                  Share a concern
                </Button>
                <Button to="/resources" size="lg" variant="onDark" icon={Landmark} iconPosition="left">
                  Find official channels
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}