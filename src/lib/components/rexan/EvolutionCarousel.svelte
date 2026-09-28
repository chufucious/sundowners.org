<script>
  // One card per year Rexan went out. Cropped from rexan-evolution-2026.png
  // so each year can be read at phone width instead of as one tiny strip.
  import e2017 from "$lib/assets/rexan-sound/evolution-2017.png?w=280;542&format=webp&as=srcset";
  import e2018 from "$lib/assets/rexan-sound/evolution-2018.png?w=280;542&format=webp&as=srcset";
  import e2019 from "$lib/assets/rexan-sound/evolution-2019.png?w=280;542&format=webp&as=srcset";
  import e2022 from "$lib/assets/rexan-sound/evolution-2022.png?w=280;542&format=webp&as=srcset";
  import e2023 from "$lib/assets/rexan-sound/evolution-2023.png?w=280;542&format=webp&as=srcset";
  import e2025 from "$lib/assets/rexan-sound/evolution-2025.png?w=280;542&format=webp&as=srcset";
  import e2026 from "$lib/assets/rexan-sound/evolution-2026.png?w=280;542&format=webp&as=srcset";

  const years = [
    { year: 2017, srcset: e2017, note: "Two Behringers facing the riders" },
    { year: 2018, srcset: e2018, note: "Still a safari tour with a soundtrack" },
    { year: 2019, srcset: e2019, note: "Forward speakers, a sub, our first DJ setup" },
    { year: 2022, srcset: e2022, note: "First year on QSC" },
    { year: 2023, srcset: e2023, note: "Four K12.2s up top, two KS118s" },
    { year: 2025, srcset: e2025, note: "K10.2s filling in up top" },
    { year: 2026, srcset: e2026, note: "All four K12.2s back, new solar" },
  ];

  let track;
  let active = $state(0);
  let atStart = $state(true);
  let atEnd = $state(false);

  // The first card lines up with the text column (see the track's padding),
  // so card i is snapped when the track has scrolled by its distance from card 0.
  function snapLeft(i) {
    return track.children[i].offsetLeft - track.children[0].offsetLeft;
  }

  function behavior() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  function goTo(i) {
    track.scrollTo({ left: snapLeft(Math.max(0, Math.min(years.length - 1, i))), behavior: behavior() });
  }

  function page(direction) {
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: behavior() });
  }

  function update() {
    atStart = track.scrollLeft <= 1;
    atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    if (atEnd) {
      active = years.length - 1;
      return;
    }
    let nearest = 0;
    for (let i = 0; i < years.length; i++) {
      if (Math.abs(snapLeft(i) - track.scrollLeft) < Math.abs(snapLeft(nearest) - track.scrollLeft)) nearest = i;
    }
    active = nearest;
  }
</script>

<div class="relative" role="region" aria-roledescription="carousel" aria-label="Rexan, year by year">
  <ul
    bind:this={track}
    onscroll={update}
    class="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-[max(1.5rem,calc((100%-42rem)/2))] scroll-px-[max(1.5rem,calc((100%-42rem)/2))] pb-2"
  >
    {#each years as { year, srcset, note }, i (year)}
      <li
        class="snap-start shrink-0 w-56 md:w-64 bg-white/60 rounded-3xl p-5 flex flex-col"
        aria-label="{i + 1} of {years.length}: {year}"
      >
        <img
          {srcset}
          sizes="(max-width: 768px) 176px, 216px"
          width="542"
          height="870"
          alt="Line drawing of Rexan from the front in {year}"
          loading="lazy"
          class="w-full h-auto"
        />
        <p class="mt-4 font-sans text-2xl font-light text-orange-950">{year}</p>
        <p class="font-sans text-xs text-orange-950/70 leading-snug">{note}</p>
      </li>
    {/each}
  </ul>

  <div class="mx-auto max-w-2xl px-6 mt-4 flex items-center justify-end gap-3">
    <div class="flex items-center gap-2 rounded-full bg-orange-950/10 px-3 h-9">
      {#each years as { year }, i (year)}
        <button
          type="button"
          onclick={() => goTo(i)}
          aria-label="Show {year}"
          aria-current={active === i}
          class={[
            "h-2 rounded-full transition-all cursor-pointer",
            active === i ? "w-6 bg-orange-950/70" : "w-2 bg-orange-950/30 hover:bg-orange-950/50",
          ]}
        ></button>
      {/each}
    </div>
    <button
      type="button"
      onclick={() => page(-1)}
      disabled={atStart}
      aria-label="Previous years"
      class="size-9 rounded-full bg-orange-950/10 hover:bg-orange-950/20 disabled:opacity-40 disabled:hover:bg-orange-950/10 text-orange-950 grid place-items-center cursor-pointer disabled:cursor-default"
    >
      <svg viewBox="0 0 16 16" class="size-4" aria-hidden="true"
        ><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg
      >
    </button>
    <button
      type="button"
      onclick={() => page(1)}
      disabled={atEnd}
      aria-label="Next years"
      class="size-9 rounded-full bg-orange-950/10 hover:bg-orange-950/20 disabled:opacity-40 disabled:hover:bg-orange-950/10 text-orange-950 grid place-items-center cursor-pointer disabled:cursor-default"
    >
      <svg viewBox="0 0 16 16" class="size-4" aria-hidden="true"
        ><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg
      >
    </button>
  </div>
</div>
