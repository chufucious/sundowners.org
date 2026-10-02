<script>
  // A legend row keyed by a colour swatch (`swatch`: background classes), a
  // line sample for lines in the drawing (`line`: stroke class, plus `dash`/
  // `width`), or, with neither, a plain bullet for notes.
  import Swatch from "./Swatch.svelte";

  let { swatch = "", line = "", dash, width = 1, children } = $props();
</script>

<li class="flex gap-3">
  <!-- One line tall, so the marker centres on the first line at any text size.
       Swatches and bullets share a width, so their text lines up. -->
  <span class="flex h-[1lh] shrink-0 items-center" aria-hidden="true">
    {#if line}
      <svg viewBox="0 0 28 10" class="h-2.5 w-7">
        <line x1="0" y1="5" x2="28" y2="5" class={line} stroke-width={width} stroke-dasharray={dash} />
      </svg>
    {:else if swatch}
      <Swatch class={swatch} />
    {:else}
      <span class="flex w-3.5 justify-center"><span class="size-1.5 rounded-full bg-orange-950/50"></span></span>
    {/if}
  </span>
  <div>{@render children()}</div>
</li>
