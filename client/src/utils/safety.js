/**
 * Lightweight client-side checks that stop people from posting private
 * identifiers. This is a convenience, not a guarantee: the backend and human
 * moderators must still review everything.
 */

const PATTERNS = [
  { type: 'phone number', regex: /(?:\+?91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b/ },
  { type: 'email address', regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { type: 'Aadhaar-style number', regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/ },
  { type: 'PAN-style number', regex: /\b[A-Z]{5}\d{4}[A-Z]\b/i },
];

/** Returns a list of detected identifier types (empty when nothing is found). */
export function detectPersonalInfo(...texts) {
  const joined = texts.filter(Boolean).join(' \n ');
  if (!joined) return [];
  return PATTERNS.filter((p) => p.regex.test(joined)).map((p) => p.type);
}

export function personalInfoMessage(types) {
  return `This may contain a ${types.join(' / ')}. Please remove personal identifiers before posting.`;
}