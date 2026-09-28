<script>
  // Redrawn from "rexan 2027 side towers.svg" (Dropbox: Sundowners Rexan blog post).
  // The source's side view sat 53 units higher; it's shifted down to share
  // RexanSide's ground line, with the viewBox moved to match.
  import DiagramPanel from "./DiagramPanel.svelte";
  import LegendItem from "./LegendItem.svelte";
  import RexanOverhead from "./RexanOverhead.svelte";
  import RexanSide from "./RexanSide.svelte";
</script>

<figure class="font-sans text-orange-950 space-y-12">
  <DiagramPanel title="Overhead, to scale" sides>
    <svg viewBox="56 40 388 270" class="w-full h-auto max-w-lg mx-auto" role="img" aria-labelledby="towers-overhead-title">
      <title id="towers-overhead-title">Overhead view of the 2027 concept: line array boxes flown under the tops, subs split into side towers</title>
      <RexanOverhead coneFill="fill-sky-600/10" scaleBarY={290}>
        {#snippet coverage()}
          <!-- LA112 cones, 90° horizontal -->
          <g class="fill-violet-500/15 stroke-violet-700" stroke-width="0.8" stroke-dasharray="5 3">
            <path d="M219.2 195.0 L74.4 156.2 A150.0 150.0 0 0 1 258.1 50.1 Z" />
            <path d="M280.8 195.0 L241.9 50.1 A150.0 150.0 0 0 1 425.6 156.2 Z" />
          </g>
        {/snippet}
        {#snippet brackets()}
          <!-- driver bracket: KS118 stack -->
          <rect x="205.75" y="190.5" width="12.75" height="19.5" rx="2" class="fill-orange-600" />
          <path d="M218.5 193.5H220M218.5 207H220" class="stroke-orange-950/50" stroke-width="2" />
          <!-- passenger bracket: LS218 on end -->
          <rect x="281.5" y="191.625" width="15.75" height="17.25" rx="2" class="fill-red-900" />
          <path d="M280 193.5H281.5M280 207H281.5" class="stroke-orange-950/50" stroke-width="2" />
        {/snippet}
        {#snippet underTops()}
          <!-- LA112s hung under the K12.2 pairs -->
          <g class="fill-violet-300 stroke-violet-700" stroke-width="1">
            <rect x="211.375" y="189.75" width="15.75" height="10.5" rx="2" />
            <rect x="272.875" y="189.75" width="15.75" height="10.5" rx="2" />
          </g>
        {/snippet}
      </RexanOverhead>
    </svg>

    {#snippet legend()}
      <LegendItem swatch="bg-violet-300 ring-1 ring-violet-700">
        <strong class="text-orange-950">LA112 ×4</strong>, two hung under each K12.2 pair at the bar ends. 90° horizontal.
      </LegendItem>
      <LegendItem swatch="bg-sky-700">
        <strong class="text-orange-950">K12.2 ×4</strong> on the top bar, unchanged. Now secondary fill.
      </LegendItem>
      <LegendItem swatch="bg-red-900">
        <strong class="text-orange-950">LS218 ×1</strong> on end, on the passenger bracket (184 lb).
      </LegendItem>
      <LegendItem swatch="bg-orange-600">
        <strong class="text-orange-950">KS118 ×2</strong> stacked on a new driver-side bracket (about 208 lb).
      </LegendItem>
      <LegendItem swatch="bg-emerald-600">
        <strong class="text-orange-950">K12.2 monitors</strong> on the open windscreen frame.
      </LegendItem>
    {/snippet}
  </DiagramPanel>

  <DiagramPanel title="Side view from the passenger side, to scale · front →">
    <svg viewBox="56 510 428 245" class="w-full h-auto" role="img" aria-labelledby="towers-side-title">
      <title id="towers-side-title">Side view of the 2027 concept showing the line array throwing over the crowd</title>
      <RexanSide>
        {#snippet coverage()}
          <!-- K12.2 throw -->
          <path d="M150 643.2 L457.2 516 L484 516 L484 722 L210.4 722 Z" class="fill-sky-600/10" />
          <g class="stroke-sky-600" stroke-width="0.75">
            <line x1="150" y1="643.2" x2="457.2" y2="516" stroke-dasharray="2 3" />
            <line x1="150" y1="643.2" x2="210.4" y2="722" stroke-dasharray="6 3" />
          </g>
          <!-- LA112 throw -->
          <path d="M150 660.5 L484 634.2 L484 722 L314.5 722 Z" class="fill-violet-500/20" />
          <g class="stroke-violet-700">
            <line x1="150" y1="660.5" x2="484" y2="634.2" stroke-dasharray="2 3" />
            <line x1="150" y1="660.5" x2="314.5" y2="722" stroke-dasharray="6 3" />
          </g>
        {/snippet}
        {#snippet brackets()}
          <!-- KS118 stack on the far side (dashed), LS218 on the near side -->
          <rect x="135" y="675.5" width="19.5" height="31.5" rx="2" class="fill-none stroke-orange-600" stroke-dasharray="3 2" />
          <rect x="136.125" y="681.5" width="17.25" height="25.5" rx="2" class="fill-red-900" />
        {/snippet}
        {#snippet underTop()}
          <!-- LA112 pair under the K12.2 -->
          <g class="fill-violet-300 stroke-violet-700" stroke-width="1">
            <rect x="144.8" y="650.8" width="10.5" height="9.75" rx="1.5" transform="rotate(-3 150 655.6)" />
            <rect x="144.8" y="660.5" width="10.5" height="9.75" rx="1.5" transform="rotate(-13 150 665.4)" />
          </g>
        {/snippet}
      </RexanSide>
    </svg>

    {#snippet legend()}
      <LegendItem line="stroke-violet-700" dash="2 3">
        LA112 pair hung from the bar ends, about 6.9 to 9.5 ft up. The top box, about 3° down, reaches ear height about 55 ft out, over the crowd.
      </LegendItem>
      <LegendItem line="stroke-violet-700" dash="6 3">
        The bottom box, about 13° down: its lower edge reaches ear height about 2 ft past the hood.
      </LegendItem>
      <LegendItem swatch="bg-red-900">
        LS218 (near side, solid) and the KS118 stack (far side, dashed) sit about 11 to 12 ft apart. Bass sums straight ahead and behind, with a dip around 50 Hz directly off each side.
      </LegendItem>
      <LegendItem swatch="bg-orange-950/30">
        Weight: 184 lb on the passenger side vs about 208 lb on the driver side, both low and between the axles.
      </LegendItem>
    {/snippet}
  </DiagramPanel>

  <p class="text-xs text-orange-950/60">
    Heights and aims are estimates; cones are illustrative. LA112: 47 lb, 15.4 in tall, 90° × 15°, 136 dB peak. LS218: 184 lb, 141 dB peak.
  </p>
</figure>
