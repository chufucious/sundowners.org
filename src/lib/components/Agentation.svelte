<script>
  let container;

  $effect(() => {
    if (!import.meta.env.DEV) return;

    let root;
    let cancelled = false;

    Promise.all([
      import('agentation'),
      import('react-dom/client'),
      import('react')
    ]).then(([{ Agentation }, { createRoot }, { createElement }]) => {
      if (cancelled) return;
      root = createRoot(container);
      root.render(createElement(Agentation));
    });

    return () => {
      cancelled = true;
      root?.unmount();
    };
  });
</script>

<div bind:this={container}></div>
