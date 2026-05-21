/**
 * Static per-country reference facts shown in the country-page hero.
 * Keyed by ISO 3166-1 alpha-2 (uppercase). Anything missing falls back to
 * hiding the row, so adding more entries is a pure additive change.
 *
 * Population: most recent UN / national-stats estimate, rounded.
 * Area: total km², rounded.
 * Currency: ISO 4217 + display symbol.
 * Languages: official / dominant languages, in order of usage.
 * Capital: primary capital. UK lists London (England's capital is also the UK's).
 */

export type CountryFacts = {
  officialName?: string;
  government?: string;
  monarch?: string;
  population?: number;
  areaKm2?: number;
  currencyCode?: string;
  currencyName?: string;
  languages?: string[];
  capital?: string;
  callingCode?: string;
  drivesOn?: 'left' | 'right';
  timezones?: string;
};

export const COUNTRY_FACTS: Record<string, CountryFacts> = {
  GB: {
    officialName: 'United Kingdom of Great Britain and Northern Ireland',
    government: 'Parliamentary constitutional monarchy',
    monarch: 'King Charles III',
    population: 68_350_000,
    areaKm2: 243_610,
    currencyCode: 'GBP',
    currencyName: 'Pound sterling',
    languages: ['English', 'Welsh', 'Scottish Gaelic'],
    capital: 'London',
    callingCode: '+44',
    drivesOn: 'left',
    timezones: 'GMT / BST',
  },
  US: {
    population: 334_900_000,
    areaKm2: 9_833_517,
    currencyCode: 'USD',
    currencyName: 'US dollar',
    languages: ['English'],
    capital: 'Washington, D.C.',
    callingCode: '+1',
    drivesOn: 'right',
    timezones: 'UTC−5 to −10',
  },
  FR: {
    population: 68_400_000,
    areaKm2: 643_801,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['French'],
    capital: 'Paris',
    callingCode: '+33',
    drivesOn: 'right',
    timezones: 'CET / CEST',
  },
  DE: {
    population: 84_600_000,
    areaKm2: 357_596,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['German'],
    capital: 'Berlin',
    callingCode: '+49',
    drivesOn: 'right',
    timezones: 'CET / CEST',
  },
  IT: {
    population: 58_900_000,
    areaKm2: 301_340,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['Italian'],
    capital: 'Rome',
    callingCode: '+39',
    drivesOn: 'right',
    timezones: 'CET / CEST',
  },
  ES: {
    population: 48_600_000,
    areaKm2: 505_990,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['Spanish', 'Catalan', 'Galician', 'Basque'],
    capital: 'Madrid',
    callingCode: '+34',
    drivesOn: 'right',
    timezones: 'CET / CEST',
  },
  PT: {
    population: 10_640_000,
    areaKm2: 92_212,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['Portuguese'],
    capital: 'Lisbon',
    callingCode: '+351',
    drivesOn: 'right',
    timezones: 'WET / WEST',
  },
  NL: {
    population: 17_900_000,
    areaKm2: 41_850,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['Dutch'],
    capital: 'Amsterdam',
    callingCode: '+31',
    drivesOn: 'right',
    timezones: 'CET / CEST',
  },
  IE: {
    population: 5_280_000,
    areaKm2: 70_273,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['English', 'Irish'],
    capital: 'Dublin',
    callingCode: '+353',
    drivesOn: 'left',
    timezones: 'GMT / IST',
  },
  CH: {
    population: 8_900_000,
    areaKm2: 41_285,
    currencyCode: 'CHF',
    currencyName: 'Swiss franc',
    languages: ['German', 'French', 'Italian', 'Romansh'],
    capital: 'Bern',
    callingCode: '+41',
    drivesOn: 'right',
    timezones: 'CET / CEST',
  },
  GR: {
    population: 10_400_000,
    areaKm2: 131_957,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    languages: ['Greek'],
    capital: 'Athens',
    callingCode: '+30',
    drivesOn: 'right',
    timezones: 'EET / EEST',
  },
  TR: {
    population: 85_400_000,
    areaKm2: 783_356,
    currencyCode: 'TRY',
    currencyName: 'Turkish lira',
    languages: ['Turkish'],
    capital: 'Ankara',
    callingCode: '+90',
    drivesOn: 'right',
    timezones: 'TRT (UTC+3)',
  },
  JP: {
    population: 124_500_000,
    areaKm2: 377_975,
    currencyCode: 'JPY',
    currencyName: 'Japanese yen',
    languages: ['Japanese'],
    capital: 'Tokyo',
    callingCode: '+81',
    drivesOn: 'left',
    timezones: 'JST (UTC+9)',
  },
  CN: {
    population: 1_409_000_000,
    areaKm2: 9_596_961,
    currencyCode: 'CNY',
    currencyName: 'Renminbi',
    languages: ['Mandarin Chinese'],
    capital: 'Beijing',
    callingCode: '+86',
    drivesOn: 'right',
    timezones: 'CST (UTC+8)',
  },
  IN: {
    population: 1_438_000_000,
    areaKm2: 3_287_263,
    currencyCode: 'INR',
    currencyName: 'Indian rupee',
    languages: ['Hindi', 'English', '+22 scheduled'],
    capital: 'New Delhi',
    callingCode: '+91',
    drivesOn: 'left',
    timezones: 'IST (UTC+5:30)',
  },
  AE: {
    population: 9_900_000,
    areaKm2: 83_600,
    currencyCode: 'AED',
    currencyName: 'UAE dirham',
    languages: ['Arabic', 'English'],
    capital: 'Abu Dhabi',
    callingCode: '+971',
    drivesOn: 'right',
    timezones: 'GST (UTC+4)',
  },
  AU: {
    population: 26_800_000,
    areaKm2: 7_692_024,
    currencyCode: 'AUD',
    currencyName: 'Australian dollar',
    languages: ['English'],
    capital: 'Canberra',
    callingCode: '+61',
    drivesOn: 'left',
    timezones: 'UTC+8 to +11',
  },
  NZ: {
    population: 5_200_000,
    areaKm2: 268_021,
    currencyCode: 'NZD',
    currencyName: 'New Zealand dollar',
    languages: ['English', 'Māori'],
    capital: 'Wellington',
    callingCode: '+64',
    drivesOn: 'left',
    timezones: 'NZST / NZDT',
  },
  CA: {
    population: 41_000_000,
    areaKm2: 9_984_670,
    currencyCode: 'CAD',
    currencyName: 'Canadian dollar',
    languages: ['English', 'French'],
    capital: 'Ottawa',
    callingCode: '+1',
    drivesOn: 'right',
    timezones: 'UTC−3:30 to −8',
  },
  MX: {
    population: 129_700_000,
    areaKm2: 1_964_375,
    currencyCode: 'MXN',
    currencyName: 'Mexican peso',
    languages: ['Spanish'],
    capital: 'Mexico City',
    callingCode: '+52',
    drivesOn: 'right',
    timezones: 'UTC−6 to −8',
  },
  BR: {
    population: 215_000_000,
    areaKm2: 8_515_767,
    currencyCode: 'BRL',
    currencyName: 'Brazilian real',
    languages: ['Portuguese'],
    capital: 'Brasília',
    callingCode: '+55',
    drivesOn: 'right',
    timezones: 'UTC−2 to −5',
  },
  ZA: {
    population: 62_000_000,
    areaKm2: 1_221_037,
    currencyCode: 'ZAR',
    currencyName: 'South African rand',
    languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English', '+7'],
    capital: 'Pretoria',
    callingCode: '+27',
    drivesOn: 'left',
    timezones: 'SAST (UTC+2)',
  },
  EG: {
    population: 113_000_000,
    areaKm2: 1_010_408,
    currencyCode: 'EGP',
    currencyName: 'Egyptian pound',
    languages: ['Arabic'],
    capital: 'Cairo',
    callingCode: '+20',
    drivesOn: 'right',
    timezones: 'EET (UTC+2)',
  },
  TH: {
    population: 71_700_000,
    areaKm2: 513_120,
    currencyCode: 'THB',
    currencyName: 'Thai baht',
    languages: ['Thai'],
    capital: 'Bangkok',
    callingCode: '+66',
    drivesOn: 'left',
    timezones: 'ICT (UTC+7)',
  },
  SG: {
    population: 6_000_000,
    areaKm2: 728,
    currencyCode: 'SGD',
    currencyName: 'Singapore dollar',
    languages: ['English', 'Malay', 'Mandarin', 'Tamil'],
    capital: 'Singapore',
    callingCode: '+65',
    drivesOn: 'left',
    timezones: 'SGT (UTC+8)',
  },
};

export function getCountryFacts(code?: string | null): CountryFacts | null {
  if (!code) return null;
  return COUNTRY_FACTS[code.toUpperCase()] ?? null;
}

export function flagEmoji(code?: string | null): string | null {
  if (!code || code.length !== 2) return null;
  const cc = code.toUpperCase();
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

/**
 * Flag image URL from flagpedia.net's CDN (flagcdn.com).
 * - PNG widths: 20, 40, 80, 160, 320, 640, 1280, 2560 (use the smallest that
 *   covers your render at 2× DPR).
 * - SVG when omitted, for crisp scaling.
 */
export function flagImageUrl(code?: string | null, widthPx?: 20 | 40 | 80 | 160 | 320 | 640 | 1280 | 2560): string | null {
  if (!code || code.length !== 2) return null;
  const cc = code.toLowerCase();
  return widthPx ? `https://flagcdn.com/w${widthPx}/${cc}.png` : `https://flagcdn.com/${cc}.svg`;
}

export function formatPopulation(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return m >= 100 ? `${m.toFixed(0)}M` : `${m.toFixed(1)}M`;
  }
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export function formatArea(km2: number): string {
  return `${km2.toLocaleString()} km²`;
}
