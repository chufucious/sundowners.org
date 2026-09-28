<svelte:options namespace="svg" />

<!--
  The parts of Rexan both sound diagrams draw the same way, as snippets so each
  diagram can layer its own speakers and coverage in between.
  Geometry from the Dropbox diagram SVGs: 7.5 units = 1 ft, car 16 x 8 ft.
  Overhead: top bar at y=195. Side view: ground at y=722, top bar at x=150.
-->
<script module>
  export {
    k12Cones,
    overheadCarBody,
    overheadCarLabels,
    overheadMonitors,
    overheadTopBar,
    overheadK12s,
    overheadCompass,
    sideCar,
    sideBarPost,
    sideK12,
    sideGround,
  };
</script>

<!-- Overhead -->

{#snippet k12Cones(fillClass)}
  <!-- K12.2 coverage, 75°, drawn to 20 ft -->
  <g class={fillClass}>
    <path d="M214.8 195.0 L64.9 188.5 A150.0 150.0 0 0 1 182.3 48.6 Z" />
    <path d="M223.8 195.0 L100.1 110.0 A150.0 150.0 0 0 1 273.8 53.6 Z" />
    <path d="M276.2 195.0 L226.2 53.6 A150.0 150.0 0 0 1 399.9 110.0 Z" />
    <path d="M285.2 195.0 L317.7 48.6 A150.0 150.0 0 0 1 435.1 188.5 Z" />
  </g>
{/snippet}

{#snippet overheadCarBody()}
  <g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
    <rect x="231.25" y="150" width="37.5" height="26.5" rx="4" />
    <rect x="220" y="172.5" width="60" height="97.5" rx="6" />
  </g>
{/snippet}

{#snippet overheadCarLabels()}
  <rect x="235" y="175.5" width="30" height="12" rx="3" class="fill-none stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
  <g class="fill-orange-950/80 text-[11px]" text-anchor="middle" dominant-baseline="central">
    <text x="250" y="161.25">Hood</text>
    <text x="250" y="181.5">DJ</text>
    <text x="250" y="232.5" class="text-[13px]">Deck</text>
  </g>
{/snippet}

{#snippet overheadMonitors()}
  <!-- open windscreen frame with a monitor at each end -->
  <line x1="212.5" y1="172.5" x2="287.5" y2="172.5" class="stroke-orange-950/50" stroke-width="1.5" />
  <rect x="210.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
  <rect x="279.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
{/snippet}

{#snippet overheadTopBar()}
  <line x1="211" y1="195" x2="289" y2="195" class="stroke-orange-950/50" stroke-width="2" />
{/snippet}

{#snippet overheadK12s()}
  <!-- K12.2 pairs at the top bar ends -->
  <g class="fill-sky-700">
    <rect x="210.25" y="190" width="9" height="10" rx="2" />
    <rect x="219.25" y="190" width="9" height="10" rx="2" />
    <rect x="271.75" y="190" width="9" height="10" rx="2" />
    <rect x="280.75" y="190" width="9" height="10" rx="2" />
  </g>
{/snippet}

{#snippet overheadCompass(scaleBarY)}
  <!-- "Front" arrow top left, 10 ft scale bar bottom left -->
  <g class="fill-orange-950/70 stroke-orange-950/70 text-[13px]">
    <text x="78" y="56" text-anchor="middle" stroke="none">Front</text>
    <path d="M78 104 L78 68 M72 74 L78 67 L84 74" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M70 {scaleBarY} h75 M70 {scaleBarY - 5} v10 M145 {scaleBarY - 5} v10" fill="none" stroke-width="1.5" />
    <text x="152" y={scaleBarY + 4} stroke="none">10 ft</text>
  </g>
{/snippet}

<!-- Side view, from the passenger side -->

{#snippet sideCar()}
  <g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
    <rect x="75" y="669.5" width="97.5" height="41.25" rx="4" />
    <rect x="172.5" y="692" width="22.5" height="18.75" rx="3" />
  </g>
  <g class="fill-orange-950/50">
    <circle cx="178.5" cy="712.25" r="9.75" />
    <circle cx="99" cy="712.25" r="9.75" />
  </g>
  <!-- windscreen frame and its monitor -->
  <path d="M172.5 692 L170.25 665.75 L163.5 665.75" class="fill-none stroke-orange-950/60" stroke-width="1.5" />
  <rect x="165.25" y="656.75" width="10" height="8" rx="2" class="fill-emerald-600" />
  <rect x="157.5" y="662" width="12" height="41.25" rx="3" class="fill-white/60 stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
  <text x="163.5" y="680" text-anchor="middle" dominant-baseline="central" class="fill-orange-950/80 text-[11px]">DJ</text>
  <text x="104" y="689.75" text-anchor="middle" dominant-baseline="central" class="fill-orange-950/80 text-[13px]">Deck</text>
{/snippet}

{#snippet sideBarPost()}
  <line x1="150" y1="650.75" x2="150" y2="669.5" class="stroke-orange-950/50" stroke-width="2" />
{/snippet}

{#snippet sideK12()}
  <rect x="145" y="635.2" width="10" height="16" rx="2" class="fill-sky-700" transform="rotate(-15 150 643.2)" />
{/snippet}

{#snippet sideGround()}
  <line x1="56" y1="682.6" x2="484" y2="682.6" class="stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="4 4" />
  <text x="480" y="675" text-anchor="end" class="fill-orange-950/70 text-[13px]">Ear height ~5 ft</text>
  <line x1="56" y1="722" x2="484" y2="722" class="stroke-orange-950/60" />
  <g class="fill-orange-950/70 stroke-orange-950/60 text-[13px]" text-anchor="middle">
    <path d="M225 722v5M300 722v5M375 722v5M450 722v5" />
    <text x="150" y="742" stroke="none">top bar</text>
    <text x="225" y="742" stroke="none">10 ft</text>
    <text x="300" y="742" stroke="none">20 ft</text>
    <text x="375" y="742" stroke="none">30 ft</text>
    <text x="450" y="742" stroke="none">40 ft</text>
  </g>
{/snippet}
