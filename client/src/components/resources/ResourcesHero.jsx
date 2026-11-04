import { ExternalLink, ShieldAlert } from 'lucide-react';
import DemoNotice from '../ui/DemoNotice';
import { LAST_REVIEWED } from '../../data/resourcesData';

export default function ResourcesHero() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="eyebrow">Citizen resources</p>
          <h1 className="mt-2 text-4xl font-bold text-midnight sm:text-5xl">
            Official reporting channels
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            SATYA SETU does not investigate or file complaints. When you want action, these are the
            government bodies that can act. Each one is explained below with what it covers, what it
            does not, and how to reach it.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-muted">
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Only official government websites are linked. Reviewed {LAST_REVIEWED}.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <DemoNotice>
            <strong>Confirm before you rely on it.</strong> Portals and helpline numbers change. Check
            the official website for the current details.
          </DemoNotice>
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-electric/25 bg-electric/5 px-4 py-3 text-sm text-ink"
          >
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
            <p className="leading-relaxed">
              Beware of fake callers. Agencies do not ask for money by phone to stop a raid or an
              arrest. If you get such a call, report it to the police or the agency&rsquo;s official
              number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}