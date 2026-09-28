<script>
  // "On this page" links with the section being read marked on the rule.
  // `sections` are { id, title } for headings rendered with those ids.
  let { sections } = $props();
  const labelId = $props.id();

  let nav;
  let current = $state(); // set on mount from the scroll position

  // The current section is the last heading scrolled past the top third.
  function updateCurrent() {
    if (!nav.offsetParent) return; // hidden (phones): nothing to update
    const line = innerHeight / 3;
    let passed = sections[0].id;
    for (const { id } of sections) {
      const heading = document.getElementById(id);
      if (heading && heading.getBoundingClientRect().top <= line) passed = id;
    }
    current = passed;
  }

  $effect(updateCurrent);
</script>

<svelte:window onscroll={updateCurrent} onresize={updateCurrent} />

<nav bind:this={nav} aria-labelledby={labelId}>
  <p id={labelId} class="eyebrow mb-4">On this page</p>
  <ul class="border-l border-orange-950/15 space-y-1">
    {#each sections as { id, title } (id)}
      <li>
        <a
          href="#{id}"
          aria-current={current === id ? "location" : undefined}
          class={[
            "-ml-px block border-l-2 py-1.5 pl-4 font-sans text-sm leading-snug transition-colors",
            current === id
              ? "border-orange-500 text-orange-700" // the site's button orange; 700 keeps the text readable
              : "border-transparent text-orange-950/60 hover:text-orange-950",
          ]}
        >
          {title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
