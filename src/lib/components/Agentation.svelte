<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser, dev } from '$app/environment';

  let container;
  let root;

  onMount(async () => {
    if (!dev) return;

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
