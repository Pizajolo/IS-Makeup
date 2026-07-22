// Shapes for the two homepage sections Inés edits through the CMS. The data
// itself lives in src/data/{faq,services}.json (so Sveltia can write it); these
// interfaces type it, and en.ts/pt.ts/es.ts pull their slice from content-data.ts.

import type { Locale } from '../data/site';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSection {
  label: string;
  heading: string;
  aside: string;
  items: FaqItem[];
}

export interface ServiceItem {
  num: string;
  title: string;
  body: string;
  /** Free-form price shown on the card, e.g. "From €450 · Trial included". */
  price: string;
  /**
   * Machine price for the Offer schema, entered in the same card as `price` so
   * the two cannot drift. null/omitted for "by quote" services, which emit no
   * priceSpecification. Optional so an emptied field in the CMS degrades to
   * "no structured price" rather than breaking the build on save.
   */
  amount?: number | null;
  featured: boolean;
}

export interface ServicesSection {
  label: string;
  heading: string;
  aside: string;
  items: ServiceItem[];
}

// The CMS stores all three languages in one file (Sveltia single_file i18n), so
// each data file is keyed by locale.
export type LocalizedFaq = Record<Locale, FaqSection>;
export type LocalizedServices = Record<Locale, ServicesSection>;
