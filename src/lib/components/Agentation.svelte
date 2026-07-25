<script>
  import { onMount, onDestroy } from 'svelte';

  let container;
  let root;

  onMount(async () => {
    if (!import.meta.env.DEV) return;

    const [{ Agentation }, { createRoot }] = await Promise.all([
      import('agentation'),
      import('react-dom/client')
    ]);
    const { createElement } = await import('react');

    root = createRoot(container);
    root.render(createElement(Agentation));
  });

  onDestroy(() => {
    if (root) {
      root.unmount();
    }
  });
</script>

<div bind:this={container}></div>
