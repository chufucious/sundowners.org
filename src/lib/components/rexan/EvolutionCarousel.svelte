<script>
  // One card per year Rexan went out. Cropped from rexan-evolution-2026.png
  // so each year can be read at phone width instead of as one tiny strip.
  import evolution2017 from "#lib/assets/rexan-sound/evolution-2017.png?w=280;542&enhanced";
  import evolution2018 from "#lib/assets/rexan-sound/evolution-2018.png?w=280;542&enhanced";
  import evolution2019 from "#lib/assets/rexan-sound/evolution-2019.png?w=280;542&enhanced";
  import evolution2022 from "#lib/assets/rexan-sound/evolution-2022.png?w=280;542&enhanced";
  import evolution2023 from "#lib/assets/rexan-sound/evolution-2023.png?w=280;542&enhanced";
  import evolution2025 from "#lib/assets/rexan-sound/evolution-2025.png?w=280;542&enhanced";
  import evolution2026 from "#lib/assets/rexan-sound/evolution-2026.png?w=280;542&enhanced";

  import { themeOf } from "#lib/expeditions.js";

  // A wax-fabric frame per year, like the homepage's framed photos.
  import sunflower from "#lib/assets/wax-fabric/sunflower.webp?w=600&format=webp";
  import fans from "#lib/assets/wax-fabric/fans.jpg?w=600&format=webp";
  import spirograph from "#lib/assets/wax-fabric/spirograph.png?w=600&format=webp";
  import mic from "#lib/assets/wax-fabric/mic.jpg?w=600&format=webp";
  import eyes from "#lib/assets/wax-fabric/eyes.webp?w=600&format=webp";
  import feathers from "#lib/assets/wax-fabric/feathers.webp?w=600&format=webp";
  import redstrokes from "#lib/assets/wax-fabric/redstrokes.jpg?w=600&format=webp";

  let { mode = "carousel" } = $props();
  const isCarousel = $derived(mode === "carousel");

  // Each chapter follows the post's account of that year. `tint` is
  // the fabric's key colour: washed pale behind the drawing, a 1px edge that
  // keeps the card's shape where a fabric's light strokes meet the page, and
  // the label's shadow.
  // Chassis centers use the same tire-baseline measurement on each 542px crop.
  // Grid labels follow these centers without cropping or moving the artwork.
  const years = [
    { year: 2017, chassisCenter: 268.5, image: evolution2017, fabric: sunflower, tint: "#a07517", story: "A simple sound system gave our safari a soundtrack." },
    { year: 2018, chassisCenter: 279.0, image: evolution2018, fabric: fans, tint: "#8c2425", story: "Our sound system brought wildlife calls and music to the riders." },
    { year: 2019, chassisCenter: 264.5, image: evolution2019, fabric: spirograph, tint: "#1b5965", story: "Our first DJ setup turned the safari into a dance floor." },
    { year: 2022, chassisCenter: 265.75, image: evolution2022, fabric: mic, tint: "#d9914b", story: "Switching to QSC brought dance-club sound to Rexan." },
    { year: 2023, chassisCenter: 265.0, image: evolution2023, fabric: eyes, tint: "#7e1132", story: "More speakers and a second sub brought the full rig together." },
    { year: 2025, chassisCenter: 265.0, image: evolution2025, fabric: feathers, tint: "#535939", story: "Repurposing the monitors helped us adapt Rexan's sound system." },
    { year: 2026, chassisCenter: 280.0, image: evolution2026, fabric: redstrokes, tint: "#b23b39", story: "By 2026 all four K12.2s were working again, and that's the rig we run today." },
  ];

  let track;
  let atStart = $state(true);
  let atEnd = $state(false);

  // Card i is snapped when the track has scrolled by its distance from card 0.
  function snapLeft(i) {
    return track.children[i].offsetLeft - track.children[0].offsetLeft;
  }

  // Always scroll to an exact card position: Safari doesn't re-snap after a
  // smooth programmatic scroll, so it would stop wherever the scroll ended.
  // The trailing spacer lets the last card reach the same reading edge.
  function scrollToCard(i) {
    const end = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.min(snapLeft(i), end), behavior: "smooth" });
  }

  // The card lined up with the text edge.
  function leftmostCard() {
    let nearest = 0;
    for (let i = 1; i < years.length; i++) {
      if (Math.abs(snapLeft(i) - track.scrollLeft) < Math.abs(snapLeft(nearest) - track.scrollLeft)) nearest = i;
    }
    return nearest;
  }

  function scrollByCard(direction) {
    scrollToCard(Math.min(years.length - 1, Math.max(0, leftmostCard() + direction)));
  }

  function updatePosition() {
    if (!isCarousel || !track) return;
    atStart = track.scrollLeft <= 1;
    atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  $effect(updatePosition);
</script>

<!-- Resizing changes how many cards fit, which can move the ends without a scroll. -->
<svelte:window onresize={updatePosition} />

{#snippet pageButton(direction, disabled)}
  <button
    type="button"
    onclick={() => scrollByCard(direction)}
    {disabled}
    aria-label={direction < 0 ? "Previous years" : "Next years"}
    class="size-9 rounded-full bg-orange-950/10 hover:bg-orange-950/20 disabled:opacity-40 disabled:hover:bg-orange-950/10 text-orange-950 grid place-items-center cursor-pointer disabled:cursor-default"
  >
    <svg viewBox="0 0 16 16" class="size-4" aria-hidden="true">
      <path
        d={direction < 0 ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
{/snippet}

<!-- Keyboard users need to focus the horizontal scroll region. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  role="region"
  aria-roledescription={isCarousel ? "carousel" : undefined}
  aria-label="Rexan, year by year"
  tabindex={isCarousel ? undefined : 0}
  class={isCarousel ? undefined : "overflow-x-auto no-scrollbar focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"}
>
  <!-- Align the first and last cards with the reading column while scrolling
       across the full page. Real end spacers also work in Safari. -->
  <ul
    bind:this={track}
    onscroll={isCarousel ? updatePosition : undefined}
    style={isCarousel ? "--edge: max(0.5rem, calc((100% - var(--reading-width, 65ch)) / 2 - 1rem))" : undefined}
    class={isCarousel
      ? "flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-[calc(var(--edge)+1rem)] pb-2 [--card-width:14rem] md:[--card-width:16rem] before:w-(--edge) before:shrink-0 after:w-[max(0px,calc(100%-var(--edge)-2rem-var(--card-width)))] after:shrink-0"
      : "mx-auto min-w-200 max-w-400 px-6 grid grid-cols-7 gap-x-4 pb-2"}
  >
    <!-- Each card: the drawing on a pale wash of its year's fabric, then the
         fabric itself with a cream label on it, like the label on a length
         of wax print (a gold double rule, that year's Burning Man theme). -->
    {#each years as { year, image, fabric, tint, story, chassisCenter }, i (year)}
      <li
        class={isCarousel ? "pattern-frame ring-1 ring-inset ring-(--tint) p-2 flex flex-col snap-start shrink-0 w-(--card-width)" : "min-w-0 text-center"}
        style:background-image={isCarousel ? `url(${fabric})` : undefined}
        style:--tint={isCarousel ? tint : undefined}
        aria-label="{i + 1} of {years.length}: {year}"
      >
        <div class={isCarousel ? "wash px-5 pt-5" : undefined}>
          <enhanced:img
            src={image}
            sizes={isCarousel ? "(min-width: 768px) 200px, 168px" : "(min-width: 1600px) 208px, (min-width: 816px) calc((100vw - 160px) / 7), 94px"}
            alt="Line drawing of Rexan from the front in {year}"
            loading="lazy"
            class="w-full h-auto"
          />
        </div>
        {#if isCarousel}
        <!-- The label stretches to fill the fabric below the drawing, so every
             card's label is the height of the longest chapter. -->
        <div class="flex-1 flex justify-center pt-6 pb-7">
          <div class="fabric-shadow w-[82%] flex bg-orange-50 p-1">
            <div class="flex-1 border border-gold outline outline-gold/40 -outline-offset-4 px-3 pt-2.5 pb-3">
              <p class="font-mono text-[10px] leading-snug uppercase tracking-[0.14em] text-gold-dark">
                {themeOf(year)}
              </p>
              <p class="mt-1 font-garamond text-3xl text-orange-950">{year}</p>
              <p class="mt-2 font-serif text-sm text-orange-950 leading-relaxed">{story}</p>
            </div>
          </div>
        </div>
        {:else}
          <p class="relative mt-3 h-9 font-garamond text-3xl text-orange-950">
            <span class="absolute -translate-x-1/2" style:left={`${chassisCenter / 542 * 100}%`}>{year}</span>
          </p>
        {/if}
      </li>
    {/each}
  </ul>

  {#if isCarousel}
  <div class="px-6 mt-4">
    <div class="mx-auto max-w-(--reading-width,65ch) flex items-center justify-end gap-3">
      {@render pageButton(-1, atStart)}
      {@render pageButton(1, atEnd)}
    </div>
  </div>
  {/if}
</div>

<style>
  .wash {
    background-color: color-mix(in oklab, var(--tint) 16%, var(--color-orange-50));
  }
</style>
