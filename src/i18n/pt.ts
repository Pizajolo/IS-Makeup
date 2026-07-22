import type { Content } from './en';
import { faq, services } from './content-data';

const pt: Content = {
  htmlLang: 'pt',
  meta: {
    title: 'Maquilhagem de Noiva em Lisboa | Maquilhadora Profissional — I.S Makeup',
    description:
      'Maquilhagem de noiva suave e luminosa por Inés Santiago, maquilhadora profissional em Lisboa. Casamentos em Sintra, Cascais, Comporta e no Algarve — e casamentos de destino em Portugal e no México. Prova incluída.',
    ogTitle: 'Maquilhagem de Noiva em Lisboa | I.S Makeup',
    ogDescription:
      'Maquilhagem de noiva suave e luminosa, que dura do first look à última dança. Casamentos em Lisboa, Sintra, Comporta, Algarve — e casamentos de destino.',
    twitterTitle: 'Maquilhagem de Noiva em Lisboa | I.S Makeup',
    twitterDescription:
      'Maquilhagem de noiva suave e luminosa em Lisboa, Sintra, Comporta e Algarve — por Inés Santiago.',
  },
  nav: {
    skipLink: 'Saltar para o conteúdo',
    brandAria: 'I.S Makeup — início',
    mainNavAria: 'Navegação principal',
    langAria: 'Idioma',
    menuAria: 'Abrir menu',
    logoAlt: 'Logótipo I.S Makeup',
    about: 'Sobre',
    services: 'Serviços',
    portfolio: 'Portfólio',
    process: 'Processo',
    journal: 'Diário',
    faq: 'FAQ',
    contact: 'Contacto',
    bookCta: 'Marcar data',
  },
  hero: {
    eyebrow: 'Maquilhadora de Noivas · Lisboa, Portugal',
    heading:
      'Serenamente<br/>radiante.\n      <em>Maquilhagem de noiva em Lisboa, feita para durar.</em>',
    lede: 'Sou a Inés Santiago — maquilhadora de noivas em Lisboa, nascida em Guadalajara, no México. Crio maquilhagens de noiva suaves e luminosas, que duram do first look à última dança — para noivas que casam em Portugal, sonham com um casamento de destino, ou celebram no México.',
    ctaPrimary: 'Verificar disponibilidade',
    ctaSecondary: 'Ver portfólio',
    stats: [
      { num: '10', label: 'Anos de<br/>experiência' },
      { num: '2', label: 'Cidades — Lisboa<br/>&amp; Guadalajara' },
      { num: '∞', label: 'Noivas &amp;<br/>editorial' },
    ],
    photoAlt:
      'Noiva com maquilhagem suave e luminosa por Inés Santiago, maquilhadora de noivas em Lisboa',
    stampTop: 'Noivas',
    stampMid: 'desde 2016',
    stampBottom: 'Portfólio',
  },
  marquee: [
    'Noivas',
    'Editorial',
    'Casamentos de Destino',
    'Lisboa',
    'Sintra',
    'Cascais',
    'Comporta',
    'Algarve',
    'Guadalajara',
    'Todo o Mundo',
  ],
  about: {
    label: '01 — Sobre',
    heading: 'Uma década de beleza nupcial <em>terna e duradoura</em>.',
    aside:
      'Nascida em Guadalajara, de coração em Lisboa — a trabalhar por toda a costa dos casamentos de Portugal e mais além, de cerimónias íntimas em Sintra a casamentos de destino no Algarve, na Europa e no México.',
    photoAlt: 'Inés Santiago a maquilhar uma noiva na manhã do casamento, em Lisboa',
    intro:
      'Para mim, a maquilhagem é um gesto sereno de cuidado. Começo com a pele que já ama e acrescento apenas o que a faz cantar — uma face mais suave, uma sobrancelha mais firme, olhos que aguentam as lágrimas e continuam a fotografar lindamente à meia-noite.',
    paragraphs: [
      'Cresci em Guadalajara, no México, e Lisboa é a minha casa há dez anos. Nesta década maquilhei noivas do Porto a Puglia — ao lado de fotógrafos, wedding planners e ateliês de alta-costura que confiam em mim para ser calma, preparada e sem pressas. Levo um kit pequeno e pensado, uma paleta escolhida a dedo e uma mão firme.',
      'Acima de tudo, quero que as minhas noivas se sintam exatamente elas mesmas — no dia mais luminoso das suas vidas.',
    ],
    signatureName: 'Inés Santiago',
    signatureRole: 'Fundadora &amp; Maquilhadora · I.S Makeup · Lisboa',
  },
  services: services.pt,
  portfolio: {
    label: '03 — Portfólio',
    heading: 'Noivas <em>recentes</em>.',
    aside:
      'Uma pequena seleção das últimas duas épocas — noivas reais em Lisboa, Sintra e pela costa de Portugal.',
    images: [
      {
        cls: 'p1',
        alt: 'Retrato de noiva com maquilhagem natural e luminosa — I.S Makeup, Lisboa',
      },
      {
        cls: 'p2',
        alt: 'Pormenor de maquilhagem de olhos suave com pestanas, por maquilhadora em Lisboa',
      },
      {
        cls: 'p3',
        alt: 'Pormenor de batom de noiva de longa duração para casamento em Portugal',
      },
      {
        cls: 'p4',
        alt: 'Cerimónia de casamento em Portugal — noiva maquilhada pela I.S Makeup',
      },
      {
        cls: 'p5',
        alt: 'Bastidores — aplicação de maquilhagem de noiva na manhã do casamento',
      },
    ],
    reelLabel: 'Vídeo de maquilhagem de noiva',
  },
  process: {
    label: '04 — Processo',
    heading: 'Do olá <em>ao «sim»</em>.',
    aside: 'Um caminho simples e sem pressas — sem surpresas no grande dia.',
    steps: [
      {
        num: '01',
        title: 'Pedido',
        body: 'Envie a sua data, o local e algumas imagens de inspiração. Respondo em 48 horas com disponibilidade e um orçamento à medida.',
      },
      {
        num: '02',
        title: 'Conversa',
        body: 'Uma chamada tranquila — ou um café em Lisboa — para falarmos da sua visão, do vestido e do look que imagina para o dia.',
      },
      {
        num: '03',
        title: 'Prova',
        body: 'Uma sessão de duas horas, normalmente seis semanas antes, para afinar o look, testar os produtos na sua pele e fotografar o resultado.',
      },
      {
        num: '04',
        title: 'O Grande Dia',
        body: 'Pontualidade, um ambiente calmo e um acabamento que dura da luz da manhã à última música.',
      },
    ],
  },
  testimonial: {
    aria: 'Testemunho',
    quote:
      'A Inés fez-me sentir eu mesma, só que mais suave e beijada pelo sol. A maquilhagem estava exatamente igual à luz da manhã e à uma da madrugada.',
    who: 'Mariana &amp; Tomás',
    whoDetail: '— Quinta do Torneiro, Sintra · 2025',
  },
  journal: {
    title: 'Diário',
    description:
      'Notas sobre maquilhagem de noiva por Inés Santiago — como se constrói uma maquilhagem que dura, o que levar à prova e o que esperar na manhã do casamento.',
    metaTitle: 'Diário de Maquilhagem de Noiva — Dicas e Notas | I.S Makeup, Lisboa',

    label: '05 — Diário',
    heading: 'Notas da <em>cadeira</em>.',
    aside: 'Notas práticas sobre maquilhagem de noiva — o que dura, o que pedir e o que esperar no dia.',
    viewAll: 'Todos os artigos',
    readMore: 'Ler',

    indexLabel: 'Diário',
    indexHeading: 'Notas da <em>cadeira</em>.',
    indexAside:
      'Escrita prática sobre maquilhagem de noiva — duração, provas, horários e as pequenas decisões que tornam a manhã calma.',

    empty: 'O primeiro artigo está a caminho.',
    readingTime: 'min de leitura',
    updatedLabel: 'Atualizado',
    tagsLabel: 'Etiquetas',
    breadcrumbHome: 'Início',
    backToJournal: 'Todos os artigos',

    paginationAria: 'Paginação',
    newer: 'Mais recentes',
    older: 'Mais antigos',
    pageOf: 'Página {current} de {total}',

    prevPost: 'Anterior',
    nextPost: 'Seguinte',

    ctaHeading: 'A planear a maquilhagem do seu casamento?',
    ctaBody:
      'Veja o que inclui uma marcação de noiva, ou envie-me a sua data e local e respondo em 48 horas.',
    ctaServices: 'Ver serviços',
    ctaContact: 'Marcar data',
  },
  faq: faq.pt,
  cta: {
    label: '07 — Vamos falar',
    heading: 'Fale-me do seu<br/><em>grande dia</em>.',
    body: 'As datas de pico em Portugal reservam-se com 9–12 meses de antecedência — os fins de semana da primavera e de setembro vão primeiro. Envie a sua data e o local e respondo em 48 horas com disponibilidade e um orçamento à medida. Tarifas para dias de semana e época baixa disponíveis. Aceito um número reduzido de casamentos por ano — vamos ver se o seu é um deles.',
    emailKey: 'Email',
    phoneKey: 'Telefone · WhatsApp',
    instagramKey: 'Instagram',
    studioKey: 'Estúdio',
    studioValue: 'Príncipe Real, Lisboa',
  },
  footer: {
    tagline:
      'I.S Makeup · Inés Santiago — maquilhadora de noivas em Lisboa, Portugal. Maquilhagem de noiva e de casamento em Lisboa, Sintra, Cascais, Comporta e no Algarve · Casamentos de destino na Europa e em Guadalajara, México.',
    copyright: '© 2026 I.S Makeup · Inés Santiago',
    instagram: 'Instagram',
    reach: 'Lisboa · Guadalajara · Todo o Mundo',
  },
  schema: {
    businessDescription:
      'Maquilhadora profissional de noivas em Lisboa, Portugal. Maquilhagem de noiva suave, luminosa e de longa duração para casamentos e casamentos de destino em Portugal, na Europa e no México.',
    jobTitle: 'Maquilhadora de Noivas',
    birthPlace: 'Guadalajara, Jalisco, México',
    homeLocation: 'Lisboa, Portugal',
    areaServed: [
      { type: 'City', name: 'Lisboa' },
      { type: 'City', name: 'Sintra' },
      { type: 'City', name: 'Cascais' },
      { type: 'City', name: 'Comporta' },
      { type: 'City', name: 'Porto' },
      { type: 'AdministrativeArea', name: 'Algarve' },
      { type: 'Country', name: 'Portugal' },
      { type: 'City', name: 'Guadalajara' },
      { type: 'Country', name: 'México' },
    ],
  },
};

export default pt;
