<script>
  // One view of a diagram: heading and the drawing (children). Overhead views
  // pass `sides` to caption left and right. The drawing sits at the bottom of
  // the panel, so views set side by side share a bottom edge; the legend for
  // both views follows them, as a Legend.
  let { title, sides = false, children } = $props();
</script>

<section class="flex flex-col">
  <h3 class="eyebrow mb-2">{title}</h3>
  <div class="mt-auto">
    {@render children()}
    {#if sides}
      <div class="flex justify-between text-xs text-orange-950/70 max-w-lg mx-auto -mt-1">
        <span>← Driver side</span><span>Passenger side →</span>
      </div>
    {/if}
  </div>
</section>
