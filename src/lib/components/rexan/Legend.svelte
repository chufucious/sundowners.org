<script>
  // The key shared by a diagram's views: the colour-coded speakers and any
  // notes about them (`keys`) on the left, the line samples (`lines`) on the
  // right, each a run of LegendItem rows. The two columns sit under the two views; phones stack them.
  let { keys, lines } = $props();
</script>

<div class="grid gap-x-12 sm:grid-cols-2 text-xs md:text-sm leading-relaxed text-orange-950/80">
  <ul class="space-y-3">{@render keys()}</ul>
  <ul class="space-y-3 mt-3 sm:mt-0">{@render lines()}</ul>
</div>
