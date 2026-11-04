import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * Shared shell for every page: Navbar + animated page area + Footer.
 * The Intelligence dashboard (/intelligence) uses the dark navbar variant.
 */
export default function MainLayout() {
  const { pathname } = useLocation();
  const isDark = pathname.startsWith('/intelligence');

  usePageTitle(pathname);

  return (
    <div className={`flex min-h-screen flex-col ${isDark ? 'bg-midnight' : 'bg-paper'}`}>
      <ScrollToTop />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-electric focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar variant={isDark ? 'dark' : 'light'} />

      <motion.main
        id="main-content"
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
}