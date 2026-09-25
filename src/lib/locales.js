// Locale labels, one entry per code, each written in that language (its own
// endonym), per spec/locales-for-global-sharing-with-svelte/index.md
// ("Labels live in locales.js's LOCALE_LABELS ... Falls back to the raw
// code via localeLabel() if a code has no label yet"). This list only needs
// to cover locales the book repo actually publishes under locales/<code>/.
/** @type {Record<string, string>} */
export const LOCALE_LABELS = {
  'en-001': 'English',
  'en-gb': 'English - Great Britain',
  'en-us': 'English - United States',
  'cy-001': 'Cymraeg',
  'hi-001': 'हिन्दी',
  'zh-cn': '中文 - 简体',
  'es-001': 'Español'
};

/** @param {string} code */
export function localeLabel(code) {
  return LOCALE_LABELS[code] ?? code;
}

/** Right-to-left locale codes among the ones this site publishes. Currently none. */
export const RTL_LOCALES = new Set();

/**
 * @param {string} code
 * @returns {'ltr' | 'rtl'}
 */
export function localeDir(code) {
  return RTL_LOCALES.has(code) ? 'rtl' : 'ltr';
}

/**
 * BCP 47-ish language tag for the `lang` attribute. The book's locale codes
 * are already close to BCP 47 (`cy-001`/`hi-001`/`es-001` are CLDR "worldwide"
 * region codes, not real BCP 47 regions), so strip the synthetic `-001` and
 * lowercase-region codes like `zh-cn` to the conventional `zh-CN` casing.
 * @param {string} code
 */
export function langAttr(code) {
  if (code.endsWith('-001')) return code.slice(0, -4);
  const [lang, region] = code.split('-');
  return region ? `${lang}-${region.toUpperCase()}` : lang;
}
