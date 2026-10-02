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

  // Notes are condensed from the post's own account of each year. `tint` is
  // the fabric's key colour: washed pale behind the drawing, a 1px edge that
  // keeps the card's shape where a fabric's light strokes meet the page, and
  // the label's shadow.
  const years = [
    { year: 2017, image: evolution2017, fabric: sunflower, tint: "#a07517", note: "Two Behringers at the back for riders" },
    { year: 2018, image: evolution2018, fabric: fans, tint: "#8c2425", note: "Same Behringers, no DJ setup yet" },
    { year: 2019, image: evolution2019, fabric: spirograph, tint: "#1b5965", note: "Two more Behringers, a sub, our first DJ setup" },
    { year: 2022, image: evolution2022, fabric: mic, tint: "#d9914b", note: "First QSC rig: two K12.2s up top, one KS118" },
    { year: 2023, image: evolution2023, fabric: eyes, tint: "#7e1132", note: "Four K12.2s up top, a second KS118" },
    { year: 2025, image: evolution2025, fabric: feathers, tint: "#535939", note: "K10.2s up top next to two working K12.2s" },
    { year: 2026, image: evolution2026, fabric: redstrokes, tint: "#b23b39", note: "All four K12.2s working again" },
  ];

  let track;
  let active = $state(0);
  let atStart = $state(true);
  let atEnd = $state(false);

  // Card i is snapped when the track has scrolled by its distance from card 0.
  function snapLeft(i) {
    return track.children[i].offsetLeft - track.children[0].offsetLeft;
  }

  // Always scroll to an exact card position: Safari doesn't re-snap after a
  // smooth programmatic scroll, so it would stop wherever the scroll ended.
  // Later cards can't reach the text edge on wide screens; stop at the end.
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

  // Moves by as many whole cards as fit right of the text edge: one on phones.
  function scrollByPage(direction) {
    const textEdge = track.children[0].getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const perPage = Math.max(1, Math.floor((track.clientWidth - textEdge) / snapLeft(1)));
    scrollToCard(Math.min(years.length - 1, Math.max(0, leftmostCard() + direction * perPage)));
  }

  // Wide screens can't scroll the last cards to the left edge, so at the
  // end of the track the last dot is the active one.
  function updatePosition() {
    atStart = track.scrollLeft <= 1;
    atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    active = atEnd ? years.length - 1 : leftmostCard();
  }

  $effect(updatePosition);
</script>

<!-- Resizing changes how many cards fit, which can move the ends without a scroll. -->
<svelte:window onresize={updatePosition} />

{#snippet pageButton(direction, disabled)}
  <button
    type="button"
    onclick={() => scrollByPage(direction)}
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

<div role="region" aria-roledescription="carousel" aria-label="Rexan, year by year">
  <!-- The first card lines up with the 65ch reading column:
       --edge plus the 1rem gap equals the text edge, with 1.5rem phone gutters. The edges
       are ::before/::after spacers, not padding, because older Safari drops
       end padding in a scrolling flex row and the last card couldn't clear. -->
  <ul
    bind:this={track}
    onscroll={updatePosition}
    style="--edge: max(0.5rem, calc((100% - var(--reading-width, 65ch)) / 2 - 1rem))"
    class="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-[calc(var(--edge)+1rem)] pb-2 before:w-(--edge) before:shrink-0 after:w-(--edge) after:shrink-0"
  >
    <!-- Each card: the drawing on a pale wash of its year's fabric, then the
         fabric itself with a cream label on it, like the label on a length
         of wax print (a gold double rule, that year's Burning Man theme). -->
    {#each years as { year, image, fabric, tint, note }, i (year)}
      <li
        class="pattern-frame ring-1 ring-inset ring-(--tint) snap-start shrink-0 w-56 md:w-64 p-2 flex flex-col"
        style:background-image="url({fabric})"
        style:--tint={tint}
        aria-label="{i + 1} of {years.length}: {year}"
      >
        <div class="wash px-5 pt-5">
          <enhanced:img
            src={image}
            sizes="(min-width: 768px) 200px, 168px"
            alt="Line drawing of Rexan from the front in {year}"
            loading="lazy"
            class="w-full h-auto"
          />
        </div>
        <!-- The label stretches to fill the fabric below the drawing, so every
             card's label is the height of the longest note's. -->
        <div class="flex-1 flex justify-center pt-6 pb-7">
          <div class="label w-[82%] flex bg-orange-50 p-1">
            <div class="flex-1 border border-gold outline outline-gold/40 -outline-offset-4 px-3 pt-2.5 pb-3">
              <p class="font-mono text-[10px] leading-snug uppercase tracking-[0.14em] text-gold-dark">
                {themeOf(year)}
              </p>
              <p class="mt-1 font-garamond text-3xl text-orange-950">{year}</p>
              <p class="mt-1 font-mono text-xs text-orange-950/70 leading-relaxed">{note}</p>
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ul>

  <div class="px-6 mt-4">
    <div class="mx-auto max-w-(--reading-width,65ch) flex items-center justify-end gap-3">
      <div class="flex items-center gap-2 rounded-full bg-orange-950/10 px-3 h-9">
        {#each years as { year }, i (year)}
          <button
            type="button"
            onclick={() => scrollToCard(i)}
            aria-label="Show {year}"
            aria-current={active === i || undefined}
            class={[
              "h-2 rounded-full transition-all cursor-pointer",
              active === i ? "w-6 bg-orange-950/70" : "w-2 bg-orange-950/30 hover:bg-orange-950/50",
            ]}
          ></button>
        {/each}
      </div>
      {@render pageButton(-1, atStart)}
      {@render pageButton(1, atEnd)}
    </div>
  </div>
</div>

<style>
  .wash {
    background-color: color-mix(in oklab, var(--tint) 16%, var(--color-orange-50));
  }

  /* Lying flat on the cloth: three faint layers, each twice the last, in a
     dark shade of the fabric's own colour rather than grey. */
  .label {
    --shade: color-mix(in oklab, color-mix(in oklab, var(--tint) 50%, black) 14%, transparent);
    box-shadow:
      0 1px 1px var(--shade),
      0 2px 2px var(--shade),
      0 4px 4px var(--shade);
  }
</style>
