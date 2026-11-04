/**
 * Demonstration content for the Home page.
 *
 * IMPORTANT
 *  - FEATURED_REPORTS are SYNTHETIC examples written for this prototype.
 *    They describe no real person, office-holder or incident.
 *  - HISTORICAL_PREVIEW is now DERIVED from the case register in
 *    intelligenceData.js, so the Home page and the Intelligence dashboard can
 *    never disagree. To change which cases appear, edit PREVIEW_CASE_IDS.
 *  - Icons are referenced by string key and mapped inside the components,
 *    so this file stays plain data that can later come from an API.
 */

import { CASES } from './intelligenceData';
import { CHANNELS } from './resourcesData';

export const MISSION_PILLARS = [
  {
    id: 'awareness',
    icon: 'Megaphone',
    title: 'Awareness',
    text: 'Help citizens recognise corruption, understand their rights and learn where to report it.',
  },
  {
    id: 'transparency',
    icon: 'Eye',
    title: 'Transparency',
    text: 'Make public-record history easier to explore, with every claim clearly labelled by its legal status.',
  },
  {
    id: 'accountability',
    icon: 'Scale',
    title: 'Accountability',
    text: 'Point citizens to the official bodies that can investigate and to the courts that decide.',
  },
  {
    id: 'safety',
    icon: 'Lock',
    title: 'Safety by design',
    text: 'Moderation first. No unverified personal accusations are published, and private details are discouraged.',
  },
];

export const HOW_IT_WORKS = [
  {
    id: 'report',
    icon: 'FileText',
    title: 'Share a concern',
    text: 'Describe what happened, where and in which sector. Attach evidence if you have it, and leave out private personal details.',
  },
  {
    id: 'moderate',
    icon: 'ShieldCheck',
    title: 'Moderation review',
    text: 'Reports are checked for safety and policy compliance. Nothing is presented as proven fact.',
  },
  {
    id: 'discuss',
    icon: 'MessagesSquare',
    title: 'Community discussion',
    text: 'Citizens add context, upvote useful reports and flag content that looks unsafe or misleading.',
  },
  {
    id: 'escalate',
    icon: 'Route',
    title: 'Escalate officially',
    text: 'SATYA SETU does not investigate. We guide you to the correct government portal for formal action.',
  },
];

export const FEATURED_REPORTS = [
  {
    id: 'demo-001',
    title: 'Alleged informal payment demanded at a municipal certificate counter',
    summary:
      'A resident reports being asked for an unofficial fee to speed up a routine certificate. No receipt was issued for the extra amount.',
    category: 'Bribery',
    sector: 'Government',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    status: 'unverified',
    upvotes: 128,
    comments: 24,
    posted: '2 days ago',
    isDemo: true,
  },
  {
    id: 'demo-002',
    title: 'Pension payments reportedly delayed unless a "processing fee" is paid',
    summary:
      'Several pensioners in one locality describe delays that they say ended only after informal payments. The report includes no documents yet.',
    category: 'Public services',
    sector: 'Government',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    status: 'review',
    upvotes: 94,
    comments: 17,
    posted: '4 days ago',
    isDemo: true,
  },
  {
    id: 'demo-003',
    title: 'Unexplained line items on a private hospital bill',
    summary:
      'A patient\'s family reports charges for services they say were never provided and attaches a scanned bill with personal details redacted.',
    category: 'Overcharging',
    sector: 'Private',
    state: 'Andhra Pradesh',
    district: 'Tirupati',
    status: 'evidence',
    upvotes: 76,
    comments: 12,
    posted: '1 week ago',
    isDemo: true,
  },
];

// Which register entries appear in the Home preview, in display order.
const PREVIEW_CASE_IDS = ['2g', 'satyam', 'fodder'];

export const HISTORICAL_PREVIEW = PREVIEW_CASE_IDS.map((id) => CASES.find((c) => c.id === id))
  .filter(Boolean)
  .map((c) => ({
    id: c.id,
    title: c.title,
    period: c.period,
    sector: c.sector,
    location: c.state,
    status: c.status,
    statusNote: c.statusNote,
    summary: c.outcome,
  }));

// Counted from the Resources page data, so it can never drift out of date.
export const OFFICIAL_CHANNEL_COUNT = CHANNELS.length;