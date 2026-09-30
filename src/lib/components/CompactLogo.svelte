<script module>
  // How far the header logo has left (0–1) when the two logos swap reach, and
  // when this one starts fading in.
  export const HANDOVER = 0.5;
</script>

<script>
  // The header's flame lion, pinned top centre as the header logo scrolls
  // away: same mark, shimmer and embers. `swap` (0–1) is how far the header
  // logo has left; this one fades in from HANDOVER,
  // arriving quickly and settling gently (ease-out cubic) from slightly small
  // and high (92%, as in Material 3's fade through).
  import { resolve } from "$app/paths";
  import FlameMark from "./FlameMark.svelte";

  let { swap = 0 } = $props();

  const progress = $derived(1 - (1 - Math.max((swap - HANDOVER) / (1 - HANDOVER), 0)) ** 3);

  const motion = $derived(
    `opacity: ${progress}; scale: ${0.92 + 0.08 * progress}; translate: -50% ${-4 * (1 - progress)}px`,
  );
</script>

<a
  href={resolve("/")}
  aria-label="Sundowners home"
  inert={swap < HANDOVER}
  style={motion}
  class="fixed -top-3 md:top-0.5 left-1/2 z-30 w-18 aspect-551/432 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
>
  <!-- Sized to the mark's texture (551 x 432), flames included, as in the header. -->
  <FlameMark active={progress > 0} class="absolute inset-0" />
</a>
