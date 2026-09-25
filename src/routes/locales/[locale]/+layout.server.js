import { error } from '@sveltejs/kit';
import manifest from '$lib/manifest.json';
import { localeLabel, langAttr, localeDir } from '$lib/locales.js';
import { ui } from '$lib/i18n.js';

/** @param {{ params: { locale: string } }} event */
export function load({ params }) {
  if (!manifest.availableLocales.includes(params.locale)) {
    error(404, 'Locale not found');
  }
  return {
    locale: params.locale,
    localeLabel: localeLabel(params.locale),
    lang: langAttr(params.locale),
    dir: localeDir(params.locale),
    ui: ui(params.locale)
  };
}
