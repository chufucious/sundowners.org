<script>
  // One card per year Rexan went out. Cropped from rexan-evolution-2026.png
  // so each year can be read at phone width instead of as one tiny strip.
  import evolution2017 from "$lib/assets/rexan-sound/evolution-2017.png?w=280;542&enhanced";
  import evolution2018 from "$lib/assets/rexan-sound/evolution-2018.png?w=280;542&enhanced";
  import evolution2019 from "$lib/assets/rexan-sound/evolution-2019.png?w=280;542&enhanced";
  import evolution2022 from "$lib/assets/rexan-sound/evolution-2022.png?w=280;542&enhanced";
  import evolution2023 from "$lib/assets/rexan-sound/evolution-2023.png?w=280;542&enhanced";
  import evolution2025 from "$lib/assets/rexan-sound/evolution-2025.png?w=280;542&enhanced";
  import evolution2026 from "$lib/assets/rexan-sound/evolution-2026.png?w=280;542&enhanced";

  // Notes are condensed from the post's own account of each year.
  const years = [
    { year: 2017, image: evolution2017, note: "Two Behringers at the back for riders" },
    { year: 2018, image: evolution2018, note: "Same Behringers, no DJ setup yet" },
    { year: 2019, image: evolution2019, note: "Two more Behringers, a sub, our first DJ setup" },
    { year: 2022, image: evolution2022, note: "First QSC rig: two K12.2s up top, one KS118" },
    { year: 2023, image: evolution2023, note: "Four K12.2s up top, a second KS118" },
    { year: 2025, image: evolution2025, note: "K10.2s up top next to two working K12.2s" },
    { year: 2026, image: evolution2026, note: "All four K12.2s working again" },
  ];

  let track;
  let active = $state(0);
  let atStart = $state(true);
  let atEnd = $state(false);

  // Card i is snapped when the track has scrolled by its distance from card 0.
  function snapLeft(i) {
    return track.children[i].offsetLeft - track.children[0].offsetLeft;
  }

  function scrollBehavior() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  // Always scroll to an exact card position: Safari doesn't re-snap after a
  // smooth programmatic scroll, so it would stop wherever the scroll ended.
  // Later cards can't reach the text edge on wide screens; stop at the end.
  function scrollToCard(i) {
    const end = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.min(snapLeft(i), end), behavior: scrollBehavior() });
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
    const first = track.children[0].getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const perPage = Math.max(1, Math.floor((track.clientWidth - first) / snapLeft(1)));
    scrollToCard(Math.min(years.length - 1, Math.max(0, leftmostCard() + direction * perPage)));
  }

  // Wide screens can't scroll the last cards to the left edge, so at the
  // end of the track the last dot is the active one.
  function updatePosition() {
    atStart = track.scrollLeft <= 1;
    atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    active = atEnd ? years.length - 1 : leftmostCard();
  }

  // Resizing changes how many cards fit, which can move the ends without a scroll.
  $effect(updatePosition);
</script>

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
  <!-- The first card lines up with the page's text column (max-w-xl px-6):
       --edge plus the 1rem gap equals that column's left text edge. The edges
       are ::before/::after spacers, not padding, because older Safari drops
       end padding in a scrolling flex row and the last card couldn't clear. -->
  <ul
    bind:this={track}
    onscroll={updatePosition}
    style="--edge: max(0.5rem, calc((100% - 36rem) / 2 + 0.5rem))"
    class="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-[calc(var(--edge)+1rem)] pb-2 before:w-(--edge) before:shrink-0 after:w-(--edge) after:shrink-0"
  >
    {#each years as { year, image, note }, i (year)}
      <li
        class="snap-start shrink-0 w-56 md:w-64 bg-white/60 rounded-3xl p-5 flex flex-col"
        aria-label="{i + 1} of {years.length}: {year}"
      >
        <enhanced:img
          src={image}
          sizes="(min-width: 768px) 216px, 184px"
          alt="Line drawing of Rexan from the front in {year}"
          loading="lazy"
          class="w-full h-auto"
        />
        <p class="mt-4 font-garamond text-3xl text-orange-950">{year}</p>
        <p class="mt-1 font-mono text-xs text-orange-950/70 leading-relaxed">{note}</p>
      </li>
    {/each}
  </ul>

  <div class="mx-auto max-w-xl px-6 mt-4 flex items-center justify-end gap-3">
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
