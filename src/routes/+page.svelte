<script>
  import manifest from '$lib/manifest.json';
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
    <a class="button button-secondary" href="/contents/">Contents</a>
    <a class="button button-secondary" href="/examples/">Worked examples</a>
  </div>
</section>

<section class="section">
  <header class="section-heading">
    <p class="section-heading-eyebrow">Browse</p>
    <h2>The twelve parts</h2>
  </header>
  {#each manifest.parts as part (part.number)}
    <section class="toc-part">
      <h3 class="toc-part-heading"><span class="part-number">Part {part.number}</span> {part.title}</h3>
      <ul class="toc-chapter-list">
        {#each part.chapters as chapter (chapter.slug)}
          <li>
            <a href="/chapters/{chapter.slug}/"><span class="decimal">{chapter.decimal}</span>{chapter.title}</a>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
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
