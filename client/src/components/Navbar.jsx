import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  FileText,
  LogIn,
  LogOut,
  Menu,
  Settings,
  User,
  UserPlus,
  X,
} from 'lucide-react';

import Logo from './Logo';
import UserAvatar, { getDisplayName } from './UserAvatar';
import { useAuth } from '../contexts/AuthContext';
import { NAV_LINKS, REPORT_ISSUE_PATH } from '../utils/constants';

const ACCOUNT_LINKS = [
  { label: 'My Profile', to: '/profile', icon: User },
  { label: 'My Reports', to: '/profile#reports', icon: FileText },
  { label: 'Account Settings', to: '/profile#settings', icon: Settings },
];

/**
 * Sticky, responsive navigation with Satya Setu authentication state.
 * variant: "light" (editorial pages) | "dark" (intelligence dashboard)
 *
 * - Signed out: Login and Register actions.
 * - Signed in: avatar + name with an account dropdown (desktop) or an account
 *   section inside the mobile menu.
 * - "Report an Issue" goes to /community?new=1 and is unchanged.
 */
export default function Navbar({ variant = 'light' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const accountRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isDark = variant === 'dark';

  // Authentication state comes from the Satya Setu AuthContext.
  const auth = useAuth();
  const user = auth?.user ?? null;
  const authLoading = Boolean(auth?.loading);
  const displayName = getDisplayName(user);

  // Close menus whenever the route, query or hash changes.
  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // Close the dropdown if the user signs out from anywhere.
  useEffect(() => {
    if (!user) {
      setAccountOpen(false);
      setLogoutError('');
    }
  }, [user]);

  // Add a shadow/blur once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Dropdown: close on outside click and on Escape.
  useEffect(() => {
    if (!accountOpen) return undefined;

    const onPointer = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer, { passive: true });
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [accountOpen]);

  // Log out using the Satya Setu authentication context.
  const handleLogout = () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError('');

    try {
      auth.logout();
      setAccountOpen(false);
      setOpen(false);
      navigate('/login', { replace: true });
    } catch {
      setLogoutError('Could not log out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  const shell = isDark
    ? `border-b border-white/10 ${
        scrolled ? 'bg-midnight/90 backdrop-blur-md' : 'bg-midnight'
      }`
    : `border-b border-line ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm'
          : 'bg-paper/90 backdrop-blur'
      }`;

  const linkClass = ({ isActive }) => {
    const base =
      'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors';

    if (isDark) {
      return `${base} ${
        isActive ? 'text-cyan' : 'text-slate-300 hover:text-white'
      }`;
    }

    return `${base} ${
      isActive ? 'text-electric' : 'text-ink/80 hover:text-midnight'
    }`;
  };

  const loginClass = `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isDark
      ? 'text-slate-200 hover:text-white'
      : 'text-ink/80 hover:text-midnight'
  }`;

  const registerClass = `inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold transition ${
    isDark
      ? 'border-white/20 text-white hover:bg-white/10'
      : 'border-line bg-white text-midnight hover:border-electric hover:text-electric'
  }`;

  const mobileRow = `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium ${
    isDark
      ? 'text-slate-200 hover:bg-white/5'
      : 'text-ink hover:bg-midnight/5'
  }`;

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
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={linkClass}
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full ${
                          isDark ? 'bg-cyan' : 'bg-electric'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop: account area + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          {authLoading ? (
            <span
              className={`h-9 w-28 animate-pulse rounded-xl ${
                isDark ? 'bg-white/10' : 'bg-slate-200/70'
              }`}
              aria-hidden="true"
            />
          ) : user ? (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                aria-label={`Account menu for ${displayName}`}
                className={`flex items-center gap-2 rounded-xl p-1 pr-2 transition ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-midnight/5'
                }`}
              >
                <UserAvatar user={user} />

                <span
                  className={`hidden max-w-[8rem] truncate text-sm font-semibold xl:inline ${
                    isDark ? 'text-white' : 'text-midnight'
                  }`}
                >
                  {displayName}
                </span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    accountOpen ? 'rotate-180' : ''
                  } ${
                    isDark ? 'text-slate-300' : 'text-slate-500'
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    role="menu"
                    aria-label="Account"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-line bg-white shadow-card"
                  >
                    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                      <UserAvatar
                        user={user}
                        className="h-10 w-10"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-midnight">
                          {displayName}
                        </p>

                        {user.email && (
                          <p className="truncate text-xs text-muted">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-1.5">
                      {ACCOUNT_LINKS.map(({ label, to, icon: Icon }) => (
                        <Link
                          key={label}
                          to={to}
                          role="menuitem"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-electric/10 hover:text-electric"
                        >
                          <Icon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          {label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-line p-1.5">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                      >
                        <LogOut
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        {loggingOut ? 'Logging out…' : 'Logout'}
                      </button>

                      {logoutError && (
                        <p
                          role="alert"
                          className="px-3 pb-2 pt-1 text-xs font-medium text-red-600"
                        >
                          {logoutError}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className={loginClass}>
                Login
              </Link>

              <Link to="/register" className={registerClass}>
                Register
              </Link>
            </>
          )}

          <Link
            to={REPORT_ISSUE_PATH}
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
            isDark
              ? 'text-white hover:bg-white/10'
              : 'text-midnight hover:bg-midnight/5'
          }`}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
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
            } border-t ${
              isDark ? 'border-white/10' : 'border-line'
            }`}
          >
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
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

                {/* Account options (mobile) */}
                {!authLoading && (
                  <li
                    className={`mt-2 border-t pt-3 ${
                      isDark ? 'border-white/10' : 'border-line'
                    }`}
                  >
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-3 pb-2">
                          <UserAvatar
                            user={user}
                            className="h-10 w-10"
                          />

                          <div className="min-w-0">
                            <p
                              className={`truncate text-sm font-semibold ${
                                isDark ? 'text-white' : 'text-midnight'
                              }`}
                            >
                              {displayName}
                            </p>

                            {user.email && (
                              <p
                                className={`truncate text-xs ${
                                  isDark ? 'text-slate-400' : 'text-muted'
                                }`}
                              >
                                {user.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <ul className="flex flex-col gap-1">
                          {ACCOUNT_LINKS.map(
                            ({ label, to, icon: Icon }) => (
                              <li key={label}>
                                <Link
                                  to={to}
                                  className={mobileRow}
                                >
                                  <Icon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  {label}
                                </Link>
                              </li>
                            ),
                          )}

                          <li>
                            <button
                              type="button"
                              onClick={handleLogout}
                              disabled={loggingOut}
                              className={`${mobileRow} text-red-500 disabled:opacity-60 ${
                                isDark
                                  ? 'hover:bg-red-500/10'
                                  : 'hover:bg-red-50'
                              }`}
                            >
                              <LogOut
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              {loggingOut
                                ? 'Logging out…'
                                : 'Logout'}
                            </button>

                            {logoutError && (
                              <p
                                role="alert"
                                className="px-3 pt-1 text-xs font-medium text-red-500"
                              >
                                {logoutError}
                              </p>
                            )}
                          </li>
                        </ul>
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          to="/login"
                          className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
                            isDark
                              ? 'border-white/20 text-white hover:bg-white/10'
                              : 'border-line text-midnight hover:border-electric hover:text-electric'
                          }`}
                        >
                          <LogIn
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          Login
                        </Link>

                        <Link
                          to="/register"
                          className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${
                            isDark
                              ? 'border-white/20 text-white hover:bg-white/10'
                              : 'border-line text-midnight hover:border-electric hover:text-electric'
                          }`}
                        >
                          <UserPlus
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          Register
                        </Link>
                      </div>
                    )}
                  </li>
                )}

                <li className="pt-2">
                  <Link
                    to={REPORT_ISSUE_PATH}
                    className="flex items-center justify-center gap-2 rounded-xl bg-electric px-4 py-3 text-sm font-semibold text-white"
                  >
                    Report an Issue
                    <ArrowRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}