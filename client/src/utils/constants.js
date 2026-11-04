// Central place for site-wide constants (navigation, identity, env config).

export const SITE = {
  name: 'SATYA SETU',
  telugu: 'సత్య సేతు',
  meaning: 'The Bridge to Truth',
  tagline: 'Connecting Citizens. Revealing Truth.',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Community', to: '/community' },
  { label: 'Intelligence', to: '/intelligence' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
];

// Opens the Community page with the report form already open.
export const REPORT_ISSUE_PATH = '/community?new=1';

// Environment configuration (no secrets; only VITE_ prefixed values reach the browser).
// Demo mode is ON unless VITE_USE_DEMO_DATA is explicitly set to "false".
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  USE_DEMO_DATA:
    String(import.meta.env.VITE_USE_DEMO_DATA ?? 'true')
      .trim()
      .toLowerCase() !== 'false',
};

export const DISCLAIMER_SHORT =
  'SATYA SETU is an independent educational prototype. It is not a government authority, investigative agency or court. Demonstration content is synthetic and is not verified fact.';