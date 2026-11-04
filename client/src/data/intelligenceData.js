/**
 * Curated case register for the Historical Intelligence dashboard.
 *
 * READ BEFORE LAUNCH
 *  - These are widely reported public-record matters, summarised in cautious
 *    language. They were compiled for this prototype and have NOT been
 *    independently verified against the judgments. Verify every date and
 *    outcome against official records, and have a legal reviewer check the
 *    wording, before any public release.
 *  - `status` is the latest recorded stage of the PRINCIPAL proceeding.
 *    Several matters involve many separate cases with different outcomes,
 *    which `statusNote` explains.
 *  - No monetary amounts or national statistics appear anywhere on purpose.
 *  - `geo` holds the coordinates of the city where the matter was centred.
 *    Set `geo: null` when no genuine location exists, and the case is then
 *    left out of the location plot.
 *  - `sources` links to the official institution home pages where the
 *    primary documents can be searched. They are not deep links.
 *  - Timeline `kind` is one of: context | allegation | investigation | court | conviction.
 */

export const DATASET_META = {
  name: 'Curated case register (prototype)',
  caseCountLabel: 'cases',
  note:
    'A small, hand-curated set of widely reported public-record matters. It is not a complete or representative list of corruption cases in India.',
};

const SRC = {
  cbi: { label: 'Central Bureau of Investigation', url: 'https://cbi.gov.in' },
  cag: { label: 'Comptroller and Auditor General of India', url: 'https://cag.gov.in' },
  sc: { label: 'Supreme Court of India', url: 'https://www.sci.gov.in' },
  delhiHc: { label: 'Delhi High Court', url: 'https://delhihighcourt.nic.in' },
  sebi: { label: 'Securities and Exchange Board of India', url: 'https://www.sebi.gov.in' },
  ed: { label: 'Enforcement Directorate', url: 'https://enforcementdirectorate.gov.in' },
};

export const CASES = [
  {
    id: 'bofors',
    title: 'Bofors howitzer contract',
    startYear: 1987,
    period: '1987 onward',
    sector: 'Government',
    area: 'Public funds & procurement',
    state: 'Delhi',
    location: 'New Delhi (national matter)',
    geo: { place: 'New Delhi', lat: 28.6139, lng: 77.209 },
    status: 'court',
    statusNote: 'Courts quashed the charges. No conviction was recorded.',
    summary:
      'A 1986 contract to buy field howitzers from a Swedish company became the subject of allegations in 1987 that commissions had been paid to middlemen and officials.',
    outcome:
      'The CBI registered a case in 1990. The Delhi High Court quashed charges against several accused in 2004 and again in 2005. No conviction was recorded.',
    timeline: [
      { year: 1987, kind: 'allegation', text: 'A foreign broadcaster reports alleged payments linked to the contract.' },
      { year: 1990, kind: 'investigation', text: 'The CBI registers a case.' },
      { year: 2004, kind: 'court', text: 'The Delhi High Court quashes charges against several accused. Further orders follow in 2005.' },
    ],
    sources: [SRC.cbi, SRC.delhiHc],
  },
  {
    id: 'securities-1992',
    title: '1992 securities and bank-receipt scam',
    startYear: 1992,
    period: '1992 onward',
    sector: 'Mixed',
    area: 'Finance & corporate',
    state: 'Maharashtra',
    location: 'Mumbai',
    geo: { place: 'Mumbai', lat: 19.076, lng: 72.8777 },
    status: 'conviction',
    statusNote: 'Prosecutions ran as several separate cases. Outcomes differ by case and by accused.',
    summary:
      'In 1992 it emerged that funds had been diverted from banks into the stock market through irregular securities and bank-receipt transactions, contributing to a sharp market fall.',
    outcome:
      'A joint parliamentary committee examined the episode and special courts tried several cases. Some accused were convicted in separate proceedings. The principal accused died in 2001 while proceedings were pending.',
    timeline: [
      { year: 1992, kind: 'allegation', text: 'Irregular transactions and diversion of bank funds are exposed in the press.' },
      { year: 1992, kind: 'investigation', text: 'Parliament sets up a joint committee to examine the irregularities.' },
      { year: 2001, kind: 'context', text: 'The principal accused dies while proceedings are pending.' },
    ],
    sources: [SRC.cbi, SRC.sebi],
  },
  {
    id: 'fodder',
    title: 'Bihar fodder scam',
    startYear: 1996,
    period: '1996 onward',
    sector: 'Government',
    area: 'Public funds & procurement',
    state: 'Jharkhand',
    location: 'Treasuries in undivided Bihar, now mostly Jharkhand. Trials held in Ranchi.',
    geo: { place: 'Ranchi', lat: 23.3441, lng: 85.3096 },
    status: 'conviction',
    statusNote:
      'Many separate cases. Verdicts and appeals differ by case, and some matters may still be pending.',
    summary:
      'Investigators found that large sums were withdrawn from state treasuries on the strength of false bills, supposedly for fodder and animal-husbandry supplies.',
    outcome:
      'The CBI registered multiple cases. Special CBI courts have convicted a number of accused across separate cases, including a former chief minister. Some appeals and related matters remain pending.',
    timeline: [
      { year: 1996, kind: 'allegation', text: 'Fraudulent treasury withdrawals come to light.' },
      { year: 1996, kind: 'investigation', text: 'The courts direct a CBI investigation.' },
      { year: 2013, kind: 'conviction', text: 'First conviction of a former chief minister in one of the cases.' },
    ],
    sources: [SRC.cbi, SRC.sc],
  },
  {
    id: 'tn-da',
    title: 'Tamil Nadu disproportionate assets case',
    startYear: 1996,
    period: '1996 to 2017',
    sector: 'Government',
    area: 'Public office & recruitment',
    state: 'Tamil Nadu',
    location: 'Chennai (trial held in Bengaluru)',
    geo: { place: 'Chennai', lat: 13.0827, lng: 80.2707 },
    status: 'conviction',
    statusNote:
      'The Supreme Court restored the conviction of the surviving accused in 2017. Proceedings against the principal accused ended because she had died.',
    summary:
      'A case registered in 1996 alleged that a sitting chief minister and associates held assets disproportionate to known income during 1991 to 1996.',
    outcome:
      'The trial was moved to Karnataka. In 2014 a special court in Bengaluru convicted the accused. In 2015 the Karnataka High Court set the convictions aside. In February 2017 the Supreme Court restored the trial court\u2019s convictions of the surviving accused. Proceedings against the principal accused abated after her death in December 2016.',
    timeline: [
      { year: 1996, kind: 'allegation', text: 'A case is registered following a complaint.' },
      { year: 2003, kind: 'court', text: 'The Supreme Court transfers the trial to Karnataka.' },
      { year: 2014, kind: 'conviction', text: 'A special court in Bengaluru convicts the accused.' },
      { year: 2015, kind: 'court', text: 'The Karnataka High Court sets the convictions aside.' },
      { year: 2017, kind: 'conviction', text: 'The Supreme Court restores the convictions of the surviving accused.' },
    ],
    sources: [SRC.sc],
  },
  {
    id: '2g',
    title: '2G spectrum licence allocation',
    startYear: 2008,
    period: '2008 to 2017',
    sector: 'Government',
    area: 'Licences & resources',
    state: 'Delhi',
    location: 'New Delhi (national matter)',
    geo: { place: 'New Delhi', lat: 28.6139, lng: 77.209 },
    status: 'court',
    statusNote:
      'The principal CBI trial ended in acquittal. Appeals and related proceedings may still be pending.',
    summary:
      'Questions were raised about how telecom licences and 2G spectrum were allocated in 2008, including pricing and the order in which applicants were served.',
    outcome:
      'In February 2012 the Supreme Court cancelled 122 licences granted in 2008. In December 2017 a special CBI court in Delhi acquitted all accused in the principal case, finding that the prosecution had not proved its case. Appeals were later filed.',
    timeline: [
      { year: 2008, kind: 'context', text: 'Licences and spectrum are allocated.' },
      { year: 2010, kind: 'investigation', text: 'A CAG audit report on the allocation is tabled in Parliament.' },
      { year: 2012, kind: 'court', text: 'The Supreme Court cancels 122 licences.' },
      { year: 2017, kind: 'court', text: 'A special CBI court acquits all accused in the principal case.' },
    ],
    sources: [SRC.sc, SRC.cag, SRC.cbi],
  },
  {
    id: 'satyam',
    title: 'Satyam Computer Services accounting fraud',
    startYear: 2009,
    period: '2009 to 2015',
    sector: 'Private',
    area: 'Finance & corporate',
    state: 'Telangana',
    location: 'Hyderabad (then in Andhra Pradesh)',
    geo: { place: 'Hyderabad', lat: 17.385, lng: 78.4867 },
    status: 'conviction',
    statusNote: 'Convictions in April 2015 were followed by appeal proceedings.',
    summary:
      'In January 2009 the founder-chairman of an IT services company disclosed to its board that the company\u2019s accounts had been overstated for years.',
    outcome:
      'A CBI investigation followed. In April 2015 a special CBI court in Hyderabad convicted the founder and other accused of offences including criminal conspiracy, cheating and falsification of accounts. Appeal proceedings followed.',
    timeline: [
      { year: 2009, kind: 'allegation', text: 'The founder discloses overstated accounts in a letter to the board.' },
      { year: 2009, kind: 'investigation', text: 'The CBI takes over the investigation.' },
      { year: 2015, kind: 'conviction', text: 'A special CBI court in Hyderabad convicts the accused.' },
    ],
    sources: [SRC.cbi, SRC.sebi],
  },
  {
    id: 'coal',
    title: 'Coal block allocations',
    startYear: 2012,
    period: '2012 onward',
    sector: 'Government',
    area: 'Licences & resources',
    state: 'Delhi',
    location: 'New Delhi (national matter)',
    geo: { place: 'New Delhi', lat: 28.6139, lng: 77.209 },
    status: 'court',
    statusNote:
      'The Supreme Court ruled on the legality of the allocations. Separate criminal cases are tried individually and their outcomes differ.',
    summary:
      'A 2012 CAG report examined coal block allocations made without competitive bidding between 2004 and 2009 and estimated a large notional loss to the public. The estimate was disputed.',
    outcome:
      'In 2014 the Supreme Court held that allocations made between 1993 and 2011 were illegal and arbitrary, and later cancelled them. The CBI registered separate criminal cases, and special courts have delivered verdicts in some of them.',
    timeline: [
      { year: 2012, kind: 'investigation', text: 'A CAG report on the allocations is tabled in Parliament.' },
      { year: 2014, kind: 'court', text: 'The Supreme Court declares allocations since 1993 illegal and later cancels them.' },
    ],
    sources: [SRC.cag, SRC.sc, SRC.cbi],
  },
  {
    id: 'saradha',
    title: 'Saradha chit fund collapse',
    startYear: 2013,
    period: '2013 onward',
    sector: 'Private',
    area: 'Finance & corporate',
    state: 'West Bengal',
    location: 'Kolkata',
    geo: { place: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    status: 'investigation',
    statusNote:
      'Investigations and court proceedings are at different stages. Check the court record for the current position.',
    summary:
      'In April 2013 a group of companies that had raised money from many small investors through collective investment schemes collapsed, leaving depositors unpaid.',
    outcome:
      'In May 2014 the Supreme Court directed a CBI investigation covering several states. Investigations and court proceedings have continued since.',
    timeline: [
      { year: 2013, kind: 'allegation', text: 'The group collapses and depositors report unpaid dues.' },
      { year: 2014, kind: 'investigation', text: 'The Supreme Court directs a CBI investigation.' },
    ],
    sources: [SRC.cbi, SRC.sc, SRC.sebi],
  },
  {
    id: 'vyapam',
    title: 'Madhya Pradesh Vyapam examinations and recruitment case',
    startYear: 2013,
    period: '2013 onward',
    sector: 'Government',
    area: 'Public office & recruitment',
    state: 'Madhya Pradesh',
    location: 'Bhopal',
    geo: { place: 'Bhopal', lat: 23.2599, lng: 77.4126 },
    status: 'investigation',
    statusNote:
      'Investigated through many separate cases. Their stages differ, and some have reached court.',
    summary:
      'Allegations of irregularities in entrance examinations and recruitment run by a state examination board, including impersonation and manipulated results, led to arrests from 2013.',
    outcome:
      'In July 2015 the Supreme Court directed the CBI to take over the investigation. Many cases have been filed and proceedings are at different stages.',
    timeline: [
      { year: 2013, kind: 'allegation', text: 'Irregularities in examinations come to light and arrests begin.' },
      { year: 2015, kind: 'investigation', text: 'The Supreme Court directs the CBI to take over the investigation.' },
    ],
    sources: [SRC.cbi, SRC.sc],
  },
  {
    id: 'pnb-2018',
    title: 'Punjab National Bank letters-of-undertaking fraud',
    startYear: 2018,
    period: '2018 onward',
    sector: 'Mixed',
    area: 'Finance & corporate',
    state: 'Maharashtra',
    location: 'Mumbai',
    geo: { place: 'Mumbai', lat: 19.076, lng: 72.8777 },
    status: 'investigation',
    statusNote:
      'Investigation and extradition proceedings are recorded here. No final Indian trial verdict is included in this register.',
    summary:
      'In February 2018 a public-sector bank reported fraudulent letters of undertaking issued from a single Mumbai branch in favour of jewellery companies.',
    outcome:
      'The CBI and the Enforcement Directorate began investigations. One of the main accused was arrested in the United Kingdom in March 2019, and in 2021 a UK court ruled that extradition could proceed, followed by further legal steps.',
    timeline: [
      { year: 2018, kind: 'allegation', text: 'The bank reports fraudulent transactions at a Mumbai branch.' },
      { year: 2018, kind: 'investigation', text: 'The CBI and the Enforcement Directorate begin investigations.' },
      { year: 2019, kind: 'investigation', text: 'A main accused is arrested in London.' },
      { year: 2021, kind: 'court', text: 'A UK court rules that extradition can proceed.' },
    ],
    sources: [SRC.cbi, SRC.ed],
  },
];