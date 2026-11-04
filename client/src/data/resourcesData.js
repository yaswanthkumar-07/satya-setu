/**
 * Official reporting channels, helplines and guidance.
 *
 * RULES FOR THIS FILE
 *  - Only official government websites are linked.
 *  - Helpline numbers and portal addresses change. Re-check them before launch
 *    and update LAST_REVIEWED.
 *  - Jurisdiction text is a plain-language summary, not legal advice.
 *  - `icon` is a string key mapped inside the components, so this file stays
 *    plain data that can later come from an API.
 */

export const LAST_REVIEWED = 'November 2026';

export const CHANNELS = [
  {
    id: 'ap-acb',
    name: 'Andhra Pradesh Anti-Corruption Bureau (ACB)',
    short: 'AP ACB',
    level: 'state',
    levelLabel: 'Andhra Pradesh',
    icon: 'ShieldAlert',
    website: 'https://acb.ap.gov.in',
    helplines: [
      { label: 'Toll-free helpline', number: '14400' },
      { label: 'Complaint registration', number: '1064' },
    ],
    jurisdiction:
      'Corruption by employees and offices of the Andhra Pradesh state government, for example a bribe demanded at a revenue, registration or panchayat office.',
    purpose:
      'Receives complaints about public servants of the state and can investigate offences under the Prevention of Corruption Act.',
    goodFor: [
      'A state government employee asked you for a bribe',
      'Disproportionate wealth of a state government employee',
      'Corruption in state government offices',
    ],
    notFor: [
      'Central government offices, PSUs or public sector banks (see CVC)',
      'Private companies or private disputes',
      'Ordinary service delays with no bribe involved (see grievance portals)',
    ],
    tips: [
      'Note the date, office, what was asked and keep any receipts or reference numbers.',
      'Do not try to set up a trap yourself. Agencies run these with legal safeguards.',
    ],
  },
  {
    id: 'cvc',
    name: 'Central Vigilance Commission (CVC)',
    short: 'CVC',
    level: 'central',
    levelLabel: 'Central government',
    icon: 'Landmark',
    website: 'https://cvc.gov.in',
    actionUrl: 'https://portal.cvc.gov.in',
    actionLabel: 'Open the complaint portal',
    helplines: [],
    jurisdiction:
      'Corruption complaints against officials of Central Government ministries and departments, central public sector undertakings, public sector banks, insurance companies and similar bodies under its jurisdiction.',
    purpose:
      'India’s apex vigilance institution. It receives complaints and usually has the concerned organisation’s Chief Vigilance Officer look into them.',
    goodFor: [
      'A central government office or PSU official misused their position',
      'Irregularities in a public sector bank or insurer',
      'Whistle-blower disclosures about central bodies',
    ],
    notFor: [
      'State government employees (use the state ACB or Lokayukta)',
      'Personal grievances outside its jurisdiction',
      'Vague or anonymous complaints, which are generally not acted on',
    ],
    tips: [
      'Complaints should be specific, give verifiable facts and include your contact details.',
      'Keep the complaint reference number so you can check the status.',
    ],
  },
  {
    id: 'cpgrams',
    name: 'CPGRAMS (Centralised Public Grievance Redress and Monitoring System)',
    short: 'CPGRAMS',
    level: 'central',
    levelLabel: 'National portal',
    icon: 'MessagesSquare',
    website: 'https://pgportal.gov.in',
    helplines: [],
    jurisdiction:
      'Grievances about services and conduct of Central Government ministries and departments. Many state departments are also reachable through it.',
    purpose:
      'A 24x7 online portal to lodge a public grievance and track it with a registration number. It routes the grievance to the department concerned.',
    goodFor: [
      'A central service is delayed, denied or handled badly',
      'You want a trackable record of a grievance',
      'You are unsure which department is responsible',
    ],
    notFor: [
      'RTI applications (use RTI Online)',
      'Matters pending before a court',
      'Emergencies or crimes in progress (call 112)',
    ],
    tips: ['Describe one issue per grievance and attach supporting documents.'],
  },
  {
    id: 'rti',
    name: 'RTI Online',
    short: 'RTI Online',
    level: 'central',
    levelLabel: 'Central authorities',
    icon: 'FileSearch',
    website: 'https://rtionline.gov.in',
    helplines: [],
    jurisdiction:
      'Right to Information requests to Central Government public authorities. State bodies, including those in Andhra Pradesh, follow their own state rules and procedures.',
    purpose:
      'Lets you ask for official records such as work orders, muster rolls or file notings. This is often the best first step when you suspect that a project or payment exists only on paper.',
    goodFor: [
      'Checking a work order, bill or completion record',
      'Finding out why an application is pending',
      'Getting copies of public records',
    ],
    notFor: [
      'Filing a corruption complaint (it only requests information)',
      'State authorities, unless the state has linked its own process',
    ],
    tips: [
      'Ask precise questions about documents and dates.',
      'A central application carries a small fee and a reply is generally due within 30 days.',
    ],
  },
  {
    id: 'meekosam',
    name: 'Andhra Pradesh Meekosam',
    short: 'Meekosam',
    level: 'state',
    levelLabel: 'Andhra Pradesh',
    icon: 'MapPin',
    website: 'https://meekosam.ap.gov.in',
    helplines: [
      { label: 'Grievance helpline', number: '1100' },
      { label: 'Toll-free', number: '1800-425-4440' },
    ],
    jurisdiction:
      'Public grievances about Andhra Pradesh state government departments and services.',
    purpose:
      'The state’s grievance portal. Petitions are sent to the concerned department and can be tracked. Unresolved grievances can be escalated to higher officers.',
    goodFor: [
      'A state service or scheme is delayed or denied',
      'You need your petition tracked by number',
      'A first complaint before approaching the ACB',
    ],
    notFor: [
      'Central government matters (use CPGRAMS)',
      'Bribery by a specific employee where you want a criminal investigation (use the ACB)',
    ],
    tips: [
      'The state also runs other grievance programmes. If a number does not connect, confirm the current one on the portal.',
    ],
  },
  {
    id: 'lokpal',
    name: 'Lokpal of India',
    short: 'Lokpal',
    level: 'central',
    levelLabel: 'Central government',
    icon: 'Scale',
    website: 'https://lokpal.gov.in',
    actionUrl: 'https://lokpalonline.gov.in',
    actionLabel: 'Open LokpalOnline',
    helplines: [],
    jurisdiction:
      'Alleged offences under the Prevention of Corruption Act by certain public servants of the Union, as defined in the Lokpal and Lokayuktas Act, 2013. It is not for general grievances.',
    purpose:
      'An anti-corruption ombudsman that can order preliminary inquiries and investigations into complaints within its scope.',
    goodFor: [
      'A serious corruption allegation about a covered central public servant',
      'Complaints you can support with specific facts and documents',
    ],
    notFor: [
      'State government employees serving only in state affairs (use the state ACB or Lokayukta)',
      'General grievances or service delays',
    ],
    tips: [
      'Complaints must be in the prescribed form and made within the time limit set by the Act. Read the instructions on the official site first.',
    ],
  },
  {
    id: 'cybercrime',
    name: 'National Cyber Crime Reporting Portal',
    short: 'Cybercrime portal',
    level: 'central',
    levelLabel: 'National portal',
    icon: 'Laptop',
    website: 'https://cybercrime.gov.in',
    helplines: [{ label: 'Cyber fraud helpline (24x7)', number: '1930' }],
    jurisdiction:
      'Online crimes and cyber financial fraud anywhere in India, such as UPI or card fraud, phishing, fake websites and online harassment.',
    purpose:
      'Lets victims report cyber crime online and track the complaint. For financial fraud, call 1930 immediately, because speed improves the chance of freezing the money.',
    goodFor: [
      'You lost money to an online or phone scam',
      'Someone impersonated an officer or office to demand payment',
      'Online threats or harassment',
    ],
    notFor: [
      'Bribery by a public servant in person (use the ACB or CVC)',
      'Emergencies where someone is in danger (call 112)',
    ],
    tips: ['Keep screenshots, transaction IDs and phone numbers before reporting.'],
  },
];

export const SITUATIONS = [
  {
    id: 'state-bribe',
    label: 'A state government employee asked me for a bribe',
    channelIds: ['ap-acb', 'meekosam'],
    note: 'Bribery by a state employee is a matter for the state ACB. Meekosam can track a related service delay.',
  },
  {
    id: 'central-bribe',
    label: 'An official of a central office, PSU or public sector bank misused their position',
    channelIds: ['cvc', 'lokpal'],
    note: 'The CVC covers central bodies. Lokpal covers certain senior central public servants and needs a complaint in the prescribed form.',
  },
  {
    id: 'service-delay',
    label: 'A government service is delayed or denied, and no bribe is involved',
    channelIds: ['meekosam', 'cpgrams'],
    note: 'Use Meekosam for state departments and CPGRAMS for central ones.',
  },
  {
    id: 'records',
    label: 'I want to see official records, such as a work order or file status',
    channelIds: ['rti'],
    note: 'An RTI request is often the best first step when you doubt that work was done. For state bodies, follow the state’s RTI process.',
  },
  {
    id: 'cyber',
    label: 'I lost money to an online scam, or someone is impersonating an officer',
    channelIds: ['cybercrime'],
    note: 'For financial fraud, call 1930 immediately and then file on the portal.',
  },
  {
    id: 'private',
    label: 'A private company, hospital or school overcharged or cheated me',
    channelIds: [],
    note: 'This is usually a consumer or criminal-cheating matter, not public-servant corruption. Try the National Consumer Helpline listed below, and consider a police complaint if cheating is involved.',
    anchor: '#helplines',
    anchorLabel: 'See helplines',
  },
  {
    id: 'danger',
    label: 'I am being threatened, or someone is in immediate danger',
    channelIds: [],
    note: 'Call 112, the national emergency number, now. Your safety comes before any complaint.',
    anchor: '#helplines',
    anchorLabel: 'See helplines',
  },
];

export const HELPLINES = [
  {
    number: '112',
    name: 'National Emergency Number',
    use: 'Police, fire and ambulance emergencies, and threats to your safety.',
    site: 'https://112.gov.in',
  },
  {
    number: '1930',
    name: 'Cyber Crime Helpline',
    use: 'Report online financial fraud immediately. Available 24 hours.',
    site: 'https://cybercrime.gov.in',
  },
  {
    number: '14400',
    name: 'Andhra Pradesh ACB helpline',
    use: 'Report corruption by Andhra Pradesh state government employees.',
    site: 'https://acb.ap.gov.in',
  },
  {
    number: '1064',
    name: 'ACB complaint registration',
    use: 'Alternative number listed by the AP ACB for registering complaints.',
    site: 'https://acb.ap.gov.in',
  },
  {
    number: '1100',
    name: 'Andhra Pradesh grievance helpline',
    use: 'Register or follow up state government grievances. Also listed: 1800-425-4440.',
    site: 'https://meekosam.ap.gov.in',
  },
  {
    number: '1800-11-4000',
    name: 'National Consumer Helpline',
    use: 'Complaints about goods and services from private sellers and providers. Short code 1915 is also in use.',
    site: 'https://consumerhelpline.gov.in',
  },
];

export const RIGHTS = [
  {
    icon: 'FileSearch',
    title: 'Right to information',
    text: 'Under the RTI Act, 2005 you can ask public authorities for records. Central applications go through RTI Online. State authorities follow state procedures.',
  },
  {
    icon: 'Receipt',
    title: 'Official fees come with receipts',
    text: 'Genuine government fees are published and receipted. If you are asked for an unofficial amount, or a payment with no receipt, that is a red flag.',
  },
  {
    icon: 'ListChecks',
    title: 'Right to know your status',
    text: 'Grievance portals give a registration number so you can track progress. Keep it. Many departments also publish Citizen’s Charters with service timelines, so ask for one.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Protection for whistle-blowers',
    text: 'For central bodies, the CVC is the designated agency for public interest disclosures, and victimisation can be reported to it. Rules differ for state matters, so check with the state agency.',
  },
];

export const REPORTING_STEPS = [
  {
    title: 'Write down the facts',
    text: 'What happened, on what date, at which office or counter, and what exactly was asked. Stick to what you saw yourself.',
  },
  {
    title: 'Keep your documents',
    text: 'Application numbers, receipts, notices, screenshots and photos. Keep copies. Do not hand over originals unless required.',
  },
  {
    title: 'Stay safe and do not investigate yourself',
    text: 'Do not confront the person, make threats or try to set up a trap. Agencies handle that with legal safeguards.',
  },
  {
    title: 'Choose the right channel',
    text: 'Use the finder above. The wrong portal can mean your complaint is rejected or forwarded with delay.',
  },
  {
    title: 'Keep the acknowledgement and follow up',
    text: 'Save the registration or reference number and check the status on the portal. Escalate politely if nothing happens within the stated time.',
  },
];

export const EVIDENCE_CHECKLIST = [
  'Date, time and place of the incident',
  'Name of the office, department or company (a role or designation if you do not know a name)',
  'Application, file or receipt numbers',
  'Copies of documents, bills or notices',
  'Screenshots, call logs or messages, if any',
  'Names and contact details of willing witnesses',
];