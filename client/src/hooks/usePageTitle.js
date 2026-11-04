import { useEffect } from 'react';

const TITLES = {
  '/community': 'Community Reports',
  '/intelligence': 'Historical Intelligence',
  '/resources': 'Citizen Resources',
  '/about': 'About and Contact',
};

/** Sets a meaningful document title for each route (helps tabs, history and screen readers). */
export function usePageTitle(pathname) {
  useEffect(() => {
    if (pathname === '/') {
      document.title = 'SATYA SETU | The Bridge to Truth';
      return;
    }
    const title = TITLES[pathname.replace(/\/+$/, '')] ?? 'Page not found';
    document.title = `${title} | SATYA SETU`;
  }, [pathname]);
}