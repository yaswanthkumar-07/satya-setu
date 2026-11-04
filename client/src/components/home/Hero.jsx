import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, FileText, ShieldCheck, Route, Users } from 'lucide-react';
import Button from '../ui/Button';
import { SITE } from '../../utils/constants';

const LIFECYCLE = [
  {
    icon: FileText,
    title: 'A citizen shares a concern',
    text: 'Evidence is optional. Private details are discouraged.',
  },
  {
    icon: ShieldCheck,
    title: 'Moderators review it',
    text: 'Nothing is published as proven fact.',
  },
  {
    icon: Route,
    title: 'Guided to official channels',
    text: 'ACB, CVC, Lokpal, CPGRAMS and more.',
  },
];

const TRUST = ['Independent', 'Moderated', 'Official channels linked'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white">
      <div className="grid-backdrop absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-electric/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-14 py-20 lg:grid-cols-12 lg:py-28">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Citizen-powered civic platform
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            The Bridge to{' '}
            <span className="bg-gradient-to-r from-cyan to-electric bg-clip-text text-transparent">
              Truth
            </span>
          </h1>

          <p className="mt-3 font-serif text-xl italic text-cyan/90">{SITE.telugu}</p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {SITE.tagline} SATYA SETU brings citizens, public-record history and official
            reporting channels together, so corruption can be reported responsibly, understood
            clearly and acted on through the right authority.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/community" size="lg" icon={ArrowRight}>
              Explore Community Reports
            </Button>
            <Button to="/intelligence" size="lg" variant="onDark" icon={BarChart3} iconPosition="left">
              Open Intelligence Dashboard
            </Button>
          </div>

          <div className="mt-6">
            <Button to="/#how-it-works" size="sm" variant="ghost" className="!px-0 text-cyan hover:bg-transparent hover:underline">
              See how it works
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            {TRUST.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Lifecycle card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-5"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan">
              How a report travels
            </p>

            <ol className="mt-6 space-y-6">
              {LIFECYCLE.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="relative flex gap-4">
                  {index < LIFECYCLE.length - 1 && (
                    <span
                      className="absolute left-5 top-11 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-cyan/50 to-transparent"
                      aria-hidden="true"
                    />
                  )}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-cyan text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 rounded-lg border border-amber/30 bg-amber/10 px-3 py-2 text-xs leading-relaxed text-amber">
              SATYA SETU is independent and is not a government authority. Only courts decide guilt.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}