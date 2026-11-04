import { FileWarning, Clock, Paperclip, ShieldCheck, Search, Scale, Gavel } from 'lucide-react';

/**
 * Status vocabularies used across the whole app.
 * Batches 3 (Community) and 4 (Intelligence) reuse these so that
 * allegations, investigations, court findings and convictions are
 * always labelled consistently.
 */

// Community report statuses (citizen-submitted content)
export const REPORT_STATUS = {
  unverified: {
    label: 'Unverified allegation',
    tone: 'amber',
    icon: FileWarning,
    description: 'A citizen has made a claim. It has not been checked or proven.',
  },
  review: {
    label: 'Under moderation review',
    tone: 'blue',
    icon: Clock,
    description: 'Moderators are checking this report for safety and policy compliance.',
  },
  evidence: {
    label: 'Evidence attached (unverified)',
    tone: 'cyan',
    icon: Paperclip,
    description: 'Supporting material was attached, but it has not been independently verified.',
  },
  verified: {
    label: 'Matches official record',
    tone: 'green',
    icon: ShieldCheck,
    description: 'The report matches a publicly available official record or court document.',
  },
};

// Historical case statuses (public-record cases)
export const CASE_STATUS = {
  allegation: {
    label: 'Allegation',
    tone: 'amber',
    icon: FileWarning,
    description:
      'A claim has been made publicly. It has not been tested by an investigation or a court.',
  },
  investigation: {
    label: 'Investigation',
    tone: 'blue',
    icon: Search,
    description:
      'An agency or authority is examining the matter. No finding of guilt has been made.',
  },
  court: {
    label: 'Court finding',
    tone: 'violet',
    icon: Scale,
    description:
      'A court has issued a ruling, order or acquittal. Read the judgment to see what was actually decided.',
  },
  conviction: {
    label: 'Conviction',
    tone: 'red',
    icon: Gavel,
    description: 'A court has found the accused guilty. Appeals may still be pending.',
  },
};