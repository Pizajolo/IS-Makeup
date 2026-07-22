// English is the source of truth for site copy. `Content` is derived from this
// object, so pt.ts and es.ts fail to compile if a key is missing or renamed.
// Headings carry inline <em> markup and are rendered with set:html.

import { faq, services } from './content-data';

const en = {
  htmlLang: 'en',
  meta: {
    title: 'Bridal Makeup Artist in Lisbon, Portugal | Destination Weddings — I.S Makeup',
    description:
      'Soft, luminous bridal makeup by Inés Santiago — professional wedding makeup artist in Lisbon, Portugal. Destination weddings in Sintra, Cascais, Comporta, the Algarve & Guadalajara, Mexico. Trial included.',
    ogTitle: 'Bridal Makeup Artist in Lisbon, Portugal | I.S Makeup',
    ogDescription:
      'Soft, luminous bridal makeup that lasts from first look to last dance. Weddings in Lisbon, Sintra, Comporta, the Algarve — and destination weddings in Mexico.',
    twitterTitle: 'Bridal Makeup Artist in Lisbon, Portugal | I.S Makeup',
    twitterDescription:
      'Soft, luminous bridal makeup that lasts from first look to last dance. Lisbon · Portugal · destination weddings worldwide.',
  },
  nav: {
    skipLink: 'Skip to content',
    brandAria: 'I.S Makeup — home',
    mainNavAria: 'Main navigation',
    langAria: 'Language',
    menuAria: 'Open menu',
    logoAlt: 'I.S Makeup logo',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    process: 'Process',
    journal: 'Journal',
    faq: 'FAQ',
    contact: 'Contact',
    bookCta: 'Check your date',
  },
  hero: {
    eyebrow: 'Bridal Makeup Artist · Lisbon, Portugal',
    heading: 'Quietly<br/>radiant.\n      <em>Bridal makeup in Lisbon, made to last.</em>',
    lede: "I'm Inés Santiago — a bridal makeup artist based in Lisbon, born in Guadalajara, Mexico. I create soft, luminous wedding looks that hold from the first look to the last dance — for brides marrying in Portugal, planning a destination wedding, or celebrating back home in Mexico.",
    ctaPrimary: 'Check your date',
    ctaSecondary: 'See the portfolio',
    stats: [
      { num: '10', label: 'Years of<br/>experience' },
      { num: '2', label: 'Home cities —<br/>Lisbon &amp; Guadalajara' },
      { num: '∞', label: 'Bridal &amp;<br/>editorial' },
    ],
    photoAlt:
      'Bride with soft, luminous bridal makeup by Inés Santiago, makeup artist in Lisbon, Portugal',
    stampTop: 'Bridal',
    stampMid: 'est. 2016',
    stampBottom: 'Portfolio',
  },
  marquee: [
    'Bridal',
    'Editorial',
    'Destination Weddings',
    'Lisbon',
    'Sintra',
    'Cascais',
    'Comporta',
    'Algarve',
    'Guadalajara',
    'Worldwide',
  ],
  about: {
    label: '01 — About',
    heading: 'A decade of <em>tender, lasting</em> bridal beauty.',
    aside:
      "Born in Guadalajara, at home in Lisbon — working across Portugal's wedding coast and beyond, from intimate Sintra ceremonies to destination weddings in the Algarve, Europe and Mexico.",
    photoAlt:
      'Inés Santiago applying wedding makeup to a bride on her wedding morning in Lisbon',
    intro:
      'Makeup, to me, is a quiet act of care. I start with the skin you already love and add only what makes it sing — a softer cheek, a steadier brow, eyes that hold tears and still photograph beautifully at midnight.',
    paragraphs: [
      "I grew up in Guadalajara, Mexico, and have called Lisbon home for the past ten years. In that decade I've done wedding makeup for brides from Porto to Puglia — alongside the photographers, planners and couture ateliers who trust me to be calm, prepared and unhurried. I bring a small, considered kit, a curated palette, and a steady hand.",
      'Above all, I want my brides to feel exactly like themselves — only on the most luminous day of their lives.',
    ],
    signatureName: 'Inés Santiago',
    signatureRole: 'Founder &amp; Artist · I.S Makeup · Lisbon',
  },
  services: services.en,
  portfolio: {
    label: '03 — Portfolio',
    heading: 'Recent <em>brides</em>.',
    aside:
      "A small selection from the last two seasons — real brides in Lisbon, Sintra and along Portugal's coast.",
    images: [
      {
        cls: 'p1',
        alt: 'Bridal makeup portrait — natural, glowing wedding look by I.S Makeup, Lisbon',
      },
      {
        cls: 'p2',
        alt: 'Close-up of soft bridal eye makeup with lashes, by Lisbon makeup artist Inés Santiago',
      },
      {
        cls: 'p3',
        alt: 'Detail of long-wear bridal lip makeup for a wedding in Portugal',
      },
      {
        cls: 'p4',
        alt: 'Wedding ceremony in Portugal — bride wearing makeup by I.S Makeup',
      },
      {
        cls: 'p5',
        alt: 'Behind the scenes — bridal makeup application on the wedding morning',
      },
    ],
    reelLabel: 'Bridal makeup video reel',
  },
  process: {
    label: '04 — Process',
    heading: 'From hello <em>to "I do"</em>.',
    aside: 'A simple, unhurried path — no surprises on the day.',
    steps: [
      {
        num: '01',
        title: 'Inquiry',
        body: 'Send your date, venue, and a few inspiration images. I reply within 48 hours with availability and a tailored quote.',
      },
      {
        num: '02',
        title: 'Consultation',
        body: 'A relaxed call — or a coffee in Lisbon — to talk through your vision, your dress, and the look you want for the day.',
      },
      {
        num: '03',
        title: 'Trial',
        body: 'A two‑hour session, usually six weeks before, to refine the look, test products on your skin, and photograph the result.',
      },
      {
        num: '04',
        title: 'The Day',
        body: 'On time, a calm room, and a finish that lasts from the morning light to the last song.',
      },
    ],
  },
  testimonial: {
    aria: 'Testimonial',
    quote:
      'Inés made me feel like myself, only softer and sun‑warmed. The makeup looked exactly the same in the morning light as it did at 1 a.m.',
    who: 'Mariana &amp; Tomás',
    whoDetail: '— Quinta do Torneiro, Sintra · 2025',
  },
  // Journal. `label` and `heading` render on the homepage teaser; `indexLabel`
  // and `indexHeading` on the journal index itself, which is a page in its own
  // right rather than a section of the one-pager.
  journal: {
    title: 'Journal',
    description:
      'Bridal makeup notes from Inés Santiago — how wedding makeup is built to last, what to bring to a trial, and what to expect on the morning itself.',
    metaTitle: 'Bridal Makeup Journal — Tips & Notes | I.S Makeup, Lisbon',

    label: '05 — Journal',
    heading: 'Notes from <em>the chair</em>.',
    aside: 'Practical bridal notes — what lasts, what to ask for, and what to expect on the day.',
    viewAll: 'All posts',
    readMore: 'Read',

    indexLabel: 'Journal',
    indexHeading: 'Notes from <em>the chair</em>.',
    indexAside:
      'Practical writing on bridal makeup — longevity, trials, timings and the small decisions that make the morning calm.',

    empty: 'The first post is on its way.',
    readingTime: 'min read',
    updatedLabel: 'Updated',
    tagsLabel: 'Tagged',
    breadcrumbHome: 'Home',
    backToJournal: 'All posts',

    paginationAria: 'Pagination',
    newer: 'Newer',
    older: 'Older',
    pageOf: 'Page {current} of {total}',

    prevPost: 'Previous',
    nextPost: 'Next',

    // Closing block on every post — the internal links back into the site.
    ctaHeading: 'Planning your wedding makeup?',
    ctaBody:
      'See what a bridal booking includes, or send me your date and venue and I’ll come back to you within 48 hours.',
    ctaServices: 'View services',
    ctaContact: 'Check your date',
  },
  faq: faq.en,
  cta: {
    label: "07 — Let's talk",
    heading: 'Tell me about<br/>your <em>day</em>.',
    body: "Peak wedding dates in Portugal book 9–12 months ahead — spring and September weekends go first. Send your date and venue and I'll reply within 48 hours with availability and a tailored quote. Weekday and off‑season rates available. I take a small number of weddings each year — let's see if yours is one of them.",
    emailKey: 'Email',
    phoneKey: 'Phone · WhatsApp',
    instagramKey: 'Instagram',
    studioKey: 'Studio',
    studioValue: 'Príncipe Real, Lisbon',
  },
  footer: {
    tagline:
      'I.S Makeup · Inés Santiago — bridal makeup artist in Lisbon, Portugal. Wedding &amp; destination wedding makeup in Lisbon, Sintra, Cascais, Comporta and the Algarve · Destination weddings across Europe and in Guadalajara, Mexico.',
    copyright: '© 2026 I.S Makeup · Inés Santiago',
    instagram: 'Instagram',
    reach: 'Lisbon · Guadalajara · Worldwide',
  },
  // JSON-LD values that read differently per locale. The FAQPage entity is
  // generated from faq.items above, so the visible FAQ and the structured data
  // can never drift apart.
  schema: {
    businessDescription:
      'Professional bridal and wedding makeup artist based in Lisbon, Portugal. Soft, luminous, long-wear bridal makeup for weddings and destination weddings across Portugal, Europe and Mexico.',
    jobTitle: 'Bridal Makeup Artist',
    birthPlace: 'Guadalajara, Jalisco, Mexico',
    homeLocation: 'Lisbon, Portugal',
    areaServed: [
      { type: 'City', name: 'Lisbon' },
      { type: 'City', name: 'Sintra' },
      { type: 'City', name: 'Cascais' },
      { type: 'City', name: 'Comporta' },
      { type: 'City', name: 'Porto' },
      { type: 'AdministrativeArea', name: 'Algarve' },
      { type: 'Country', name: 'Portugal' },
      { type: 'City', name: 'Guadalajara' },
      { type: 'AdministrativeArea', name: 'Jalisco' },
      { type: 'Country', name: 'Mexico' },
    ],
  },
};

export type Content = typeof en;
export default en;
