/** Eyebrow + serif title + optional description. align: "left" | "center" */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && <p className={`eyebrow ${dark ? 'text-cyan' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-2 text-3xl font-bold sm:text-4xl ${dark ? 'text-white' : 'text-midnight'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </div>
  );
}