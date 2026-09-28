<script>
  // Redrawn from "rexan sound current v2.svg" (Dropbox: Sundowners Rexan blog post).
  // Only the drawing lives in the SVG; legends, table and notes are HTML.
  import DiagramPanel from "./DiagramPanel.svelte";
  import LegendItem from "./LegendItem.svelte";
  import RexanOverhead from "./RexanOverhead.svelte";
  import RexanSide from "./RexanSide.svelte";

  // KS118 rings at 5 / 10 / 20 ft, fainter as they widen.
  const subRings = [
    { r: 37.5, width: 1, opacity: 1 },
    { r: 75, width: 0.8, opacity: 0.8 },
    { r: 150, width: 0.6, opacity: 0.6 },
  ];

  const splByModel = [
    { model: "K12.2 (tops)", qty: 4, coverage: "75° conical", db: [132, 122, 114, 108, 102] },
    { model: "K10.2 (DJ monitors)", qty: 2, coverage: "90° conical", db: [130, 120, 112, 106, 100] },
    { model: "KS118 (sub)", qty: 1, coverage: "Omni", db: [136, 126, 118, 112, 106] },
    { model: "KS118 ×2 stacked", qty: 2, coverage: "Omni, coupled", db: [142, 132, 124, 118, 112] },
  ];
  const distances = ["@1 m", "10 ft", "25 ft", "50 ft", "100 ft"];
</script>

{#snippet rings(cx, cy)}
  <g class="fill-none stroke-orange-600" stroke-dasharray="4 3">
    {#each subRings as { r, width, opacity } (r)}
      <circle {cx} {cy} {r} stroke-width={width} stroke-opacity={opacity} />
    {/each}
  </g>
{/snippet}

<figure class="font-mono text-orange-950 space-y-12">
  <DiagramPanel title="Overhead, to scale" sides>
    <svg viewBox="56 40 388 316" class="w-full h-auto max-w-lg mx-auto" role="img" aria-labelledby="current-overhead-title">
      <title id="current-overhead-title">Overhead view of Rexan's current speaker layout and coverage</title>
      <RexanOverhead coneFill="fill-emerald-600/15" scaleBarY={336}>
        {#snippet coverage()}
          {@render rings(286.375, 200.25)}
        {/snippet}
        {#snippet overCar()}
          <!-- K10.2 cones, cross-firing at the DJ -->
          <g class="fill-amber-600/20">
            <path d="M215.5 172.5 L267.3 142.2 A60.0 60.0 0 0 1 245.8 224.3 Z" />
            <path d="M284.5 172.5 L254.2 224.3 A60.0 60.0 0 0 1 232.7 142.2 Z" />
          </g>
        {/snippet}
        {#snippet brackets()}
          <!-- passenger bracket with the KS118 stack -->
          <path d="M280 192H281.5M280 208.5H281.5" class="stroke-orange-950/50" stroke-width="2" />
          <rect x="281.5" y="189" width="9.75" height="22.5" rx="2" class="fill-orange-600" />
          <line x1="281.5" y1="200.25" x2="291.25" y2="200.25" class="stroke-orange-100" stroke-width="1" />
        {/snippet}
      </RexanOverhead>
    </svg>

    {#snippet legend()}
      <LegendItem swatch="bg-emerald-600">
        <strong class="text-orange-950">K12.2 ×4</strong> in pairs at the ends of the top bar, 6 ft back from the front. 75° coverage, drawn out to 20 ft from the top bar.
      </LegendItem>
      <LegendItem swatch="bg-orange-600">
        <strong class="text-orange-950">KS118 ×2</strong> stacked on the passenger bracket. Rings at 5, 10 and 20 ft.
      </LegendItem>
      <LegendItem swatch="bg-amber-600">
        <strong class="text-orange-950">K10.2 ×2</strong> at the ends of the open windscreen frame. 90° coverage, cross-firing at the DJ.
      </LegendItem>
    {/snippet}
  </DiagramPanel>

  <DiagramPanel title="Side view from the passenger side, to scale · front →">
    <svg viewBox="56 500 428 250" class="w-full h-auto" role="img" aria-labelledby="current-side-title">
      <title id="current-side-title">Side view of Rexan showing how far the top speakers throw</title>
      <defs>
        <clipPath id="current-side-above"><rect x="0" y="0" width="500" height="722" /></clipPath>
      </defs>
      <RexanSide>
        {#snippet coverage()}
          <!-- KS118 rings, cut off at the ground -->
          <g clip-path="url(#current-side-above)">{@render rings(144.75, 689.75)}</g>
          <path d="M150 643.2 L481.4 506 L484 506 L484 722 L210.4 722 Z" class="fill-emerald-600/15" />
          <path d="M170.2 665.8 L116.6 692.6 A60.0 60.0 0 0 1 143.4 612.1 Z" class="fill-amber-600/20" />
        {/snippet}
        {#snippet brackets()}
          <!-- KS118 stack on the bracket -->
          <rect x="133.5" y="672.5" width="22.5" height="34.5" rx="2" class="fill-orange-600" />
          <line x1="133.5" y1="689.75" x2="156" y2="689.75" class="stroke-orange-100" stroke-width="1" />
        {/snippet}
        {#snippet beforeTop()}
          <!-- K12.2 throw: upper edge, on-axis, lower edge -->
          <g class="stroke-emerald-800">
            <line x1="150" y1="643.2" x2="481.4" y2="506" stroke-dasharray="2 3" />
            <line x1="150" y1="643.2" x2="443.9" y2="722" stroke-width="1.5" />
            <line x1="150" y1="643.2" x2="210.4" y2="722" stroke-dasharray="6 3" />
          </g>
        {/snippet}
      </RexanSide>
    </svg>

    {#snippet legend()}
      <LegendItem line="stroke-emerald-800" dash="6 3">K12.2 lower edge, 52° down: lands about 2 ft past the hood.</LegendItem>
      <LegendItem line="stroke-emerald-800" width={1.5}>
        K12.2 on-axis, 15° down: reaches ear height about 20 ft from the bar, 14 ft past the hood.
      </LegendItem>
      <LegendItem line="stroke-emerald-800" dash="2 3">K12.2 upper edge, 22° up: carries over heads to the far field.</LegendItem>
      <LegendItem swatch="bg-amber-600">K10.2 on the open windscreen frame (about 7.5 ft up), aimed back at the DJ.</LegendItem>
      <LegendItem swatch="bg-orange-600">KS118 ×2 on the bracket (about 2 to 6.5 ft up). Rings at 5, 10 and 20 ft.</LegendItem>
    {/snippet}
  </DiagramPanel>

  <section>
    <h3 class="eyebrow mb-2">Projected SPL per speaker class (peak, dB)</h3>
    <div class="overflow-x-auto -mx-6 px-6">
      <table class="w-full min-w-lg text-xs text-orange-950/80 bg-orange-950/5 rounded tabular-nums">
        <thead class="text-orange-950 text-left">
          <tr class="border-b border-orange-950/10">
            <th class="p-2 font-semibold">Model</th>
            <th class="p-2 font-semibold">Qty</th>
            <th class="p-2 font-semibold">Coverage</th>
            {#each distances as distance (distance)}
              <th class="p-2 font-semibold text-right">{distance}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each splByModel as { model, qty, coverage, db } (model)}
            <tr class="border-b border-orange-950/10 last:border-0">
              <td class="p-2 whitespace-nowrap">{model}</td>
              <td class="p-2">{qty}</td>
              <td class="p-2 whitespace-nowrap">{coverage}</td>
              {#each db as value, i (i)}
                <td class="p-2 text-right">{value}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <details class="mt-4 text-xs text-orange-950/70">
      <summary class="cursor-pointer text-orange-950 underline hover:text-orange-500">How we estimated this</summary>
      <ul class="mt-2 list-disc pl-5 space-y-1">
        <li>Per-box peak SPL from QSC specs, free field, −6 dB per doubling of distance.</li>
        <li>Continuous (music) level runs about 6 dB below peak. Stacked subs add about 6 dB from coupling.</li>
        <li>Overlapping K12.2 cones add about 3 dB in front. Ignores the crowd and high-frequency air absorption.</li>
        <li>The tops sit about 10.5 ft up, so inside about 10 ft the K12.2 levels run about 3 dB lower (slant distance).</li>
        <li>Heights of the cab, frame, DJ and sub bracket are estimates. Cones and rings are illustrative.</li>
      </ul>
    </details>
  </section>
</figure>
