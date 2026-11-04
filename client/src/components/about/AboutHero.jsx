import { motion } from 'framer-motion';
import { SITE } from '../../utils/constants';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white">
      <div className="grid-backdrop absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-electric/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="eyebrow !text-cyan">About and contact</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl">About SATYA SETU</h1>
          <p className="mt-3 font-serif text-xl italic text-cyan/90">{SITE.telugu}</p>
          <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
            {SITE.meaning}. SATYA SETU is a citizen-powered, independent platform that helps people
            understand corruption, report concerns responsibly and find the official institutions
            that can act.
          </p>
        </motion.div>
      </div>
    </section>
  );
}