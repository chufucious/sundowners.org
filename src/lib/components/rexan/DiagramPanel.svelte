<script>
  // One view of a diagram: heading, the drawing (children), and its legend
  // (LegendItem rows). Overhead views pass `sides` to caption left and right.
  let { title, sides = false, children, legend } = $props();
</script>

<section>
  <h3 class="text-xs uppercase tracking-wide text-orange-950/60 mb-2">{title}</h3>
  {@render children()}
  {#if sides}
    <div class="flex justify-between text-xs text-orange-950/60 max-w-lg mx-auto -mt-1">
      <span>← Driver side</span><span>Passenger side →</span>
    </div>
  {/if}
  <ul class="mt-6 space-y-2 text-sm text-orange-950/80">
    {@render legend()}
  </ul>
</section>
