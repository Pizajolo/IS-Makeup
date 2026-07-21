import type { Content } from './en';

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
  services: {
    label: '02 — Servicios',
    heading: 'Servicios de maquillaje <em>de novia</em>.',
    aside:
      'Toda reserva de novia incluye una consulta sin costo y una prueba de maquillaje. Los viajes por Portugal y al extranjero se cotizan por separado.',
    items: [
      {
        num: 'N° 01 — Firma',
        title: 'Novia <em>Día de la Boda</em>',
        body: 'Una aplicación completa — preparación de piel, pestañas y un acabado de larga duración, a prueba de cámara, pensado para durar desde los preparativos de la mañana hasta el final de la fiesta. Incluye una prueba.',
        price: 'Desde 450 € · Prueba incluida',
        featured: true,
      },
      {
        num: 'N° 02',
        title: 'Mamás <em>&amp; Damas</em>',
        body: 'Looks coordinados para mamás, hermanas y damas de honor — más suaves, más ligeros, pensados para complementar a la novia sin competir con ella.',
        price: 'Desde 120 € / persona',
        featured: false,
      },
      {
        num: 'N° 03',
        title: 'Bodas <em>de Destino</em>',
        body: 'Servicio listo para viajar por todo Portugal — Sintra, Comporta, el Algarve — además de Europa y México. Acompañamiento de varios días, retoques en el lugar y una presencia discreta durante toda la celebración.',
        price: 'Con cotización · Todo el mundo',
        featured: false,
      },
      {
        num: 'N° 04',
        title: 'Editorial <em>&amp; Eventos</em>',
        body: 'Campañas, lookbooks y eventos para marcas y revistas — un resultado limpio, listo para cámara, aprobado por fotógrafos.',
        price: 'Desde 350 € / medio día',
        featured: false,
      },
      {
        num: 'N° 05',
        title: 'Clases <em>Personales</em>',
        body: 'Una sesión individual de dos horas en tu casa, con tus propios productos. Te quedas con una rutina diaria de cinco pasos que sí vas a usar.',
        price: '180 € · 2 horas',
        featured: false,
      },
      {
        num: 'N° 06',
        title: 'Ocasiones <em>Especiales</em>',
        body: 'Galas, XV años, graduaciones, aniversarios — aplicaciones únicas para los días que merecen un poco más.',
        price: 'Desde 140 €',
        featured: false,
      },
    ],
  },
  portfolio: {
    label: '03 — Portafolio',
    heading: 'Novias <em>recientes</em>.',
    aside:
      'Una pequeña selección de las últimas dos temporadas — novias reales en Lisboa, Sintra y la costa de Portugal.',
    images: [
      {
        cls: 'p1',
        src: '/assets/bride.jpg',
        alt: 'Retrato de novia con maquillaje natural y luminoso — I.S Makeup, Lisboa',
      },
      {
        cls: 'p2',
        src: '/assets/eyes.jpg',
        alt: 'Detalle de maquillaje de ojos suave con pestañas, por maquillista de novias',
      },
      {
        cls: 'p3',
        src: '/assets/imageBrideLips.jpg',
        alt: 'Detalle de labios de novia de larga duración para boda en Portugal',
      },
      {
        cls: 'p4',
        src: '/assets/wedding.jpg',
        alt: 'Ceremonia de boda en Portugal — novia maquillada por I.S Makeup',
      },
      {
        cls: 'p5',
        src: '/assets/behindTheScenes.jpg',
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
  faq: {
    label: '05 — Preguntas Frecuentes',
    heading: 'Preguntas, <em>respondidas</em>.',
    aside:
      'Todo lo que las novias suelen preguntar antes de apartar su fecha — en Portugal o en México.',
    items: [
      {
        q: '¿Cuánto cuesta el maquillaje de novia?',
        a: 'El maquillaje de novia para el día de la boda parte de 450 € e incluye una prueba completa, preparación de piel, pestañas y un acabado de larga duración. El maquillaje para mamás y damas parte de 120 € por persona. Los viajes fuera de Lisboa se cotizan por separado — sin costos escondidos.',
      },
      {
        q: '¿Haces bodas en Guadalajara y el resto de México?',
        a: 'Sí — Guadalajara es donde nací y donde aprendí a amar este oficio. Cada año aparto un pequeño número de fechas para bodas en Jalisco y el resto de México. Por el viaje que implica, conviene reservar estas fechas con bastante anticipación.',
      },
      {
        q: '¿Trabajas bodas de destino en Portugal y Europa?',
        a: 'Sí — Lisboa es mi base. Trabajo en todas las regiones de bodas de Portugal: Lisboa, Sintra, Cascais, Comporta y el Algarve, además de bodas de destino en otros países de Europa. Si sueñas con casarte en Portugal, estás en casa: conozco los venues, la luz y a los mejores proveedores.',
      },
      {
        q: '¿Con cuánta anticipación debo reservar?',
        a: 'Las reservas abren 12 meses antes, y las fechas pico — fines de semana de mayo a octubre en Portugal — suelen apartarse con 9 a 12 meses de anticipación. Entre semana y en temporada baja hay más flexibilidad, y las solicitudes de última hora siempre son bienvenidas: si estoy libre, soy tuya.',
      },
      {
        q: '¿La prueba está incluida — y cómo funciona?',
        a: 'Toda reserva de novia incluye una prueba: una sesión tranquila de dos horas, normalmente unas seis semanas antes de la boda, donde afinamos el look, probamos los productos en tu piel y fotografiamos el resultado con distintas luces — para que no haya sorpresas el gran día.',
      },
      {
        q: '¿El maquillaje de verdad dura todo el día — y aguanta las lágrimas?',
        a: 'Sí. Cada look se construye con productos de larga duración, a prueba de cámara, y técnicas de capas que aguantan desde los preparativos de la mañana hasta el first look, las lágrimas de la ceremonia y el último baile. Además recibes un pequeño kit de retoque para tener a la mano en la noche.',
      },
    ],
  },
  cta: {
    label: '06 — Platiquemos',
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
    offers: [
      {
        name: 'Maquillaje de novia — día de la boda',
        description:
          'Aplicación completa con preparación de piel, pestañas y acabado de larga duración. Incluye una prueba.',
        price: 450,
      },
      {
        name: 'Maquillaje para mamás y damas',
        description: 'Looks coordinados para mamás, hermanas y damas de honor.',
        price: 120,
      },
      {
        name: 'Bodas de destino',
        description:
          'Maquillaje de novia en todo Portugal, Europa y México, con acompañamiento de varios días y retoques en el lugar.',
        price: null,
      },
      {
        name: 'Editorial y eventos',
        description: 'Maquillaje para campañas, lookbooks y eventos de marcas y revistas.',
        price: 350,
      },
      {
        name: 'Clases personales de automaquillaje',
        description: 'Sesión individual de dos horas en tu casa, con tus propios productos.',
        price: 180,
      },
      {
        name: 'Ocasiones especiales',
        description: 'Aplicaciones únicas para galas, XV años, graduaciones y aniversarios.',
        price: 140,
      },
    ],
  },
};

export default es;
