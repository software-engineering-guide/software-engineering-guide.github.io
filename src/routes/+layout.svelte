<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Sidebar from '$lib/Sidebar.svelte';
  import PickerBar from '@lilydesignsystem/svelte-picker-bar';
  import manifest from '$lib/manifest.json';
  import { locales as availableLocales } from '$lib/content.js';
  import { localeLabel } from '$lib/locales.js';
  import { DEFAULT_UI } from '$lib/i18n.js';

  let { children } = $props();

  // The header (brand wordmark, nav labels, picker labels, footer text)
  // lives in the root layout, rendered on every route, but it must still
  // read as this locale on any /locales/<code>/ page. Per
  // spec/locales-for-global-sharing-with-svelte/index.md's regression
  // watch-list ("UI chrome was hardcoded English in the .svelte templates
  // ... nav labels ... Fix: add i18n.js and threading ui(locale) through
  // every locale-scoped route" and "header/footer brand wordmark stayed
  // English ... Fix: have locales/[locale]/+layout.server.js supply this
  // locale's own title, which overrides the root layout's canonical one
  // via SvelteKit's merged page.data"): locales/[locale]/+layout.server
  // .js's load() puts `ui` in its data, and SvelteKit merges that into
  // page.data for the whole active route tree, so reading page.data here
  // (rather than a module-level `ui('en-us')` constant) makes the header
  // locale-reactive without the root layout needing to know the current
  // locale itself.
  let headerUi = $derived(page.data.ui ?? DEFAULT_UI);

  // These nav links point at canonical (untranslated) sections — only
  // chapters and each locale's own home page are translated, per
  // spec/locales-for-global-sharing-with-svelte/index.md's content
  // structure — but the label text itself still reads in the visitor's
  // language rather than staying English on every locale page.
  let navLinks = $derived([
    { href: '/', label: headerUi.home },
    { href: '/front-matter/what-is-software-engineering/', label: headerUi.startHere },
    { href: '/contents/', label: headerUi.tableOfContents },
    { href: '/examples/', label: headerUi.examples },
    { href: '/contributing/', label: headerUi.contributing },
    { href: '/project/', label: headerUi.project }
  ]);

  let pathname = $derived(page.url.pathname);
  let showSidebar = $derived(pathname.startsWith('/chapters/') || pathname.startsWith('/front-matter/'));
  let currentSlug = $derived(showSidebar ? (pathname.split('/').filter(Boolean).pop() ?? null) : null);

  /** @param {string} href */
  function isCurrent(href) {
    if (href === '/') return pathname === '/';
    return pathname === href;
  }

  // Header picker bar: locale list, labels, and the locale switch itself.
  // PickerBar/LocalePicker only manage picker UI state — navigating to the
  // matching page in the newly-picked locale is this app's job.
  const pickerLocales = availableLocales();

  // The locale segment of the current URL ("/locales/<code>/..."), or
  // "en-us" for every canonical unprefixed English route ("/", "/chapters/...",
  // "/contents/", "/examples/", and so on). Leaving this undefined for routes
  // outside "/" and "/chapters/" (as an earlier version did) fed
  // localeProps.defaultValue={undefined} to the locale picker, which then
  // fell back to its first list entry and fired onChange on mount, silently
  // redirecting every one of those pages to that locale's home page.
  let currentLocale = $derived.by(() => {
    const m = /^\/locales\/([^/]+)\//.exec(pathname);
    return m ? m[1] : 'en-us';
  });

  /**
   * Finds the equivalent page for `toLocale`, mapping the current chapter
   * across locales by its decimal number (per
   * spec/locales-for-global-sharing-with-svelte/index.md: "Nothing in the
   * site assumes slugs match across locales"). Falls back to that locale's
   * home page when there is no current chapter, or it is not yet
   * translated into `toLocale`.
   * @param {string} toLocale
   */
  function pathForLocale(toLocale) {
    const segments = pathname.split('/').filter(Boolean);
    let decimal;
    if (segments[0] === 'chapters' && segments[1]) {
      decimal = manifest.chapters.find((c) => c.slug === segments[1])?.decimal;
    } else if (segments[0] === 'locales' && segments[1] && segments[2] === 'chapters' && segments[3]) {
      const fromLocale = segments[1];
      const fromManifest = manifest.locales[fromLocale];
      decimal = fromManifest?.chapters.find((c) => c.slug === segments[3])?.decimal;
    }
    if (decimal) {
      const target = manifest.locales[toLocale]?.chaptersByDecimal?.[decimal];
      if (target) {
        return toLocale === 'en-us' ? `/chapters/${target.slug}/` : `/locales/${toLocale}/chapters/${target.slug}/`;
      }
    }
    return toLocale === 'en-us' ? '/' : `/locales/${toLocale}/`;
  }

  /** @param {string} toLocale */
  function onLocaleChange(toLocale) {
    if (toLocale === currentLocale) return;
    goto(pathForLocale(toLocale));
  }
</script>

<a class="skip-link" href="#main">{headerUi.skipToContent}</a>

<header class="site-header">
  <div class="site-header-inner">
    <a class="site-brand" href="/" aria-label="{headerUi.siteName} home">
      <img class="site-brand-mark" src="/assets/favicon.svg" alt="" aria-hidden="true" />
      <span>{headerUi.siteName}</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      {#each navLinks as link (link.href)}
        <a href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>{link.label}</a>
      {/each}
      <a href="https://github.com/software-engineering-guide/software-engineering-guide">GitHub</a>
    </nav>
    <!--
      Keyed on currentLocale: LocalePicker's `value` is "two-way bindable"
      but PickerBar only exposes it via a plain (one-way) `localeProps.value`
      spread, with no way to `bind:` through that spread. Passing a
      continuously-recomputed `value: currentLocale` there fights the
      picker's own internal selection state — every click momentarily
      selects the new locale, then the still-current `value` prop snaps it
      straight back, so `onChange` never fires and the picker looks like it
      does nothing. Fix: seed the initial selection with `defaultValue`
      (which the picker only reads once, on mount, so it stops fighting
      clicks) and key the whole bar on `currentLocale` so it fully remounts
      — reseeding that initial value — whenever the URL's locale changes for
      a reason other than this picker (a chapter link, browser back/forward,
      or a direct URL edit), keeping the shown selection honest.

      shareProps below sets strategy: 'list', pinning SharePicker to its
      in-page dropdown. Its default 'auto' tries navigator.share() first on
      any browser that exposes it, but the promise can reject for reasons
      other than the user dismissing the sheet (no share targets
      registered, no secure context, automated/embedded browsers) —
      SharePicker treats every rejection as a dismissal and does not fall
      back to the list, so the button then does nothing at all. With only
      two targets (email, copy link), the plain list is simpler and
      reliable on every platform anyway.
    -->
    {#key currentLocale}
      <PickerBar
        class="site-picker-bar"
        labels={{
          theme: headerUi.pickerTheme,
          locale: headerUi.pickerLocale,
          textSize: headerUi.pickerTextSize,
          share: headerUi.pickerShare
        }}
        themesUrl="/themes/"
        themeProps={{ storageKey: 'lily-theme', detectFromSystem: true }}
        locales={pickerLocales}
        localeProps={{
          defaultValue: currentLocale,
          localeLabels: Object.fromEntries(pickerLocales.map((code) => [code, localeLabel(code)])),
          onChange: onLocaleChange
        }}
        shareTargets={[
          {
            id: 'email',
            label: headerUi.shareEmail,
            href: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
          }
        ]}
        shareProps={{ copyLabel: headerUi.shareCopyLink, strategy: 'list' }}
      />
    {/key}
  </div>
</header>

<main id="main" class="site-main" class:has-sidebar={showSidebar}>
  {#if showSidebar}
    <Sidebar {currentSlug} />
  {/if}
  <div class="site-content">
    {@render children()}
  </div>
</main>

<footer class="site-footer">
  <div class="site-footer-inner">
    <p>
      {headerUi.footerTagline}
      <a href="https://github.com/software-engineering-guide">software-engineering-guide</a> {headerUi.footerOrgSuffix}
    </p>
    <div class="site-footer-links">
      <a href="https://github.com/software-engineering-guide/software-engineering-guide">{headerUi.contentSource}</a>
      <a href="https://github.com/software-engineering-guide/software-engineering-guide.github.io">{headerUi.siteSource}</a>
      <a href="/contents/">{headerUi.tableOfContents}</a>
      <a href="/contributing/">{headerUi.contributing}</a>
    </div>
  </div>
</footer>
