import manifest from '$lib/manifest.json';

export const prerender = true;

export function entries() {
  return manifest.availableLocales.map((locale) => ({ locale }));
}

export async function load({ params }) {
  const localeManifest = manifest.locales[params.locale];

  if (localeManifest.hasHomePage) {
    // A translated locales/<code>/index.md exists: render it as the
    // locale's home page, same as the chapter/front-matter routes render
    // their markdown.
    const mod = await import(`../../../content/locales/${params.locale}/index.md`);
    return { hasHomePage: true, content: mod.default };
  }

  return { hasHomePage: false };
}
