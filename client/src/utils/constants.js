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

// Environment configuration (no secrets; only VITE_ prefixed values reach the browser)
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  USE_DEMO_DATA: (import.meta.env.VITE_USE_DEMO_DATA ?? 'true') === 'true',
};

export const DISCLAIMER_SHORT =
  'SATYA SETU is an independent educational prototype. It is not a government authority, investigative agency or court. Demonstration content is synthetic and is not verified fact.';