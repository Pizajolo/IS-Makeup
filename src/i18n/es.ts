import type { Content } from './en';
import { faq, services } from './content-data';

// Spanish is market-adapted rather than a literal translation: it leads with
// Guadalajara, reorders the FAQ to put Mexico second, and swaps in local
// occasions (XV años, graduaciones). Keep that intent when editing.
const es: Content = {
  htmlLang: 'es',
  meta: {
    title: 'Maquillaje de Novia — Lisboa, Portugal y Guadalajara, México | I.S Makeup',
    description:
      'Maquillaje de novia suave y luminoso por Inés Santiago, maquillista tapatía radicada en Lisboa, Portugal. Bodas de destino en Lisboa, Sintra y el Algarve — y bodas en Guadalajara, Jalisco. Prueba incluida.',
    ogTitle: 'Maquillaje de Novia — Lisboa y Guadalajara | I.S Makeup',
    ogDescription:
      'Maquillaje de novia suave y luminoso que dura del first look al último baile. Bodas de destino en Portugal y Europa — y bodas en Guadalajara, México.',
    twitterTitle: 'Maquillaje de Novia — Lisboa y Guadalajara | I.S Makeup',
    twitterDescription:
      'Maquillista de novias radicada en Lisboa y nacida en Guadalajara. Bodas de destino en Portugal, Europa y México.',
  },
  nav: {
    skipLink: 'Saltar al contenido',
    brandAria: 'I.S Makeup — inicio',
    mainNavAria: 'Navegación principal',
    langAria: 'Idioma',
    menuAria: 'Abrir menú',
    logoAlt: 'Logotipo I.S Makeup',
    about: 'Sobre mí',
    services: 'Servicios',
    portfolio: 'Portafolio',
    process: 'Proceso',
    journal: 'Diario',
    faq: 'FAQ',
    contact: 'Contacto',
    bookCta: 'Aparta tu fecha',
  },
  hero: {
    eyebrow: 'Maquillista de Novias · Lisboa · Guadalajara',
    heading:
      'Serenamente<br/>radiante.\n      <em>Maquillaje de novia hecho para durar.</em>',
    lede: 'Soy Inés Santiago — maquillista de novias radicada en Lisboa, Portugal, y nacida en Guadalajara, México. Creo maquillajes de novia suaves y luminosos que duran del first look al último baile — para bodas en Portugal, bodas de destino en Europa, y unas cuantas fechas al año en México.',
    ctaPrimary: 'Aparta tu fecha',
    ctaSecondary: 'Ver portafolio',
    stats: [
      { num: '10', label: 'Años de<br/>experiencia' },
      { num: '2', label: 'Ciudades — Lisboa<br/>&amp; Guadalajara' },
      { num: '∞', label: 'Novias &amp;<br/>editorial' },
    ],
    photoAlt:
      'Novia con maquillaje suave y luminoso por Inés Santiago, maquillista de novias en Lisboa y Guadalajara',
    stampTop: 'Novias',
    stampMid: 'desde 2016',
    stampBottom: 'Portafolio',
  },
  marquee: [
    'Novias',
    'Editorial',
    'Bodas de Destino',
    'Lisboa',
    'Sintra',
    'Cascais',
    'Comporta',
    'Algarve',
    'Guadalajara',
    'Todo el Mundo',
  ],
  about: {
    label: '01 — Sobre mí',
    heading: 'Una década de belleza nupcial <em>tierna y duradera</em>.',
    aside:
      'Tapatía de nacimiento, lisboeta de corazón — trabajando por toda la costa de bodas de Portugal y más allá, de ceremonias íntimas en Sintra a bodas de destino en el Algarve, Europa y México.',
    photoAlt: 'Inés Santiago maquillando a una novia la mañana de su boda en Lisboa',
    intro:
      'Para mí, el maquillaje es un acto sereno de cuidado. Empiezo con la piel que ya amas y añado solo lo que la hace cantar — una mejilla más suave, una ceja más firme, ojos que aguantan las lágrimas y siguen fotografiándose hermosos a medianoche.',
    paragraphs: [
      'Crecí en Guadalajara, México, y Lisboa ha sido mi casa los últimos diez años. En esta década he maquillado novias de Oporto a Puglia — junto a los fotógrafos, wedding planners y ateliers de alta costura que confían en mí para llegar tranquila, preparada y sin prisas. Llevo un kit pequeño y pensado, una paleta curada y una mano firme.',
      'Sobre todo, quiero que mis novias se sientan exactamente ellas mismas — en el día más luminoso de sus vidas.',
    ],
    signatureName: 'Inés Santiago',
    signatureRole: 'Fundadora &amp; Maquillista · I.S Makeup · Lisboa',
  },
  services: services.es,
  portfolio: {
    label: '03 — Portafolio',
    heading: 'Novias <em>recientes</em>.',
    aside:
      'Una pequeña selección de las últimas dos temporadas — novias reales en Lisboa, Sintra y la costa de Portugal.',
    images: [
      {
        cls: 'p1',
        alt: 'Retrato de novia con maquillaje natural y luminoso — I.S Makeup, Lisboa',
      },
      {
        cls: 'p2',
        alt: 'Detalle de maquillaje de ojos suave con pestañas, por maquillista de novias',
      },
      {
        cls: 'p3',
        alt: 'Detalle de labios de novia de larga duración para boda en Portugal',
      },
      {
        cls: 'p4',
        alt: 'Ceremonia de boda en Portugal — novia maquillada por I.S Makeup',
      },
      {
        cls: 'p5',
        alt: 'Detrás de cámaras — aplicación de maquillaje de novia la mañana de la boda',
      },
    ],
    reelLabel: 'Video de maquillaje de novia',
  },
  process: {
    label: '04 — Proceso',
    heading: 'Del hola <em>al «sí, acepto»</em>.',
    aside: 'Un camino simple y sin prisas — sin sorpresas el gran día.',
    steps: [
      {
        num: '01',
        title: 'Solicitud',
        body: 'Envíame tu fecha, el lugar y algunas imágenes de inspiración. Respondo en 48 horas con disponibilidad y una cotización a tu medida.',
      },
      {
        num: '02',
        title: 'Plática',
        body: 'Una llamada tranquila — o un café en Lisboa — para hablar de tu visión, tu vestido y el look que imaginas para ese día.',
      },
      {
        num: '03',
        title: 'Prueba',
        body: 'Una sesión de dos horas, normalmente seis semanas antes, para afinar el look, probar los productos en tu piel y fotografiar el resultado.',
      },
      {
        num: '04',
        title: 'El Gran Día',
        body: 'Puntualidad, un ambiente en calma y un acabado que dura de la luz de la mañana a la última canción.',
      },
    ],
  },
  testimonial: {
    aria: 'Testimonio',
    quote:
      'Inés me hizo sentir yo misma, solo que más suave y besada por el sol. El maquillaje se veía exactamente igual con la luz de la mañana que a la una de la madrugada.',
    who: 'Mariana &amp; Tomás',
    whoDetail: '— Quinta do Torneiro, Sintra · 2025',
  },
  journal: {
    title: 'Diario',
    description:
      'Notas sobre maquillaje de novia por Inés Santiago — cómo se construye un maquillaje que dura, qué llevar a la prueba y qué esperar la mañana de la boda.',
    metaTitle: 'Diario de Maquillaje de Novia — Consejos y Notas | I.S Makeup, Lisboa',

    label: '05 — Diario',
    heading: 'Notas desde <em>la silla</em>.',
    aside: 'Notas prácticas sobre maquillaje de novia — qué dura, qué pedir y qué esperar el día de la boda.',
    viewAll: 'Todas las notas',
    readMore: 'Leer',

    indexLabel: 'Diario',
    indexHeading: 'Notas desde <em>la silla</em>.',
    indexAside:
      'Escritura práctica sobre maquillaje de novia — duración, pruebas, tiempos y las pequeñas decisiones que hacen que la mañana sea tranquila.',

    empty: 'La primera nota viene en camino.',
    readingTime: 'min de lectura',
    updatedLabel: 'Actualizado',
    tagsLabel: 'Etiquetas',
    breadcrumbHome: 'Inicio',
    backToJournal: 'Todas las notas',

    paginationAria: 'Paginación',
    newer: 'Más recientes',
    older: 'Más antiguas',
    pageOf: 'Página {current} de {total}',

    prevPost: 'Anterior',
    nextPost: 'Siguiente',

    ctaHeading: '¿Estás planeando el maquillaje de tu boda?',
    ctaBody:
      'Mira qué incluye una reserva de novia, o mándame tu fecha y lugar y te respondo en 48 horas.',
    ctaServices: 'Ver servicios',
    ctaContact: 'Aparta tu fecha',
  },
  faq: faq.es,
  cta: {
    label: '07 — Platiquemos',
    heading: 'Cuéntame de tu<br/><em>gran día</em>.',
    body: 'Las fechas pico en Portugal se apartan con 9–12 meses de anticipación — los fines de semana de primavera y septiembre se van primero. Envíame tu fecha y el lugar y te respondo en 48 horas con disponibilidad y una cotización a tu medida. Hay tarifas entre semana y de temporada baja. Tomo un número reducido de bodas al año — veamos si la tuya es una de ellas.',
    emailKey: 'Email',
    phoneKey: 'Teléfono · WhatsApp',
    instagramKey: 'Instagram',
    studioKey: 'Estudio',
    studioValue: 'Príncipe Real, Lisboa',
  },
  footer: {
    tagline:
      'I.S Makeup · Inés Santiago — maquillista de novias en Lisboa, Portugal. Maquillaje de novia y de boda en Lisboa, Sintra, Cascais, Comporta y el Algarve · Bodas de destino en Europa y en Guadalajara, Jalisco, México.',
    copyright: '© 2026 I.S Makeup · Inés Santiago',
    instagram: 'Instagram',
    reach: 'Lisboa · Guadalajara · Todo el Mundo',
  },
  schema: {
    businessDescription:
      'Maquillista profesional de novias radicada en Lisboa, Portugal, y originaria de Guadalajara, México. Maquillaje de novia suave, luminoso y de larga duración para bodas y bodas de destino en Portugal, Europa y México.',
    jobTitle: 'Maquillista de Novias',
    birthPlace: 'Guadalajara, Jalisco, México',
    homeLocation: 'Lisboa, Portugal',
    areaServed: [
      { type: 'City', name: 'Lisboa' },
      { type: 'City', name: 'Sintra' },
      { type: 'City', name: 'Cascais' },
      { type: 'City', name: 'Comporta' },
      { type: 'AdministrativeArea', name: 'Algarve' },
      { type: 'Country', name: 'Portugal' },
      { type: 'City', name: 'Guadalajara' },
      { type: 'AdministrativeArea', name: 'Jalisco' },
      { type: 'Country', name: 'México' },
    ],
  },
};

export default es;
