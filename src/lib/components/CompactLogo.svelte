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
  import { page } from "$app/state";
  import FlameMark from "./FlameMark.svelte";

  let { swap = 0 } = $props();

  // Already home: glide back to the top rather than jump, so it reads as moving
  // up the page (and the header logo visibly returns). Instant with reduced
  // motion; modified clicks still open home in a new tab or window.
  function toTop(event) {
    if (page.url.pathname !== resolve("/")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    // As a navigation would, let focus fall back to the page; the link turns
    // inert once the header logo is back anyway.
    event.currentTarget.blur();
  }

  const progress = $derived(1 - (1 - Math.max((swap - HANDOVER) / (1 - HANDOVER), 0)) ** 3);

  const motion = $derived(
    `opacity: ${progress}; scale: ${0.92 + 0.08 * progress}; translate: -50% ${-4 * (1 - progress)}px`,
  );
</script>

<a
  href={resolve("/")}
  aria-label="Sundowners home"
  inert={swap < HANDOVER}
  onclick={toTop}
  style={motion}
  class="fixed z-30 w-18 aspect-551/432 block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
>
  <!-- Sized to the mark's texture (551 x 432), flames included, as in the header. -->
  <FlameMark active={progress > 0} class="absolute inset-0" />
</a>

<style>
  a {
    /* Keep the entire link below the status area, including the flames. */
    top: calc(var(--safe-area-top) + 0.125rem);
    left: calc((100% + var(--safe-area-left) - var(--safe-area-right)) / 2);
  }
</style>
