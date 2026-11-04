import { Plus, ShieldAlert } from 'lucide-react';
import Button from '../ui/Button';
import DemoNotice from '../ui/DemoNotice';

export default function CommunityHeader({ onCreate }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Community</p>
            <h1 className="mt-2 text-4xl font-bold text-midnight sm:text-5xl">Community Reports</h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Share concerns, add context and follow the conversation. Every report is a
              citizen&rsquo;s claim, labelled by what has and has not been verified.
            </p>
          </div>
          <Button size="lg" icon={Plus} iconPosition="left" onClick={onCreate}>
            Create a report
          </Button>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <DemoNotice>
            <strong>Demonstration data.</strong> All reports and comments here are synthetic examples
            written for this prototype. They describe no real person, office or incident.
          </DemoNotice>
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-electric/25 bg-electric/5 px-4 py-3 text-sm text-ink"
          >
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
            <p className="leading-relaxed">
              SATYA SETU is independent and is <strong>not a government authority</strong>. Posting
              here does not file an official complaint. New reports are moderated before anything is
              published.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}