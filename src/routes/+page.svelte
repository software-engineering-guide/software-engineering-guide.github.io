<script>
  import manifest from '$lib/manifest.json';

  let { data } = $props();
</script>

<svelte:head>
  <title>Software Engineering Guide</title>
  <meta
    name="description"
    content="A guidebook of good practices for software developer teams: {manifest.totals.parts} parts, {manifest.totals.chapters} chapters spanning people, programming, systems, security, UI/UX, AI, data, automation, operations, management, and flow."
  />
</svelte:head>

<section class="hero">
  <p class="hero-eyebrow">Free · open · community-maintained</p>
  <h1>Good practices for software developer teams.</h1>
  <p class="hero-tagline">
    A guidebook spanning ways of working, programming craft, architecture, security, AI,
    data and analytics, UI/UX, automation, delivery, operations, flow, and management — for
    startups, enterprises, and government organizations alike.
  </p>
  <div class="button-row">
    <a class="button button-primary" href="/front-matter/what-is-software-engineering/">Start reading</a>
    <a class="button button-secondary" href="/table-of-contents/">Table of contents</a>
    <a class="button button-secondary" href="/examples/">Worked examples</a>
  </div>
</section>

<section class="section">
  <header class="section-heading">
    <p class="section-heading-eyebrow">Browse</p>
    <h2>The twelve parts</h2>
  </header>
  <div class="card-grid">
    {#each manifest.parts as part (part.number)}
      {@const intro = part.chapters.find((c) => c.chapter === 0)}
      <a class="card" href="/chapters/{(intro ?? part.chapters[0]).slug}/">
        <h3 class="card-heading">Part {part.number}: {part.title}</h3>
        <p class="card-description">
          {part.chapters.length}
          {part.chapters.length === 1 ? 'chapter' : 'chapters'}, starting with {(intro ?? part.chapters[0]).decimal}.
        </p>
        <p class="card-meta">Read the introduction →</p>
      </a>
    {/each}
  </div>
</section>

<section class="section prose" style="margin: 0 auto;">
  <header class="section-heading">
    <p class="section-heading-eyebrow">Cross-cutting themes</p>
    <h2>Not once, everywhere</h2>
  </header>
  <p>
    Security, privacy, and accessibility appear in every part, not once. Automation and
    "everything as code" underpin repeatability and audit. Measurement and feedback loops turn
    practices into learning systems. Documentation and knowledge continuity protect against
    turnover and scale. Regulatory and government constraints are treated as design inputs, not
    afterthoughts.
  </p>
  <p style="text-align: center; margin-top: 2rem;">
    <a class="button button-secondary" href="/table-of-contents/">See the full table of contents →</a>
  </p>
</section>

<section class="section" aria-label="Languages">
  <header class="section-heading">
    <p class="section-heading-eyebrow">Languages</p>
    <h2>Read in your language</h2>
  </header>
  <ul class="locale-list">
    {#each data.locales as locale (locale.code)}
      <li>
        <a href={locale.href}>{locale.label}</a>
        {#if !locale.complete}
          <span class="locale-partial">({locale.chapterCount}/{manifest.totals.chapters})</span>
        {/if}
      </li>
    {/each}
  </ul>
</section>

<section class="section prose" style="margin: 0 auto;" aria-label="About this site">
  <div class="callout">
    <p style="margin: 0;">
      This site is built with SvelteKit and the
      <a href="https://lilydesignsystem.com/">Lily Design System</a>. The book's content lives
      in the <a href="https://github.com/software-engineering-guide/software-engineering-guide"
        >software-engineering-guide</a
      >
      content repository; see the <a href="/project/">project page</a> for how the two fit
      together, and <a href="/contributing/">contributing</a> for how to help. Using
      <a href="https://claude.com/claude-code">Claude Code</a>? Two skills for this guide live in
      the content repo's
      <a
        href="https://github.com/software-engineering-guide/software-engineering-guide/tree/main/skills"
        >skills/</a
      > directory, for reading the guide and for maintaining it.
    </p>
  </div>
</section>
