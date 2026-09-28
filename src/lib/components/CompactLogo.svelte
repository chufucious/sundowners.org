<script>
  // The header's flame lion, pinned top centre once the header logo has
  // scrolled away: same mark, shimmer, embers and color-dodge blend.
  // Motion follows Material 3: entering uses emphasized-decelerate over 400ms
  // (arrives quickly, settles gently); exiting uses emphasized-accelerate over
  // a snappy 100ms. Reduced motion keeps only the fade.
  import FlameMark from "./FlameMark.svelte";

  let { shown = false } = $props();

  // Shared by both layers so they move as one. Centred with a negative margin
  // (w-18 / 2) because `translate` is animated. The blend has to sit on the
  // fixed element itself: fixed positioning isolates blending inside it.
  const layer = $derived([
    "fixed top-0.5 left-1/2 -ml-9 z-30 w-18 aspect-551/432 transition-[opacity,scale,translate]",
    shown
      ? "opacity-100 duration-400 ease-[cubic-bezier(0.05,0.7,0.1,1)]"
      : "opacity-0 scale-95 -translate-y-1 duration-100 ease-[cubic-bezier(0.3,0,0.8,0.15)] motion-reduce:scale-100 motion-reduce:translate-y-0",
  ]);
</script>

<a
  href="/"
  aria-label="Sundowners home"
  inert={!shown}
  class={[layer, "block mix-blend-color-dodge focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"]}
>
  <!-- Sized to the mark's texture (551 x 432), flames included, as in the header. -->
  <FlameMark class="absolute inset-0" />
</a>
<!-- Embers outside the blend, as in the header, so their orange/red survives. -->
<div class={[layer, "pointer-events-none"]} aria-hidden="true">
  <FlameMark embers class="absolute inset-0" />
</div>
