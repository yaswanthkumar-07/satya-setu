import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS } from '../utils/constants';

/**
 * Sticky, responsive navigation.
 * variant: "light" (editorial pages) | "dark" (intelligence dashboard)
 */
export default function Navbar({ variant = 'light' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDark = variant === 'dark';

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Add a shadow/blur once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const shell = isDark
    ? `border-b border-white/10 ${scrolled ? 'bg-midnight/90 backdrop-blur-md' : 'bg-midnight'}`
    : `border-b border-line ${scrolled ? 'bg-white/85 backdrop-blur-md shadow-sm' : 'bg-paper/90 backdrop-blur'}`;

  const linkClass = ({ isActive }) => {
    const base =
      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors';
    if (isDark) {
      return `${base} ${isActive ? 'text-cyan' : 'text-slate-300 hover:text-white'}`;
    }
    return `${base} ${isActive ? 'text-electric' : 'text-ink/80 hover:text-midnight'}`;
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors ${shell}`}>
      <nav
        className="container-page flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <Logo variant={isDark ? 'dark' : 'light'} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full ${
                          isDark ? 'bg-cyan' : 'bg-electric'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 rounded-xl bg-electric px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-electric/90 hover:shadow-glow"
          >
            Report an Issue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${
            isDark ? 'text-white hover:bg-white/10' : 'text-midnight hover:bg-midnight/5'
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`overflow-hidden lg:hidden ${
              isDark ? 'bg-midnight' : 'bg-white'
            } border-t ${isDark ? 'border-white/10' : 'border-line'}`}
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-3 text-base font-medium ${
                        isActive
                          ? isDark
                            ? 'bg-white/10 text-cyan'
                            : 'bg-electric/10 text-electric'
                          : isDark
                            ? 'text-slate-200 hover:bg-white/5'
                            : 'text-ink hover:bg-midnight/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/community"
                  className="flex items-center justify-center gap-2 rounded-xl bg-electric px-4 py-3 text-sm font-semibold text-white"
                >
                  Report an Issue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}