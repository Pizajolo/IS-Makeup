// Values that are identical across all three languages. Anything that reads
// differently per locale lives in src/i18n/<locale>.ts instead.

export const site = {
  url: 'https://ismakeup.pt',
  businessName: 'I.S Makeup — Inés Santiago',
  brandName: 'I.S Makeup',
  author: 'Inés Santiago',
  themeColor: '#FAF6F1',

  email: 'hello@ismakeup.pt',
  // TODO: placeholder — must be replaced before launch (see IMPLEMENTATION-PLAN.md)
  phone: '+351900000000',
  phoneDisplay: '+351 900 000 000',
  whatsapp: 'https://wa.me/351900000000',
  instagram: 'https://www.instagram.com/inessantiago_makeup',
  instagramHandle: '@inessantiago_makeup',
  mapsUrl: 'https://maps.google.com/?q=Pr%C3%ADncipe+Real,+Lisboa',

  ogImage: '/assets/imageBride1.jpg',
  ogImageWidth: 1080,
  ogImageHeight: 1440,
  logo: '/assets/logo.jpg',

  geo: {
    region: 'PT-11',
    placename: 'Lisbon, Portugal',
    lat: 38.7169,
    lng: -9.1399,
  },

  address: {
    streetAddress: 'Príncipe Real',
    addressLocality: 'Lisboa',
    addressRegion: 'Lisboa',
    addressCountry: 'PT',
  },

  priceRange: '€€',
  currency: 'EUR',
  foundingYear: 2016,
} as const;

export const locales = ['en', 'pt', 'es'] as const;
export type Locale = (typeof locales)[number];

// Path each locale is served from. English sits at the root.
export const localePath: Record<Locale, string> = {
  en: '/',
  pt: '/pt/',
  es: '/es/',
};

export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_PT',
  es: 'es_MX',
};

// Endonyms — each language named in its own language, so these read the same
// whichever page they appear on.
export const languageName: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
};

export const fontsHref =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=Italiana&family=DM+Mono:wght@400;500&display=swap';
