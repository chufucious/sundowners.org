<script>
  // "On this page" links with the section being read marked on the rule.
  // `sections` are { id, title } for headings rendered with those ids.
  let { sections } = $props();

  let current = $state(sections[0].id);

  // The current section is the last heading scrolled past the top third.
  function updateCurrent() {
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

<nav aria-labelledby="toc-label">
  <p id="toc-label" class="font-mono text-xs uppercase tracking-widest text-orange-950/60 mb-4">On this page</p>
  <ul class="border-l border-orange-950/15 space-y-1">
    {#each sections as { id, title } (id)}
      <li>
        <a
          href="#{id}"
          aria-current={current === id ? "location" : undefined}
          class={[
            "-ml-px block border-l-2 py-1.5 pl-4 font-sans text-sm leading-snug transition-colors",
            current === id
              ? "border-orange-950 text-orange-950"
              : "border-transparent text-orange-950/60 hover:text-orange-950",
          ]}
        >
          {title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
