/**
 * Demonstration data and option lists for the Community page.
 *
 * IMPORTANT
 *  - Every report and comment below is SYNTHETIC and written for this
 *    prototype. None describes a real person, office-holder or incident.
 *  - Organisation names are deliberately generic ("a municipal licensing
 *    counter") so no real body is accused.
 *  - State / district lists are a STARTER set. Replace them with an
 *    authoritative list (for example from the API) before launch, because
 *    district boundaries change.
 */

export const OTHER_DISTRICT = 'Other / not listed';

const withOther = (list) => [...list, OTHER_DISTRICT];

export const STATE_DISTRICTS = {
  'Andhra Pradesh': withOther([
    'Alluri Sitharama Raju',
    'Anakapalli',
    'Anantapur',
    'Annamayya',
    'Bapatla',
    'Chittoor',
    'Dr. B.R. Ambedkar Konaseema',
    'East Godavari',
    'Eluru',
    'Guntur',
    'Kakinada',
    'Krishna',
    'Kurnool',
    'Nandyal',
    'NTR',
    'Palnadu',
    'Parvathipuram Manyam',
    'Prakasam',
    'Sri Potti Sriramulu Nellore',
    'Sri Sathya Sai',
    'Srikakulam',
    'Tirupati',
    'Visakhapatnam',
    'Vizianagaram',
    'West Godavari',
    'YSR Kadapa',
  ]),
  Telangana: withOther(['Hyderabad', 'Karimnagar', 'Khammam', 'Nizamabad', 'Rangareddy', 'Warangal']),
  Karnataka: withOther(['Bengaluru Urban', 'Belagavi', 'Dharwad', 'Kalaburagi', 'Mysuru']),
  'Tamil Nadu': withOther(['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli']),
  Maharashtra: withOther(['Mumbai City', 'Nagpur', 'Nashik', 'Pune', 'Thane']),
  Kerala: withOther(['Ernakulam', 'Kozhikode', 'Thiruvananthapuram']),
  Delhi: withOther(['Central Delhi', 'New Delhi', 'North Delhi', 'South Delhi']),
  'Other state / UT': [OTHER_DISTRICT],
};

export const STATES = Object.keys(STATE_DISTRICTS);

export const CATEGORIES = [
  'Bribery',
  'Public services',
  'Public works & tenders',
  'Land & revenue',
  'Welfare schemes',
  'Policing & law enforcement',
  'Education',
  'Healthcare',
  'Overcharging',
  'Other',
];

export const SECTORS = ['Government', 'Private'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'upvoted', label: 'Most upvoted' },
  { value: 'discussed', label: 'Most discussed' },
];

export const FLAG_REASONS = [
  { value: 'private-person', label: 'Names or identifies a private individual' },
  { value: 'personal-info', label: 'Contains phone, ID, bank or address details' },
  { value: 'false', label: 'False, misleading or fabricated' },
  { value: 'abuse', label: 'Harassment, hate or threats' },
  { value: 'spam', label: 'Spam or advertising' },
  { value: 'other', label: 'Something else' },
];

export const PAGE_SIZE = 6;

/* ------------------------------------------------------------------ */
/* Synthetic seed content                                              */
/* ------------------------------------------------------------------ */

const daysAgo = (days, hours = 0) =>
  new Date(Date.now() - days * 86400000 - hours * 3600000).toISOString();

const REPORT_SEEDS = [
  {
    id: 'cr-001',
    title: 'Alleged unofficial payment sought for a trade licence renewal',
    summary:
      'A shop owner reports being told the renewal would be "stuck" unless an extra amount was paid in cash. They say no receipt was offered for the extra sum. No documents have been attached yet.',
    category: 'Bribery',
    sector: 'Government',
    state: 'Andhra Pradesh',
    district: 'Kurnool',
    locality: 'Town centre',
    organisation: 'Municipal licensing counter',
    status: 'unverified',
    upvotes: 86,
    ageDays: 1,
    incidentDaysAgo: 4,
    media: { images: 0, videos: 0 },
  },
  {
    id: 'cr-002',
    title: 'Road repair reportedly marked complete, but residents say it was not carried out',
    summary:
      'Residents of a locality say a notice board shows a repair as finished, while the road still has large potholes. They are asking how the work order and completion record can be checked, for example through an RTI application.',
    category: 'Public works & tenders',
    sector: 'Government',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    locality: 'Residential colony',
    organisation: 'Local body engineering section',
    status: 'review',
    upvotes: 52,
    ageDays: 2,
    incidentDaysAgo: 12,
    media: { images: 2, videos: 0 },
  },
  {
    id: 'cr-003',
    title: 'Coaching centre allegedly refunded only part of a fee after a course was cancelled',
    summary:
      'A parent says the centre cancelled a batch but returned only a portion of the fee, citing charges that were not in the written terms. The parent is considering a consumer complaint.',
    category: 'Education',
    sector: 'Private',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    locality: '',
    organisation: 'Private coaching institute',
    status: 'unverified',
    upvotes: 41,
    ageDays: 3,
    incidentDaysAgo: 20,
    media: { images: 0, videos: 0 },
  },
  {
    id: 'cr-004',
    title: 'Ration shop reportedly giving short measure of grain',
    summary:
      'Several card holders say the quantity weighed out is lower than their entitlement. One person has attached a photo of the weighing, which has not been independently checked.',
    category: 'Welfare schemes',
    sector: 'Government',
    state: 'Andhra Pradesh',
    district: 'Srikakulam',
    locality: 'Village',
    organisation: 'Fair price shop',
    status: 'evidence',
    upvotes: 73,
    ageDays: 5,
    incidentDaysAgo: 7,
    media: { images: 1, videos: 0 },
  },
  {
    id: 'cr-005',
    title: 'Hospital bill includes a test the patient says was not performed',
    summary:
      'A family says an itemised bill lists a scan they do not recall being done. They hold a redacted copy of the bill and have asked the hospital for the report.',
    category: 'Healthcare',
    sector: 'Private',
    state: 'Tamil Nadu',
    district: 'Chennai',
    locality: '',
    organisation: 'Private hospital billing desk',
    status: 'evidence',
    upvotes: 58,
    ageDays: 6,
    incidentDaysAgo: 10,
    media: { images: 1, videos: 0 },
  },
  {
    id: 'cr-006',
    title: 'Land record correction reportedly delayed with no explanation',
    summary:
      'An applicant says a mutation request has been pending well beyond the stated timeline, and that an intermediary suggested paying to "move the file". They hold the acknowledgement receipt but no proof of the alleged suggestion.',
    category: 'Land & revenue',
    sector: 'Government',
    state: 'Telangana',
    district: 'Rangareddy',
    locality: '',
    organisation: 'Revenue office',
    status: 'unverified',
    upvotes: 35,
    ageDays: 8,
    incidentDaysAgo: 30,
    media: { images: 0, videos: 0 },
  },
  {
    id: 'cr-007',
    title: 'Scholarship release said to require an "agent fee"',
    summary:
      'Students describe being asked by a third party for a fee to release a scholarship. Moderators are checking this report against the posting guidelines.',
    category: 'Education',
    sector: 'Government',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    locality: '',
    organisation: 'College scholarship cell',
    status: 'review',
    upvotes: 67,
    ageDays: 9,
    incidentDaysAgo: 14,
    media: { images: 0, videos: 0 },
  },
  {
    id: 'cr-008',
    title: 'Tender re-issued with changed conditions; report points to the public notice',
    summary:
      'The reporter noticed that a tender was re-issued with changed conditions and cites the notice on the official tender portal. The change itself is a matter of public record. The report makes no accusation about why it happened.',
    category: 'Public works & tenders',
    sector: 'Government',
    state: 'Maharashtra',
    district: 'Pune',
    locality: '',
    organisation: 'Municipal procurement department',
    status: 'verified',
    upvotes: 29,
    ageDays: 12,
    incidentDaysAgo: 15,
    media: { images: 0, videos: 0 },
  },
  {
    id: 'cr-009',
    title: 'Traffic fine reportedly offered "on the spot" without a receipt',
    summary:
      'A motorist says they were offered a lower cash amount instead of an official challan. They declined and are unsure how to report it.',
    category: 'Policing & law enforcement',
    sector: 'Government',
    state: 'Delhi',
    district: 'New Delhi',
    locality: '',
    organisation: 'Traffic enforcement',
    status: 'unverified',
    upvotes: 48,
    ageDays: 14,
    incidentDaysAgo: 16,
    media: { images: 0, videos: 0 },
  },
];

const COMMENT_SEEDS = {
  'cr-001': [
    { id: 'c-001-1', text: 'Always ask for a printed receipt. Official fees come with a receipt number.', ageDays: 1 },
    { id: 'c-001-2', text: 'You can also file this on CPGRAMS or contact the state ACB. See the Resources page for links.', ageDays: 0 },
  ],
  'cr-002': [
    { id: 'c-002-1', text: 'An RTI request for the work order and measurement record is a sensible first step.', ageDays: 1 },
  ],
  'cr-004': [
    { id: 'c-004-1', text: 'Note the date and the quantity received each month. A written log helps any complaint.', ageDays: 3 },
    { id: 'c-004-2', text: 'Photos of the scale are useful, but avoid showing people\'s faces.', ageDays: 2 },
  ],
  'cr-006': [
    { id: 'c-006-1', text: 'Keep the acknowledgement receipt safe. It proves the date you applied.', ageDays: 6 },
  ],
  'cr-008': [
    { id: 'c-008-1', text: 'Thanks for linking the notice. That makes this easy for others to check.', ageDays: 10 },
  ],
  'cr-009': [
    { id: 'c-009-1', text: 'Official fines come with a challan number or an e-challan reference. Ask for it.', ageDays: 12 },
    { id: 'c-009-2', text: 'Most state police and transport sites have a grievance option for this.', ageDays: 11 },
  ],
};

/** Builds fresh demo reports (dates are relative to "now"). */
export function createDemoReports() {
  return REPORT_SEEDS.map(({ ageDays, incidentDaysAgo, ...rest }) => ({
    ...rest,
    createdAt: daysAgo(ageDays),
    incidentDate: daysAgo(incidentDaysAgo).slice(0, 10),
    commentCount: (COMMENT_SEEDS[rest.id] ?? []).length,
    isDemo: true,
  }));
}

/** Builds fresh demo comments keyed by report id. */
export function createDemoComments() {
  const result = {};
  Object.entries(COMMENT_SEEDS).forEach(([reportId, list]) => {
    result[reportId] = list.map((c) => ({
      id: c.id,
      author: 'Anonymous citizen',
      text: c.text,
      createdAt: daysAgo(c.ageDays),
      isDemo: true,
      flagged: false,
    }));
  });
  return result;
}