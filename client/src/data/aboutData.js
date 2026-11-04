/**
 * Content for the About & Contact page.
 *
 * TEAM: the entries below are PLACEHOLDERS. Replace them with real names,
 * roles and short bios before any public release. Do not publish a person's
 * details without their consent.
 */

// Optional public contact email, set in .env as VITE_CONTACT_EMAIL.
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';

export const MISSION =
  'To help citizens recognise corruption, report it responsibly and reach the official institutions that can act, while making public-record history easier to understand.';

export const VISION =
  'A society where citizens can see, question and follow through on how public power and public money are used, without rumour, fear or false accusations.';

export const VALUES = [
  {
    icon: 'ShieldCheck',
    title: 'Responsibility first',
    text: 'A claim is not a finding. Reports are moderated and labelled, and only courts decide guilt.',
  },
  {
    icon: 'Eye',
    title: 'Transparency',
    text: 'We explain our labels, show our limits and mark demonstration data as demonstration data.',
  },
  {
    icon: 'Lock',
    title: 'Privacy',
    text: 'We discourage personal identifiers and never ask you to name a private individual.',
  },
  {
    icon: 'Landmark',
    title: 'Independence',
    text: 'SATYA SETU is not a government body. We point to official channels rather than replace them.',
  },
];

export const HOW_WE_WORK = [
  {
    icon: 'FileText',
    title: 'Community reports',
    text: 'Citizens describe a concern, name the office rather than a person, and attach optional evidence. New posts are held for moderation and are never published automatically.',
  },
  {
    icon: 'BarChart3',
    title: 'Historical intelligence',
    text: 'A curated register of widely reported public-record matters, each tagged as allegation, investigation, court finding or conviction, with a note on what the status does and does not mean.',
  },
  {
    icon: 'Route',
    title: 'Official channels',
    text: 'Plain-language guidance on which government body handles what, with links to official websites only.',
  },
];

export const TEAM = [
  {
    id: 'lead',
    name: 'Team member name',
    role: 'Project lead',
    bio: 'Replace this placeholder with a short bio.',
    placeholder: true,
  },
  {
    id: 'frontend',
    name: 'Team member name',
    role: 'Design and frontend',
    bio: 'Replace this placeholder with a short bio.',
    placeholder: true,
  },
  {
    id: 'research',
    name: 'Team member name',
    role: 'Research and data',
    bio: 'Replace this placeholder with a short bio.',
    placeholder: true,
  },
  {
    id: 'safety',
    name: 'Team member name',
    role: 'Moderation and safety',
    bio: 'Replace this placeholder with a short bio.',
    placeholder: true,
  },
];

export const CONTACT_TOPICS = [
  'General question',
  'Report an error in the case register',
  'Partnership or collaboration',
  'Media enquiry',
  'Technical problem',
];

export const FEEDBACK_TOPICS = [
  'Design and ease of use',
  'Accuracy of content',
  'Safety or privacy concern',
  'Feature idea',
  'Other',
];

export const DISCLAIMER_POINTS = [
  {
    title: 'Independent and unofficial',
    text: 'SATYA SETU is an independent educational prototype. It is not a government authority, investigative agency, law firm or court, and it is not endorsed by any of them.',
  },
  {
    title: 'Not a complaint channel',
    text: 'Posting here does not file an official complaint and starts no investigation. For formal action, use the official channels on the Citizen Resources page.',
  },
  {
    title: 'Allegations are not facts',
    text: 'Community reports are citizens’ claims. A claim, an investigation, a court finding and a conviction are different things, and only a court decides guilt.',
  },
  {
    title: 'Demonstration data',
    text: 'Reports and comments shown in this prototype are synthetic and describe no real person or incident. The case register is a small curated set that has not been independently verified, and it is not a statistical picture of corruption.',
  },
  {
    title: 'No legal advice',
    text: 'Content is for education and is not legal advice. Legal positions change, so read the original judgments and official records, and consult a qualified lawyer where needed.',
  },
  {
    title: 'Privacy and moderation',
    text: 'Please do not post private personal information. Moderators may edit, hold or remove content. External links lead to sites we do not control.',
  },
];