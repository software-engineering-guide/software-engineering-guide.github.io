// UI chrome strings (nav labels, breadcrumbs, picker labels, subtitles) for
// each locale this site publishes. Threaded through every locale-scoped
// route and +layout.svelte via ui(locale), per
// spec/locales-for-global-sharing-with-svelte/index.md's bug-fix note:
// "UI chrome was hardcoded English in the .svelte templates ... Fix: add
// i18n.js and threading ui(locale) through every locale-scoped route."
const EN = {
  siteName: 'Software Engineering Guide',
  skipToContent: 'Skip to main content',
  home: 'Home',
  startHere: 'Start here',
  tableOfContents: 'Table of contents',
  examples: 'Examples',
  contributing: 'Contributing',
  project: 'Project',
  github: 'GitHub',
  part: 'Part',
  chapter: 'Chapter',
  previous: 'Previous',
  next: 'Next',
  pickerTheme: 'Theme',
  pickerLocale: 'Language',
  pickerTextSize: 'Text size',
  pickerShare: 'Share',
  shareEmail: 'Email',
  shareCopyLink: 'Copy link',
  notTranslated: 'This chapter is not yet translated into this language. Showing the English original.',
  otherLanguages: 'Also available in',
  viewInEnglish: 'View in English'
};

/** @type {Record<string, Partial<typeof EN>>} */
const OVERRIDES = {
  'cy-001': {
    home: 'Hafan',
    startHere: 'Dechrau yma',
    tableOfContents: "Tabl cynnwys",
    examples: 'Enghreifftiau',
    contributing: 'Cyfrannu',
    project: 'Prosiect',
    part: 'Rhan',
    chapter: 'Pennod',
    previous: 'Blaenorol',
    next: 'Nesaf',
    pickerTheme: 'Thema',
    pickerLocale: 'Iaith',
    pickerTextSize: 'Maint testun',
    pickerShare: 'Rhannu',
    shareEmail: 'E-bost',
    shareCopyLink: "Copïo'r ddolen",
    notTranslated: "Nid yw'r bennod hon wedi'i chyfieithu i'r iaith hon eto. Yn dangos y gwreiddiol Saesneg.",
    otherLanguages: 'Ar gael hefyd yn',
    viewInEnglish: 'Gweld yn Saesneg'
  },
  'hi-001': {
    home: 'होम',
    startHere: 'यहाँ से शुरू करें',
    tableOfContents: 'विषय-सूची',
    examples: 'उदाहरण',
    contributing: 'योगदान',
    project: 'परियोजना',
    part: 'भाग',
    chapter: 'अध्याय',
    previous: 'पिछला',
    next: 'अगला',
    pickerTheme: 'थीम',
    pickerLocale: 'भाषा',
    pickerTextSize: 'पाठ का आकार',
    pickerShare: 'साझा करें',
    shareEmail: 'ईमेल',
    shareCopyLink: 'लिंक कॉपी करें',
    notTranslated: 'यह अध्याय अभी इस भाषा में अनुवादित नहीं है। अंग्रेज़ी मूल दिखाया जा रहा है।',
    otherLanguages: 'इन भाषाओं में भी उपलब्ध',
    viewInEnglish: 'अंग्रेज़ी में देखें'
  },
  'zh-cn': {
    home: '首页',
    startHere: '从这里开始',
    tableOfContents: '目录',
    examples: '示例',
    contributing: '贡献',
    project: '项目',
    part: '部分',
    chapter: '章节',
    previous: '上一章',
    next: '下一章',
    pickerTheme: '主题',
    pickerLocale: '语言',
    pickerTextSize: '文字大小',
    pickerShare: '分享',
    shareEmail: '邮件',
    shareCopyLink: '复制链接',
    notTranslated: '本章尚未翻译成该语言，正在显示英文原文。',
    otherLanguages: '其他语言版本',
    viewInEnglish: '查看英文版'
  },
  'es-001': {
    home: 'Inicio',
    startHere: 'Empieza aquí',
    tableOfContents: 'Índice',
    examples: 'Ejemplos',
    contributing: 'Contribuir',
    project: 'Proyecto',
    part: 'Parte',
    chapter: 'Capítulo',
    previous: 'Anterior',
    next: 'Siguiente',
    pickerTheme: 'Tema',
    pickerLocale: 'Idioma',
    pickerTextSize: 'Tamaño del texto',
    pickerShare: 'Compartir',
    shareEmail: 'Correo',
    shareCopyLink: 'Copiar enlace',
    notTranslated: 'Este capítulo todavía no está traducido a este idioma. Mostrando el original en inglés.',
    otherLanguages: 'También disponible en',
    viewInEnglish: 'Ver en inglés'
  }
};

/** @param {string} locale */
export function ui(locale) {
  return { ...EN, ...(OVERRIDES[locale] ?? {}) };
}

export const DEFAULT_UI = EN;

// Part titles, matching spec/structure.md / tests/validate.py PART_TITLES
// in the content repo (English) and scripts/generate-manifest.mjs's copy
// of the same dict. Locales without a translated set here fall back to
// English part titles in the generated manifest.
export const EN_PART_TITLES = {
  1: 'People',
  2: 'Software Programming',
  3: 'Systems',
  4: 'Security',
  5: 'UI/UX Design',
  6: 'Artificial Intelligence',
  7: 'Data, Analytics, and Insight',
  8: 'Automation',
  9: 'Operations, Reliability, and Observability',
  10: 'Project/Product/Programme Management',
  11: 'Flow: Discovery and Delivery Pipelines',
  12: 'Appendices'
};

/** @type {Record<string, Record<number, string>>} */
export const PART_TITLE_OVERRIDES = {
  'cy-001': {
    1: 'Pobl',
    2: 'Rhaglennu Meddalwedd',
    3: 'Systemau',
    4: 'Diogelwch',
    5: 'Dylunio UI/UX',
    6: 'Deallusrwydd Artiffisial',
    7: 'Data, Dadansoddeg, a Mewnwelediad',
    8: 'Awtomeiddio',
    9: 'Gweithrediadau, Dibynadwyedd, ac Arsylladwyedd',
    10: 'Rheoli Prosiectau/Cynhyrchion/Rhaglenni',
    11: "Llif: Piblinellau Darganfod a Danfon",
    12: 'Atodiadau'
  },
  'hi-001': {
    1: 'लोग',
    2: 'सॉफ़्टवेयर प्रोग्रामिंग',
    3: 'प्रणालियाँ',
    4: 'सुरक्षा',
    5: 'यूआई/यूएक्स डिज़ाइन',
    6: 'कृत्रिम बुद्धिमत्ता',
    7: 'डेटा, एनालिटिक्स, और अंतर्दृष्टि',
    8: 'स्वचालन',
    9: 'संचालन, विश्वसनीयता, और ऑब्ज़र्वेबिलिटी',
    10: 'प्रोजेक्ट/प्रोडक्ट/प्रोग्राम प्रबंधन',
    11: 'फ़्लो: खोज और डिलीवरी पाइपलाइन',
    12: 'परिशिष्ट'
  },
  'zh-cn': {
    1: '人',
    2: '软件编程',
    3: '系统',
    4: '安全',
    5: 'UI/UX设计',
    6: '人工智能',
    7: '数据、分析与洞察',
    8: '自动化',
    9: '运维、可靠性与可观测性',
    10: '项目/产品/项目集管理',
    11: '流动：发现与交付流水线',
    12: '附录'
  },
  'es-001': {
    1: 'Personas',
    2: 'Programación de Software',
    3: 'Sistemas',
    4: 'Seguridad',
    5: 'Diseño UI/UX',
    6: 'Inteligencia Artificial',
    7: 'Datos, Analítica y Perspectivas',
    8: 'Automatización',
    9: 'Operaciones, Fiabilidad y Observabilidad',
    10: 'Gestión de Proyectos/Productos/Programas',
    11: 'Flujo: Canales de Descubrimiento y Entrega',
    12: 'Apéndices'
  }
};

/** @param {string} locale */
export function partTitles(locale) {
  return { ...EN_PART_TITLES, ...(PART_TITLE_OVERRIDES[locale] ?? {}) };
}
