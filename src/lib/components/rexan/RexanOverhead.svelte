<svelte:options namespace="svg" />

<script>
  // Rexan from above, the parts both sound diagrams share. Render inside an
  // <svg>; each diagram slots its own speakers and coverage between the layers.
  // Geometry from the Dropbox diagram SVGs: 7.5 units = 1 ft, top bar at y=195.
  let {
    coneFill, // fill class for the K12.2 cones
    scaleBarY, // where the 10 ft scale bar sits, below the drawing
    coverage = undefined, // under the car
    overCar = undefined, // over the car body, under its labels
    brackets = undefined, // side brackets, under the top bar
    underTops = undefined, // hung from the top bar, under the K12.2s
  } = $props();
</script>

<!-- K12.2 coverage, 75°, drawn to 20 ft -->
<g class={coneFill}>
  <path d="M214.8 195.0 L64.9 188.5 A150.0 150.0 0 0 1 182.3 48.6 Z" />
  <path d="M223.8 195.0 L100.1 110.0 A150.0 150.0 0 0 1 273.8 53.6 Z" />
  <path d="M276.2 195.0 L226.2 53.6 A150.0 150.0 0 0 1 399.9 110.0 Z" />
  <path d="M285.2 195.0 L317.7 48.6 A150.0 150.0 0 0 1 435.1 188.5 Z" />
</g>
{@render coverage?.()}

<!-- car -->
<g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
  <rect x="231.25" y="150" width="37.5" height="26.5" rx="4" />
  <rect x="220" y="172.5" width="60" height="97.5" rx="6" />
</g>
{@render overCar?.()}
<rect x="235" y="175.5" width="30" height="12" rx="3" class="fill-none stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
<g class="fill-orange-950/80 text-[11px]" text-anchor="middle" dominant-baseline="central">
  <text x="250" y="161.25">Hood</text>
  <text x="250" y="181.5">DJ</text>
  <text x="250" y="232.5" class="text-[13px]">Deck</text>
</g>

<!-- open windscreen frame with a monitor at each end -->
<line x1="212.5" y1="172.5" x2="287.5" y2="172.5" class="stroke-orange-950/50" stroke-width="1.5" />
<rect x="210.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
<rect x="279.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
{@render brackets?.()}

<!-- top bar, with K12.2 pairs at its ends -->
<line x1="211" y1="195" x2="289" y2="195" class="stroke-orange-950/50" stroke-width="2" />
{@render underTops?.()}
<g class="fill-sky-700">
  <rect x="210.25" y="190" width="9" height="10" rx="2" />
  <rect x="219.25" y="190" width="9" height="10" rx="2" />
  <rect x="271.75" y="190" width="9" height="10" rx="2" />
  <rect x="280.75" y="190" width="9" height="10" rx="2" />
</g>

<!-- "Front" arrow top left, 10 ft scale bar bottom left -->
<g class="fill-orange-950/70 stroke-orange-950/70 text-[13px]">
  <text x="78" y="56" text-anchor="middle" stroke="none">Front</text>
  <path d="M78 104 L78 68 M72 74 L78 67 L84 74" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M70 {scaleBarY} h75 M70 {scaleBarY - 5} v10 M145 {scaleBarY - 5} v10" fill="none" stroke-width="1.5" />
  <text x="152" y={scaleBarY + 4} stroke="none">10 ft</text>
</g>
