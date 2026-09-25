<script>
  // The <html lang>/<html dir> attributes themselves are set server-side
  // (so prerendered HTML is correct before any JS runs) by the
  // transformPageChunk hook in src/hooks.server.js, which reads this same
  // /locales/<code>/ URL prefix. This wrapper covers the client-rendered
  // case (client-side navigation between locales) and gives the locale
  // subtree an explicit lang/dir for assistive technology regardless.
  let { data, children } = $props();
</script>

<div class="locale-scope" lang={data.lang} dir={data.dir}>
  {@render children()}
</div>
