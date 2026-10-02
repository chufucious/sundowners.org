<script>
  import { articleProse } from "#lib/article-styles.js";

  let { children, class: className = "" } = $props();
</script>

<div class={["px-6", className]}>
  <div class="mx-auto {articleProse}">
    {@render children()}
  </div>
</div>
