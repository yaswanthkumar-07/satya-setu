import Reveal from '../ui/Reveal';

/** Titled section wrapper used for each block of the dashboard. */
export default function DashSection({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        {eyebrow && <p className="eyebrow !text-cyan">{eyebrow}</p>}
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {description}
          </p>
        )}
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}