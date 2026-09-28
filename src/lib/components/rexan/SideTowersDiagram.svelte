<script>
  // Redrawn from "rexan 2027 side towers.svg" (Dropbox: Sundowners Rexan blog post).
  // Same scale and car as CurrentRigDiagram: 7.5 units = 1 ft.
  import LegendLine from "./LegendLine.svelte";
</script>

<figure class="font-sans text-orange-950">
  <h3 class="text-xs uppercase tracking-wide text-orange-950/60 mb-2">Overhead, to scale</h3>
  <svg viewBox="56 40 388 270" class="w-full h-auto max-w-lg mx-auto" role="img" aria-labelledby="towers-overhead-title">
    <title id="towers-overhead-title">Overhead view of the 2027 concept: line array boxes flown under the tops, subs split into side towers</title>
    <!-- K12.2 cones, now secondary fill -->
    <g class="fill-sky-600/10">
      <path d="M214.8 195.0 L64.9 188.5 A150.0 150.0 0 0 1 182.3 48.6 Z" />
      <path d="M223.8 195.0 L100.1 110.0 A150.0 150.0 0 0 1 273.8 53.6 Z" />
      <path d="M276.2 195.0 L226.2 53.6 A150.0 150.0 0 0 1 399.9 110.0 Z" />
      <path d="M285.2 195.0 L317.7 48.6 A150.0 150.0 0 0 1 435.1 188.5 Z" />
    </g>
    <!-- LA112 cones, 90° horizontal -->
    <g class="fill-violet-500/15 stroke-violet-700" stroke-width="0.8" stroke-dasharray="5 3">
      <path d="M219.2 195.0 L74.4 156.2 A150.0 150.0 0 0 1 258.1 50.1 Z" />
      <path d="M280.8 195.0 L241.9 50.1 A150.0 150.0 0 0 1 425.6 156.2 Z" />
    </g>
    <!-- car -->
    <g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
      <rect x="231.25" y="150" width="37.5" height="26.5" rx="4" />
      <rect x="220" y="172.5" width="60" height="97.5" rx="6" />
    </g>
    <rect x="235" y="175.5" width="30" height="12" rx="3" class="fill-none stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
    <g class="fill-orange-950/80 text-[11px]" text-anchor="middle" dominant-baseline="central">
      <text x="250" y="161.25">Hood</text>
      <text x="250" y="181.5">DJ</text>
      <text x="250" y="232.5" class="text-[13px]">Deck</text>
    </g>
    <!-- windscreen frame + K12.2 monitors -->
    <line x1="212.5" y1="172.5" x2="287.5" y2="172.5" class="stroke-orange-950/50" stroke-width="1.5" />
    <rect x="210.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
    <rect x="279.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
    <!-- driver bracket: KS118 stack -->
    <rect x="205.75" y="190.5" width="12.75" height="19.5" rx="2" class="fill-orange-600" />
    <path d="M218.5 193.5H220M218.5 207H220" class="stroke-orange-950/50" stroke-width="2" />
    <!-- passenger bracket: LS218 on end -->
    <rect x="281.5" y="191.625" width="15.75" height="17.25" rx="2" class="fill-red-900" />
    <path d="M280 193.5H281.5M280 207H281.5" class="stroke-orange-950/50" stroke-width="2" />
    <!-- top bar, LA112s hung under the K12.2 pairs -->
    <line x1="211" y1="195" x2="289" y2="195" class="stroke-orange-950/50" stroke-width="2" />
    <g class="fill-violet-300 stroke-violet-700" stroke-width="1">
      <rect x="211.375" y="189.75" width="15.75" height="10.5" rx="2" />
      <rect x="272.875" y="189.75" width="15.75" height="10.5" rx="2" />
    </g>
    <g class="fill-sky-700">
      <rect x="210.25" y="190" width="9" height="10" rx="2" />
      <rect x="219.25" y="190" width="9" height="10" rx="2" />
      <rect x="271.75" y="190" width="9" height="10" rx="2" />
      <rect x="280.75" y="190" width="9" height="10" rx="2" />
    </g>
    <!-- front arrow and scale bar -->
    <g class="fill-orange-950/70 stroke-orange-950/70 text-[13px]">
      <text x="78" y="56" text-anchor="middle" stroke="none">Front</text>
      <path d="M78 104 L78 68 M72 74 L78 67 L84 74" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M70 290 L145 290 M70 285 L70 295 M145 285 L145 295" fill="none" stroke-width="1.5" />
      <text x="152" y="294" stroke="none">10 ft</text>
    </g>
  </svg>
  <div class="flex justify-between text-xs text-orange-950/60 max-w-lg mx-auto -mt-1">
    <span>← Driver side</span><span>Passenger side →</span>
  </div>

  <ul class="mt-6 space-y-2 text-sm text-orange-950/80">
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-violet-300 ring-1 ring-violet-700"></span>
      <span><strong class="text-orange-950">LA112 ×4</strong>, two hung under each K12.2 pair at the bar ends. 90° horizontal.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-sky-700"></span>
      <span><strong class="text-orange-950">K12.2 ×4</strong> on the top bar, unchanged. Now secondary fill.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-red-900"></span>
      <span><strong class="text-orange-950">LS218 ×1</strong> on end, on the passenger bracket (184 lb).</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-orange-600"></span>
      <span><strong class="text-orange-950">KS118 ×2</strong> stacked on a new driver-side bracket (about 208 lb).</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-emerald-600"></span>
      <span><strong class="text-orange-950">K12.2 monitors</strong> on the open windscreen frame.</span>
    </li>
  </ul>

  <h3 class="mt-12 text-xs uppercase tracking-wide text-orange-950/60 mb-2">Side view from the passenger side, to scale · front →</h3>
  <svg viewBox="56 457 428 245" class="w-full h-auto" role="img" aria-labelledby="towers-side-title">
    <title id="towers-side-title">Side view of the 2027 concept showing the line array throwing over the crowd</title>
    <!-- K12.2 throw -->
    <path d="M150 590.2 L457.2 463 L484 463 L484 669 L210.4 669 Z" class="fill-sky-600/10" />
    <g class="stroke-sky-600" stroke-width="0.75">
      <line x1="150" y1="590.2" x2="457.2" y2="463" stroke-dasharray="2 3" />
      <line x1="150" y1="590.2" x2="210.4" y2="669" stroke-dasharray="6 3" />
    </g>
    <!-- LA112 throw -->
    <path d="M150 607.5 L484 581.2 L484 669 L314.5 669 Z" class="fill-violet-500/20" />
    <g class="stroke-violet-700">
      <line x1="150" y1="607.5" x2="484" y2="581.2" stroke-dasharray="2 3" />
      <line x1="150" y1="607.5" x2="314.5" y2="669" stroke-dasharray="6 3" />
    </g>
    <!-- car body, cab, wheels -->
    <g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
      <rect x="75" y="616.5" width="97.5" height="41.25" rx="4" />
      <rect x="172.5" y="639" width="22.5" height="18.75" rx="3" />
    </g>
    <g class="fill-orange-950/50">
      <circle cx="178.5" cy="659.25" r="9.75" />
      <circle cx="99" cy="659.25" r="9.75" />
    </g>
    <path d="M172.5 639 L170.25 612.75 L163.5 612.75" class="fill-none stroke-orange-950/60" stroke-width="1.5" />
    <rect x="165.25" y="603.75" width="10" height="8" rx="2" class="fill-emerald-600" />
    <rect x="157.5" y="609" width="12" height="41.25" rx="3" class="fill-white/60 stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
    <text x="163.5" y="627" text-anchor="middle" dominant-baseline="central" class="fill-orange-950/80 text-[11px]">DJ</text>
    <text x="104" y="636.75" text-anchor="middle" dominant-baseline="central" class="fill-orange-950/80 text-[13px]">Deck</text>
    <!-- KS118 stack on the far side (dashed), LS218 on the near side -->
    <rect x="135" y="622.5" width="19.5" height="31.5" rx="2" class="fill-none stroke-orange-600" stroke-dasharray="3 2" />
    <rect x="136.125" y="628.5" width="17.25" height="25.5" rx="2" class="fill-red-900" />
    <!-- top bar, K12.2, LA112 pair -->
    <line x1="150" y1="597.75" x2="150" y2="616.5" class="stroke-orange-950/50" stroke-width="2" />
    <rect x="145" y="582.2" width="10" height="16" rx="2" class="fill-sky-700" transform="rotate(-15 150 590.2)" />
    <g class="fill-violet-300 stroke-violet-700" stroke-width="1">
      <rect x="144.8" y="597.8" width="10.5" height="9.75" rx="1.5" transform="rotate(-3 150 602.6)" />
      <rect x="144.8" y="607.5" width="10.5" height="9.75" rx="1.5" transform="rotate(-13 150 612.4)" />
    </g>
    <!-- ear height, ground, distances -->
    <line x1="56" y1="629.6" x2="484" y2="629.6" class="stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="4 4" />
    <text x="480" y="622" text-anchor="end" class="fill-orange-950/70 text-[13px]">Ear height ~5 ft</text>
    <line x1="56" y1="669" x2="484" y2="669" class="stroke-orange-950/60" />
    <g class="fill-orange-950/70 stroke-orange-950/60 text-[13px]" text-anchor="middle">
      <path d="M225 669v5M300 669v5M375 669v5M450 669v5" />
      <text x="150" y="689" stroke="none">top bar</text>
      <text x="225" y="689" stroke="none">10 ft</text>
      <text x="300" y="689" stroke="none">20 ft</text>
      <text x="375" y="689" stroke="none">30 ft</text>
      <text x="450" y="689" stroke="none">40 ft</text>
    </g>
  </svg>

  <ul class="mt-6 space-y-2 text-sm text-orange-950/80">
    <li class="flex gap-3">
      <LegendLine class="stroke-violet-700" dash="2 3" />
      <span>LA112 pair hung from the bar ends, about 6.9 to 9.5 ft up. The top box, about 3° down, reaches ear height about 55 ft out, over the crowd.</span>
    </li>
    <li class="flex gap-3">
      <LegendLine class="stroke-violet-700" dash="6 3" />
      <span>The bottom box, about 13° down: its lower edge reaches ear height about 2 ft past the hood.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-red-900"></span>
      <span>LS218 (near side, solid) and the KS118 stack (far side, dashed) sit about 11 to 12 ft apart. Bass sums straight ahead and behind, with a dip around 50 Hz directly off each side.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-orange-950/30"></span>
      <span>Weight: 184 lb on the passenger side vs about 208 lb on the driver side, both low and between the axles.</span>
    </li>
  </ul>
  <p class="mt-4 text-xs text-orange-950/60">
    Heights and aims are estimates; cones are illustrative. LA112: 47 lb, 15.4 in tall, 90° × 15°, 136 dB peak. LS218: 184 lb, 141 dB peak.
  </p>
</figure>
