/**
 * TEMPORARY demo persistence using the browser's localStorage.
 *
 * IMPORTANT
 *  - This is a single-browser, single-device demo store. Nothing here is shared
 *    between users or devices. The real backend replaces it later.
 *  - Only USER-CREATED data is stored (pending reports, the user's own
 *    comments and moderation flags). Demonstration reports and comments are
 *    regenerated on every load and are never written here.
 *  - Everything read back is sanitised, so edited or corrupt storage cannot
 *    create a "verified" report or crash the page.
 */

const KEY = 'satyasetu.community.demo.v1';
const VERSION = 1;

export const MAX_PENDING = 25;
const MAX_COMMENTS_PER_REPORT = 100;
const BLOCKED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function emptyState() {
  return {
    version: VERSION,
    pending: [],
    userComments: {},
    flaggedComments: {},
    flaggedReports: [],
  };
}

function getStorage() {
  try {
    if (typeof window === 'undefined') return null;
    const storage = window.localStorage;
    const probe = '__satyasetu_probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);
    return storage;
  } catch {
    return null; // private mode, blocked storage, quota problems
  }
}

const text = (value, max, fallback = '') =>
  typeof value === 'string' ? value.trim().slice(0, max) : fallback;

const count = (value) => Math.max(0, Math.min(99, Math.floor(Number(value) || 0)));

function isoDate(value) {
  if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toISOString();
  }
  return new Date().toISOString();
}

function sanitizeComment(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = text(raw.id, 80);
  const body = text(raw.text, 500);
  if (!id || !body) return null;

  return {
    id,
    author: text(raw.author, 60, 'You (anonymous)') || 'You (anonymous)',
    text: body,
    createdAt: isoDate(raw.createdAt),
    isDemo: false,
    flagged: false,
  };
}

function sanitizePending(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const id = text(raw.id, 80);
  const title = text(raw.title, 140);
  const summary = text(raw.summary, 1500);
  if (!id || !title || !summary) return null;

  const incident = typeof raw.incidentDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.incidentDate)
    ? raw.incidentDate
    : null;

  return {
    id,
    title,
    summary,
    category: text(raw.category, 60, 'Other') || 'Other',
    sector: raw.sector === 'Private' ? 'Private' : 'Government',
    state: text(raw.state, 60),
    district: text(raw.district, 80),
    locality: text(raw.locality, 80),
    organisation: text(raw.organisation, 100),
    incidentDate: incident,
    media: {
      images: count(raw.media?.images),
      videos: count(raw.media?.videos),
    },
    createdAt: isoDate(raw.createdAt),
    // A stored report can NEVER be anything but "awaiting moderation".
    status: 'review',
    upvotes: 0,
    commentCount: 0,
    isDemo: false,
  };
}

const stringList = (value, max = 500) =>
  Array.isArray(value)
    ? value.filter((v) => typeof v === 'string' && v).slice(0, max)
    : [];

function sanitizeState(raw) {
  const state = emptyState();

  if (Array.isArray(raw.pending)) {
    state.pending = raw.pending.map(sanitizePending).filter(Boolean).slice(0, MAX_PENDING);
  }

  if (raw.userComments && typeof raw.userComments === 'object') {
    Object.entries(raw.userComments).forEach(([reportId, list]) => {
      if (BLOCKED_KEYS.has(reportId) || !Array.isArray(list)) return;
      const clean = list.map(sanitizeComment).filter(Boolean).slice(-MAX_COMMENTS_PER_REPORT);
      if (clean.length) state.userComments[reportId] = clean;
    });
  }

  if (raw.flaggedComments && typeof raw.flaggedComments === 'object') {
    Object.entries(raw.flaggedComments).forEach(([reportId, ids]) => {
      if (BLOCKED_KEYS.has(reportId)) return;
      const clean = stringList(ids);
      if (clean.length) state.flaggedComments[reportId] = clean;
    });
  }

  state.flaggedReports = stringList(raw.flaggedReports);
  return state;
}

/** Returns the saved user data, or an empty state when nothing valid is stored. */
export function readStore() {
  const storage = getStorage();
  if (!storage) return emptyState();

  try {
    const raw = storage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== VERSION) return emptyState();
    return sanitizeState(parsed);
  } catch {
    return emptyState();
  }
}

/**
 * Read-modify-write. `mutator` receives the current state and returns the next
 * one. Returns true when saved, false when the browser refused to save.
 */
export function updateStore(mutator) {
  const storage = getStorage();
  if (!storage) return false;

  try {
    const next = mutator(readStore());
    storage.setItem(KEY, JSON.stringify({ ...next, version: VERSION }));
    return true;
  } catch {
    return false;
  }
}

export function clearStore() {
  try {
    getStorage()?.removeItem(KEY);
  } catch {
    // nothing to do
  }
}