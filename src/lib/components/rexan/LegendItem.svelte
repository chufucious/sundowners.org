<script>
  // A legend row keyed by a colour swatch (`swatch`: background classes) or,
  // for lines in the drawing, a line sample (`line`: stroke class, plus `dash`/`width`).
  let { swatch = "", line = "", dash = undefined, width = 1, children } = $props();
</script>

<li class="flex gap-3">
  {#if line}
    <svg viewBox="0 0 28 10" class="mt-1 h-2.5 w-7 shrink-0" aria-hidden="true">
      <line x1="0" y1="5" x2="28" y2="5" class={line} stroke-width={width} stroke-dasharray={dash} />
    </svg>
  {:else}
    <span class={["mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm", swatch]}></span>
  {/if}
  <span>{@render children()}</span>
</li>
