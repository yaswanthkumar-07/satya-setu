import { Link } from 'react-router-dom';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50';

const VARIANTS = {
  primary: 'bg-electric text-white hover:bg-electric/90 hover:shadow-glow',
  secondary: 'bg-midnight text-white hover:bg-navy',
  outline: 'border border-line bg-white text-midnight hover:border-electric hover:text-electric',
  onDark: 'border border-white/20 bg-white/5 text-white hover:bg-white/10',
  amber: 'bg-amber text-midnight hover:bg-amber/90',
  ghost: 'text-electric hover:bg-electric/10',
};

const SIZES = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

/**
 * Polymorphic button:
 *  - `to`   renders a react-router <Link>
 *  - `href` renders an external <a> (opens in a new tab safely)
 *  - otherwise renders a <button>
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}