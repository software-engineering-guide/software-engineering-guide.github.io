<script>
  import manifest from '$lib/manifest.json';

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
    <div class="card-grid">
      {#each localeManifest.parts as part (part.number)}
        {@const intro = part.chapters.find((c) => c.chapter === 0)}
        <a class="card" href="/locales/{data.locale}/chapters/{(intro ?? part.chapters[0]).slug}/">
          <h3 class="card-heading">{data.ui.part} {part.number}: {part.title}</h3>
          <p class="card-description">
            {part.chapters.length}
            {(intro ?? part.chapters[0]).decimal}
          </p>
        </a>
      {/each}
    </div>
  </section>
{/if}
