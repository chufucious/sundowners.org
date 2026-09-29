<script>
  // The colour key for one speaker, drawn the same way in the legends and the
  // SPL table. `class` sets the colour; take it from speakerColours.js so the
  // two always match.
  let { class: colour } = $props();
</script>

<span class={["block h-2.5 w-3.5 shrink-0 rounded-sm", colour]} aria-hidden="true"></span>
