<script>
  // "On this page" links with the section being read marked on the rule.
  // `sections` are { id, title } for headings rendered with those ids.
  // Fades out while a [data-wide] element passes behind it.
  let { sections } = $props();
  const labelId = $props.id(); // the page can show two: pinned and inline

  let nav;
  let current = $state(); // set on mount from the scroll position
  let covered = $state(false);

  // The current section is the last heading scrolled past the top third;
  // the nav is covered while a wide element overlaps it.
  function update() {
    const line = innerHeight / 3;
    let passed = sections[0].id;
    for (const { id } of sections) {
      const heading = document.getElementById(id);
      if (heading && heading.getBoundingClientRect().top <= line) passed = id;
    }
    current = passed;

    const box = nav.getBoundingClientRect();
    covered = [...document.querySelectorAll("[data-wide]")].some((el) => {
      const r = el.getBoundingClientRect();
      return r.top < box.bottom && r.bottom > box.top && r.left < box.right && r.right > box.left;
    });
  }

  $effect(update);
</script>

<svelte:window onscroll={update} onresize={update} />

<!-- Material 3 fade: emphasized-decelerate back in, a quick accelerate out. -->
<nav
  bind:this={nav}
  aria-labelledby={labelId}
  inert={covered}
  class={[
    "transition-opacity",
    covered
      ? "opacity-0 duration-100 ease-[cubic-bezier(0.3,0,0.8,0.15)]"
      : "opacity-100 duration-400 ease-[cubic-bezier(0.05,0.7,0.1,1)]",
  ]}
>
  <p id={labelId} class="font-mono text-xs uppercase tracking-widest text-orange-950/60 mb-4">On this page</p>
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
