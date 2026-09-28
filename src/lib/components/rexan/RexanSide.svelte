<svelte:options namespace="svg" />

<script>
  // Rexan from the passenger side, the parts both sound diagrams share. Render
  // inside an <svg>; each diagram slots its own speakers and throw between layers.
  // Geometry from the Dropbox diagram SVGs: 7.5 units = 1 ft, ground at y=722,
  // top bar at x=150.
  let {
    coverage = undefined, // behind the car
    brackets = undefined, // side brackets, over the car
    beforeTop = undefined, // under the K12.2 box
    underTop = undefined, // hung under the K12.2 box
  } = $props();
</script>

{@render coverage?.()}

<!-- car body, cab, wheels -->
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
{@render brackets?.()}

<!-- top bar post and K12.2 -->
<line x1="150" y1="650.75" x2="150" y2="669.5" class="stroke-orange-950/50" stroke-width="2" />
{@render beforeTop?.()}
<rect x="145" y="635.2" width="10" height="16" rx="2" class="fill-sky-700" transform="rotate(-15 150 643.2)" />
{@render underTop?.()}

<!-- ear height, ground, distances -->
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
