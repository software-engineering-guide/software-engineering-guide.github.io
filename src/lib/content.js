import manifest from '$lib/manifest.json';

/**
 * Every locale this site publishes, sorted by code. This is the order the
 * header PickerBar's LocalePicker shows its listbox in — the `-001`
 * suffix happens to sort before any letter-starting regional suffix, so
 * variants (e.g. `en-001`) already come first within their language group
 * here (see spec/locales-for-global-sharing-with-svelte/index.md). The
 * home page's own locale list sorts differently (default locale first,
 * then grouped by language); see +page.server.js for that.
 */
export function locales() {
  return [...manifest.availableLocales].sort();
}

/** @param {string} decimal e.g. "1.2" */
export function chapterByDecimal(decimal) {
  return manifest.chaptersByDecimal[decimal] ?? null;
}

/**
 * @param {string} locale
 * @param {string} decimal
 */
export function localeChapterByDecimal(locale, decimal) {
  return manifest.locales[locale]?.chaptersByDecimal?.[decimal] ?? null;
}
