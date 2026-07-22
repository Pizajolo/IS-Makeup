import { site, locales, type Locale } from './site';
import type { Content } from '../i18n/en';

export const businessId = `${site.url}/#business`;
export const personId = `${site.url}/#ines`;

export const absUrl = (path: string): string => new URL(path, site.url).href;

// Copy in the locale files carries HTML entities and inline markup for
// rendering. Structured data must be plain text, so strip both.
export const plain = (value: string): string =>
  value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

type Node = Record<string, unknown>;

export function businessNode(locale: Locale, content: Content, pageUrl: string): Node {
  return {
    '@type': 'BeautySalon',
    '@id': businessId,
    name: site.businessName,
    description: content.schema.businessDescription,
    // Each language declares its own page URL while sharing one @id, matching
    // what the hand-written pages did.
    url: pageUrl,
    image: absUrl(site.ogImage),
    logo: absUrl(site.logo),
    email: site.email,
    telephone: site.phone,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    address: {
      '@type': 'PostalAddress',
      ...site.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.instagram],
    founder: { '@id': personId },
    // Current locale first, as the hand-written pages had it.
    knowsLanguage: [locale, ...locales.filter((l) => l !== locale)],
    areaServed: content.schema.areaServed.map((area) => ({
      '@type': area.type,
      name: area.name,
    })),
    // Offers are derived from the visible service cards, so the price a bride
    // reads and the price in structured data come from one source and cannot
    // drift. name/description are the plain-text form of each card's title/body;
    // `amount` is the machine price, null for by-quote services (no price node).
    makesOffer: content.services.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: plain(item.title),
        description: plain(item.body),
      },
      ...(item.amount != null && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: item.amount,
          priceCurrency: site.currency,
          valueAddedTaxIncluded: true,
        },
      }),
    })),
  };
}

export function personNode(content: Content): Node {
  return {
    '@type': 'Person',
    '@id': personId,
    name: site.author,
    jobTitle: content.schema.jobTitle,
    birthPlace: { '@type': 'Place', name: content.schema.birthPlace },
    homeLocation: { '@type': 'Place', name: content.schema.homeLocation },
    worksFor: { '@id': businessId },
    sameAs: [site.instagram],
  };
}

export function faqNode(content: Content, pageUrl: string): Node {
  return {
    '@type': 'FAQPage',
    // Locale-scoped so the three language versions declare distinct FAQ pages
    // rather than three copies of one id.
    '@id': `${pageUrl}#faq`,
    inLanguage: content.htmlLang,
    mainEntity: content.faq.items.map((item) => ({
      '@type': 'Question',
      name: plain(item.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(item.a) },
    })),
  };
}

export function blogNode(content: Content, pageUrl: string, postUrls: string[]): Node {
  return {
    '@type': 'Blog',
    '@id': `${pageUrl}#blog`,
    url: pageUrl,
    name: plain(content.journal.title),
    description: content.journal.description,
    inLanguage: content.htmlLang,
    publisher: { '@id': businessId },
    blogPost: postUrls.map((url) => ({ '@id': `${url}#post` })),
  };
}

export function blogPostingNode(input: {
  content: Content;
  pageUrl: string;
  blogUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  tags: string[];
  location?: string;
  wordCount?: number;
}): Node {
  return {
    '@type': 'BlogPosting',
    '@id': `${input.pageUrl}#post`,
    mainEntityOfPage: input.pageUrl,
    url: input.pageUrl,
    headline: input.title,
    description: input.description,
    image: input.imageUrl,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: input.content.htmlLang,
    author: { '@id': personId },
    publisher: { '@id': businessId },
    isPartOf: { '@id': `${input.blogUrl}#blog` },
    ...(input.tags.length && { keywords: input.tags.join(', ') }),
    ...(input.wordCount && { wordCount: input.wordCount }),
    // Locations are content, not routes — a post written for a place says so
    // here instead of living on a separate location page template.
    ...(input.location && {
      contentLocation: { '@type': 'Place', name: input.location },
    }),
  };
}

export function breadcrumbNode(pageUrl: string, trail: { name: string; url: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// Built here rather than in the remark plugin because Google requires name,
// description, thumbnailUrl and uploadDate, and only the post knows those.
export function videoNode(input: {
  videoId: string;
  name: string;
  description: string;
  uploadDate: string;
  index: number;
  total: number;
}): Node {
  return {
    '@type': 'VideoObject',
    name: input.total > 1 ? `${input.name} (${input.index + 1})` : input.name,
    description: input.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${input.videoId}/maxresdefault.jpg`,
    uploadDate: input.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.videoId}`,
  };
}
