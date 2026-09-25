import { langAttr, localeDir } from '$lib/locales.js';

const LOCALE_PATH_RE = /^\/locales\/([^/]+)\//;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const match = LOCALE_PATH_RE.exec(event.url.pathname);
  const locale = match?.[1];

  return resolve(event, {
    transformPageChunk: ({ html }) => {
      if (!locale) return html;
      // src/app.html declares <html lang="en">; swap in this locale's
      // language and text direction so the prerendered HTML is correct
      // before any client JS runs (screen readers, hyphenation, etc.).
      return html.replace(
        '<html lang="en">',
        `<html lang="${langAttr(locale)}" dir="${localeDir(locale)}">`
      );
    }
  });
}
