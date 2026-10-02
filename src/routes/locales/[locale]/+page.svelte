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
    <p class="hero-tagline">
      {localeManifest.chapters.length}/{manifest.totals.chapters}
      {data.ui.chapter.toLowerCase()}{localeManifest.chapters.length === 1 ? '' : 's'}
      {#if data.locale !== 'en-us'}&middot; <a href="/">{data.ui.viewInEnglish}</a>{/if}
    </p>
  </section>

  <section class="section">
    {#each localeManifest.parts as part (part.number)}
      <section class="toc-part">
        <h3 class="toc-part-heading">
          <span class="part-number">{data.ui.part} {part.number}</span> {part.title}
        </h3>
        <ul class="toc-chapter-list">
          {#each part.chapters as chapter (chapter.slug)}
            <li>
              <a href="/locales/{data.locale}/chapters/{chapter.slug}/">{chapter.decimal} {chapter.title}</a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </section>
{/if}
