<script>
  import manifest from '#lib/manifest.json';

  let { data } = $props();
  let localeManifest = $derived(manifest.locales[data.locale]);
</script>

<svelte:head>
  <title>{data.ui.siteName} — {data.localeLabel}</title>
</svelte:head>

{#if data.hasHomePage}
  <data.content />
{:else}
  <section class="hero">
    <h1>{data.ui.siteName}</h1>
    {#if data.lang.startsWith('en')}
      <p class="hero-eyebrow">Free · open · community-maintained</p>
      <p class="hero-tagline">
        A guidebook of good practices for software developer teams, spanning ways of working,
        programming craft, architecture, security, AI, data and analytics, UI/UX, automation,
        delivery, operations, flow, and management, for startups, enterprises, and government
        organizations alike.
      </p>
      <div class="button-row">
        <a class="button button-primary" href="/front-matter/what-is-software-engineering/">Start reading</a>
        <a class="button button-secondary" href="{data.base}/contents/">{data.ui.tableOfContents}</a>
        <a class="button button-secondary" href="/examples/">{data.ui.examples}</a>
      </div>
    {:else}
      <p class="hero-tagline">
        {localeManifest.chapters.length}/{manifest.totals.chapters}
        {data.ui.chapter.toLowerCase()}{localeManifest.chapters.length === 1 ? '' : 's'}
        &middot; <a href="/en-us/">{data.ui.viewInEnglish}</a>
      </p>
      <p><a href="{data.base}/contents/">{data.ui.tableOfContents}</a></p>
    {/if}
  </section>

  <section class="section">
    <ul class="contents-list">
      {#each localeManifest.parts as part (part.number)}
        <li>
          {part.number} {part.title}
          <ul>
            {#each part.chapters as chapter (chapter.slug)}
              <li>
                <a href="{data.topicsBase}/{chapter.slug}/">{chapter.decimal} {chapter.title}</a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </section>
{/if}
