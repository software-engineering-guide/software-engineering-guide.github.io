import { error } from '@sveltejs/kit';
import manifest from '$lib/manifest.json';

export const prerender = true;

// Vite statically analyzes a dynamic import() with a single interpolated
// path segment (see ../../../chapters/[slug]/+page.js) into a glob, but not
// reliably across two segments spanning two different variables
// (locale AND slug) — that silently falls back to a runtime fetch, which
// 404s in a prerendered/SSR build. import.meta.glob is the documented way
// to make a genuinely dynamic multi-variable path resolve statically.
const modules = import.meta.glob('../../../../../content/locales/*/chapters/*.md');

export function entries() {
  const entries = [];
  for (const locale of manifest.availableLocales) {
    for (const chapter of manifest.locales[locale].chapters) {
      entries.push({ locale, slug: chapter.slug });
    }
  }
  return entries;
}

export async function load({ params }) {
  const localeManifest = manifest.locales[params.locale];
  if (!localeManifest) error(404, 'Locale not found');

  const chapter = localeManifest.chapters.find((c) => c.slug === params.slug);
  if (!chapter) error(404, 'Chapter not translated into this locale yet');

  const index = localeManifest.order.indexOf(chapter.decimal);
  const prevDecimal = index > 0 ? localeManifest.order[index - 1] : null;
  const nextDecimal =
    index >= 0 && index < localeManifest.order.length - 1 ? localeManifest.order[index + 1] : null;

  // A universal load function may return non-serializable values (like a
  // Svelte component constructor) because it re-runs in the browser on
  // client-side navigation rather than being passed across the network.
  const key = `../../../../../content/locales/${params.locale}/chapters/${params.slug}.md`;
  const importModule = modules[key];
  if (!importModule) error(404, 'Chapter content not found');
  /** @type {{ default: import('svelte').Component }} */
  const mod = /** @type {any} */ (await importModule());

  return {
    chapter,
    prev: prevDecimal ? localeManifest.chaptersByDecimal[prevDecimal] : null,
    next: nextDecimal ? localeManifest.chaptersByDecimal[nextDecimal] : null,
    content: mod.default,
    // The English chapter with the same decimal, for the "view in English"
    // link and the language-switch mapping in the header picker.
    enChapter: manifest.chaptersByDecimal[chapter.decimal] ?? null
  };
}
