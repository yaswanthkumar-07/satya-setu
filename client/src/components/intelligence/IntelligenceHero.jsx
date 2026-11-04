import { motion } from 'framer-motion';
import { Database, ShieldAlert } from 'lucide-react';
import Badge from '../ui/Badge';
import DemoNotice from '../ui/DemoNotice';
import { DATASET_META } from '../../data/intelligenceData';

export default function IntelligenceHero({ total }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-electric/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative py-14 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="eyebrow !text-cyan">Intelligence dashboard</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Historical Intelligence
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            Explore widely reported public-record matters by year, state, sector and legal status.
            An allegation, an investigation, a court finding and a conviction are four different
            things, and this dashboard never blurs them.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge dark tone="cyan" icon={Database}>
              {DATASET_META.name}
            </Badge>
            {total > 0 && (
              <Badge dark tone="neutral">
                {total} {DATASET_META.caseCountLabel} in the register
              </Badge>
            )}
            <Badge dark tone="amber">
              Not independently verified
            </Badge>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          <DemoNotice dark>
            <strong>Not national statistics.</strong> Every count and chart describes only the
            cases in this small register. It says nothing about how common corruption is in any
            state, sector or year.
          </DemoNotice>
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan"
          >
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>Only courts decide guilt.</strong> Legal positions change. Read the original
              judgment and official records before relying on any entry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}