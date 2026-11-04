/**
 * Base surface. `dark` switches to the navy dashboard style.
 * `hover` adds a subtle lift for clickable or featured cards.
 */
export default function Card({
  as: Tag = 'div',
  dark = false,
  hover = false,
  className = '',
  children,
  ...rest
}) {
  const surface = dark
    ? 'border border-white/10 bg-navy text-slate-200'
    : 'border border-line bg-white shadow-card';

  const lift = hover
    ? 'transition duration-300 hover:-translate-y-1 ' +
      (dark ? 'hover:border-cyan/40' : 'hover:border-electric/40')
    : '';

  return (
    <Tag className={`rounded-2xl ${surface} ${lift} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}