import manifest from '$lib/manifest.json';
import { localeLabel } from '$lib/locales.js';

export const prerender = true;

// The English content at the un-prefixed /chapters/... routes is sourced
// from locales/en-us/ (see scripts/sync-content.mjs), so en-us is the
// default locale for the home page's language list: it sorts first, and
// its entry points at "/" rather than "/locales/en-us/".
const DEFAULT_LOCALE = 'en-us';

/**
 * Sorts the locale list per
 * spec/locales-for-global-sharing-with-svelte/index.md: default locale
 * first, then grouped by language name (the label text before a "(" or
 * a " - " separator, e.g. "Français (Monde)" or "English - Great
 * Britain" both group under "Français" / "English"), with the -001/world
 * variant before its regional siblings within each group, then
 * alphabetically by label. This does not fall out of a plain
 * alphabetical-by-label sort (e.g. "España" < "Mundo").
 * @param {string[]} codes
 */
function sortLocales(codes) {
  /** @param {string} code */
  const groupName = (code) => localeLabel(code).split(/\s*[(-]\s*/)[0].trim();
  return [...codes].sort((a, b) => {
    if (a === DEFAULT_LOCALE) return -1;
    if (b === DEFAULT_LOCALE) return 1;
    const groupCmp = groupName(a).localeCompare(groupName(b));
    if (groupCmp !== 0) return groupCmp;
    const aWorld = a.endsWith('-001');
    const bWorld = b.endsWith('-001');
    if (aWorld !== bWorld) return aWorld ? -1 : 1;
    return localeLabel(a).localeCompare(localeLabel(b));
  });
}

export function load() {
  const locales = sortLocales(manifest.availableLocales).map((code) => ({
    code,
    label: localeLabel(code),
    href: code === DEFAULT_LOCALE ? '/' : `/locales/${code}/`,
    chapterCount: manifest.locales[code].chapters.length,
    complete: manifest.locales[code].chapters.length === manifest.totals.chapters
  }));
  return { locales };
}
