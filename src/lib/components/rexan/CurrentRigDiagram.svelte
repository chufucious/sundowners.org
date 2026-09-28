<script>
  // Redrawn from "rexan sound current v2.svg" (Dropbox: Sundowners Rexan blog post).
  // Geometry is kept from the source: 7.5 units = 1 ft, car 16 x 8 ft.
  // Only the drawing lives in the SVG; legends, table and notes are HTML.
  import LegendLine from "./LegendLine.svelte";

  const spl = [
    { model: "K12.2 (tops)", qty: 4, coverage: "75° conical", db: [132, 122, 114, 108, 102] },
    { model: "K10.2 (DJ monitors)", qty: 2, coverage: "90° conical", db: [130, 120, 112, 106, 100] },
    { model: "KS118 (sub)", qty: 1, coverage: "Omni", db: [136, 126, 118, 112, 106] },
    { model: "KS118 ×2 stacked", qty: 2, coverage: "Omni, coupled", db: [142, 132, 124, 118, 112] },
  ];
</script>

<figure class="font-sans text-orange-950">
  <h3 class="text-xs uppercase tracking-wide text-orange-950/60 mb-2">Overhead, to scale</h3>
  <svg viewBox="56 40 388 316" class="w-full h-auto max-w-lg mx-auto" role="img" aria-labelledby="current-overhead-title">
    <title id="current-overhead-title">Overhead view of Rexan's current speaker layout and coverage</title>
    <!-- K12.2 coverage cones, drawn to 20 ft -->
    <g class="fill-sky-600/15">
      <path d="M214.8 195.0 L64.9 188.5 A150.0 150.0 0 0 1 182.3 48.6 Z" />
      <path d="M223.8 195.0 L100.1 110.0 A150.0 150.0 0 0 1 273.8 53.6 Z" />
      <path d="M276.2 195.0 L226.2 53.6 A150.0 150.0 0 0 1 399.9 110.0 Z" />
      <path d="M285.2 195.0 L317.7 48.6 A150.0 150.0 0 0 1 435.1 188.5 Z" />
    </g>
    <!-- KS118 rings at 5 / 10 / 20 ft -->
    <g class="fill-none stroke-orange-600" stroke-dasharray="4 3">
      <circle cx="286.375" cy="200.25" r="37.5" stroke-width="1" />
      <circle cx="286.375" cy="200.25" r="75" stroke-width="0.8" stroke-opacity="0.8" />
      <circle cx="286.375" cy="200.25" r="150" stroke-width="0.6" stroke-opacity="0.6" />
    </g>
    <!-- car -->
    <g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
      <rect x="231.25" y="150" width="37.5" height="26.5" rx="4" />
      <rect x="220" y="172.5" width="60" height="97.5" rx="6" />
    </g>
    <!-- K10.2 monitor cones, cross-firing at the DJ -->
    <g class="fill-emerald-600/20">
      <path d="M215.5 172.5 L267.3 142.2 A60.0 60.0 0 0 1 245.8 224.3 Z" />
      <path d="M284.5 172.5 L254.2 224.3 A60.0 60.0 0 0 1 232.7 142.2 Z" />
    </g>
    <rect x="235" y="175.5" width="30" height="12" rx="3" class="fill-none stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
    <g class="fill-orange-950/80 text-[11px]" text-anchor="middle" dominant-baseline="central">
      <text x="250" y="161.25">Hood</text>
      <text x="250" y="181.5">DJ</text>
      <text x="250" y="232.5" class="text-[13px]">Deck</text>
    </g>
    <!-- windscreen frame + monitors -->
    <line x1="212.5" y1="172.5" x2="287.5" y2="172.5" class="stroke-orange-950/50" stroke-width="1.5" />
    <rect x="210.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
    <rect x="279.5" y="168.5" width="10" height="8" rx="2" class="fill-emerald-600" />
    <!-- passenger sub bracket + KS118 stack -->
    <line x1="280" y1="192" x2="281.5" y2="192" class="stroke-orange-950/50" stroke-width="2" />
    <line x1="280" y1="208.5" x2="281.5" y2="208.5" class="stroke-orange-950/50" stroke-width="2" />
    <rect x="281.5" y="189" width="9.75" height="22.5" rx="2" class="fill-orange-600" />
    <line x1="281.5" y1="200.25" x2="291.25" y2="200.25" class="stroke-orange-100" stroke-width="1" />
    <!-- top bar + K12.2 pairs -->
    <line x1="211" y1="195" x2="289" y2="195" class="stroke-orange-950/50" stroke-width="2" />
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
      <path d="M70 336 L145 336 M70 331 L70 341 M145 331 L145 341" fill="none" stroke-width="1.5" />
      <text x="152" y="340" stroke="none">10 ft</text>
    </g>
  </svg>
  <div class="flex justify-between text-xs text-orange-950/60 max-w-lg mx-auto -mt-1">
    <span>← Driver side</span><span>Passenger side →</span>
  </div>

  <ul class="mt-6 space-y-2 text-sm text-orange-950/80">
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-sky-700"></span>
      <span><strong class="text-orange-950">K12.2 ×4</strong> in pairs at the ends of the top bar, 6 ft back from the front. 75° coverage, cones drawn to 20 ft.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-orange-600"></span>
      <span><strong class="text-orange-950">KS118 ×2</strong> stacked on the passenger bracket. Rings at 5, 10 and 20 ft.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-emerald-600"></span>
      <span><strong class="text-orange-950">K10.2 ×2</strong> at the ends of the open windscreen frame. 90° coverage, cross-firing at the DJ.</span>
    </li>
  </ul>

  <h3 class="mt-12 text-xs uppercase tracking-wide text-orange-950/60 mb-2">Side view from the passenger side, to scale · front →</h3>
  <svg viewBox="56 500 428 250" class="w-full h-auto" role="img" aria-labelledby="current-side-title">
    <title id="current-side-title">Side view of Rexan showing how far the top speakers throw</title>
    <defs>
      <clipPath id="current-side-above"><rect x="0" y="0" width="500" height="722" /></clipPath>
    </defs>
    <g class="fill-none stroke-orange-600" stroke-dasharray="4 3" clip-path="url(#current-side-above)">
      <circle cx="144.75" cy="689.75" r="37.5" stroke-width="1" />
      <circle cx="144.75" cy="689.75" r="75" stroke-width="0.8" stroke-opacity="0.8" />
      <circle cx="144.75" cy="689.75" r="150" stroke-width="0.6" stroke-opacity="0.6" />
    </g>
    <path d="M150 643.2 L481.4 506 L484 506 L484 722 L210.4 722 Z" class="fill-sky-600/15" />
    <path d="M170.2 665.8 L116.6 692.6 A60.0 60.0 0 0 1 143.4 612.1 Z" class="fill-emerald-600/20" />
    <!-- car body, cab, wheels -->
    <g class="fill-orange-50 stroke-orange-950/40" stroke-width="0.75">
      <rect x="75" y="669.5" width="97.5" height="41.25" rx="4" />
      <rect x="172.5" y="692" width="22.5" height="18.75" rx="3" />
    </g>
    <g class="fill-orange-950/50">
      <circle cx="178.5" cy="712.25" r="9.75" />
      <circle cx="99" cy="712.25" r="9.75" />
    </g>
    <!-- windscreen frame + monitor -->
    <path d="M172.5 692 L170.25 665.75 L163.5 665.75" class="fill-none stroke-orange-950/60" stroke-width="1.5" />
    <rect x="165.25" y="656.75" width="10" height="8" rx="2" class="fill-emerald-600" />
    <rect x="157.5" y="662" width="12" height="41.25" rx="3" class="fill-white/60 stroke-orange-950/40" stroke-width="0.75" stroke-dasharray="3 2" />
    <text x="163.5" y="680" text-anchor="middle" dominant-baseline="central" class="fill-orange-950/80 text-[11px]">DJ</text>
    <!-- subs on the bracket -->
    <rect x="133.5" y="672.5" width="22.5" height="34.5" rx="2" class="fill-orange-600" />
    <line x1="133.5" y1="689.75" x2="156" y2="689.75" class="stroke-orange-100" stroke-width="1" />
    <text x="104" y="689.75" text-anchor="middle" dominant-baseline="central" class="fill-orange-950/80 text-[13px]">Deck</text>
    <!-- top bar, K12.2 and its throw -->
    <line x1="150" y1="650.75" x2="150" y2="669.5" class="stroke-orange-950/50" stroke-width="2" />
    <g class="stroke-sky-800">
      <line x1="150" y1="643.2" x2="481.4" y2="506" stroke-dasharray="2 3" />
      <line x1="150" y1="643.2" x2="443.9" y2="722" stroke-width="1.5" />
      <line x1="150" y1="643.2" x2="210.4" y2="722" stroke-dasharray="6 3" />
    </g>
    <rect x="145" y="635.2" width="10" height="16" rx="2" class="fill-sky-700" transform="rotate(-15 150 643.2)" />
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
  </svg>

  <ul class="mt-6 space-y-2 text-sm text-orange-950/80">
    <li class="flex gap-3">
      <LegendLine class="stroke-sky-800" dash="6 3" />
      <span>K12.2 lower edge, 52° down: lands about 2 ft past the hood.</span>
    </li>
    <li class="flex gap-3">
      <LegendLine class="stroke-sky-800" width={1.5} />
      <span>K12.2 on-axis, 15° down: reaches ear height about 20 ft from the bar, 14 ft past the hood.</span>
    </li>
    <li class="flex gap-3">
      <LegendLine class="stroke-sky-800" dash="2 3" />
      <span>K12.2 upper edge, 22° up: carries over heads to the far field.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-emerald-600"></span>
      <span>K10.2 on the open windscreen frame (about 7.5 ft up), aimed back at the DJ.</span>
    </li>
    <li class="flex gap-3">
      <span class="mt-1.5 h-2.5 w-3.5 shrink-0 rounded-sm bg-orange-600"></span>
      <span>KS118 ×2 on the bracket (about 2 to 6.5 ft up). Rings at 5, 10 and 20 ft.</span>
    </li>
  </ul>

  <h3 class="mt-12 text-xs uppercase tracking-wide text-orange-950/60 mb-2">Projected SPL per speaker class (peak, dB)</h3>
  <div class="overflow-x-auto -mx-6 px-6">
    <table class="w-full min-w-lg text-xs text-orange-950/80 bg-orange-950/5 rounded tabular-nums">
      <thead class="text-orange-950 text-left">
        <tr class="border-b border-orange-950/10">
          <th class="p-2 font-semibold">Model</th>
          <th class="p-2 font-semibold">Qty</th>
          <th class="p-2 font-semibold">Coverage</th>
          <th class="p-2 font-semibold text-right">@1 m</th>
          <th class="p-2 font-semibold text-right">10 ft</th>
          <th class="p-2 font-semibold text-right">25 ft</th>
          <th class="p-2 font-semibold text-right">50 ft</th>
          <th class="p-2 font-semibold text-right">100 ft</th>
        </tr>
      </thead>
      <tbody>
        {#each spl as { model, qty, coverage, db } (model)}
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
</figure>
