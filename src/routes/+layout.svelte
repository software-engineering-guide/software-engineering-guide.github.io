<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import Sidebar from '$lib/Sidebar.svelte';
  import PickerBar from '@lilydesignsystem/svelte-picker-bar';
  import manifest from '$lib/manifest.json';
  import { locales as availableLocales } from '$lib/content.js';
  import { localeLabel } from '$lib/locales.js';
  import { ui } from '$lib/i18n.js';

  let { children } = $props();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/front-matter/what-is-software-engineering/', label: 'Start here' },
    { href: '/table-of-contents/', label: 'Table of contents' },
    { href: '/examples/', label: 'Examples' },
    { href: '/contributing/', label: 'Contributing' },
    { href: '/project/', label: 'Project' }
  ];

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
  const headerUi = ui('en-us');
  const pickerLocales = availableLocales();

  // The locale segment of the current URL ("/locales/<code>/..."), or
  // "en-us" for the canonical unprefixed English routes ("/", "/chapters/...").
  let currentLocale = $derived.by(() => {
    const m = /^\/locales\/([^/]+)\//.exec(pathname);
    if (m) return m[1];
    return pathname === '/' || pathname.startsWith('/chapters/') ? 'en-us' : undefined;
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

<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <div class="site-header-inner">
    <a class="site-brand" href="/" aria-label="Software Engineering Guide home">
      <img class="site-brand-mark" src="/assets/favicon.svg" alt="" aria-hidden="true" />
      <span>Software Engineering Guide</span>
    </a>
    <nav class="site-nav" aria-label="Main">
      {#each navLinks as link (link.href)}
        <a href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>{link.label}</a>
      {/each}
      <a href="https://github.com/software-engineering-guide/software-engineering-guide">GitHub</a>
    </nav>
    <PickerBar
      class="site-picker-bar"
      labels={{
        theme: headerUi.pickerTheme,
        locale: headerUi.pickerLocale,
        textSize: headerUi.pickerTextSize,
        share: headerUi.pickerShare
      }}
      themesUrl="/themes/"
      locales={pickerLocales}
      localeProps={{
        value: currentLocale,
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
      shareProps={{ copyLabel: headerUi.shareCopyLink }}
    />
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
      A guidebook of good practices for software developer teams, published under the
      <a href="https://github.com/software-engineering-guide">software-engineering-guide</a> organization.
    </p>
    <div class="site-footer-links">
      <a href="https://github.com/software-engineering-guide/software-engineering-guide">Content source</a>
      <a href="https://github.com/software-engineering-guide/software-engineering-guide.github.io">Site source</a>
      <a href="/table-of-contents/">Table of contents</a>
      <a href="/contributing/">Contributing</a>
    </div>
  </div>
</footer>
