<script>
  // Legend key for a line in a diagram: pass the stroke color class and dash.
  let { class: className = "", dash = undefined, width = 1 } = $props();
</script>

<svg viewBox="0 0 28 10" class="mt-1 h-2.5 w-7 shrink-0" aria-hidden="true">
  <line x1="0" y1="5" x2="28" y2="5" class={className} stroke-width={width} stroke-dasharray={dash} />
</svg>
