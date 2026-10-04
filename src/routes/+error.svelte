<script>
  import { page } from "$app/state";
  import ArticleCard from "#lib/components/ArticleCard.svelte";
  import { articles } from "#lib/homepage.js";

  // The page title comes from +layout.svelte, which checks page.error.
  const lost = $derived(page.status === 404);
</script>

<section class="col-span-12 mt-12 md:mt-20">
  <div class="mx-auto w-5/6 md:w-2/3 max-w-7xl">
    <p class="eyebrow mb-4">{page.status}</p>
    <h1 class="text-2xl md:text-3xl text-orange-950 mb-6 font-garamond">
      {lost ? "You’ve wandered past the trash fence." : "Something broke on our end."}
    </h1>
    <p class="text-sm text-orange-900 leading-relaxed max-w-prose">
      {#if lost}
        There’s nothing out here but dust. Head
        <a href="/" class="text-orange-700 underline underline-offset-2 hover:text-orange-800">back to camp</a>,
        or read one of our stories.
      {:else}
        Try again in a moment, or head
        <a href="/" class="text-orange-700 underline underline-offset-2 hover:text-orange-800">back to camp</a>.
      {/if}
    </p>
  </div>
</section>

{#if lost}
  <section class="col-span-12 mt-section">
    <div class="mx-auto w-5/6 md:w-2/3 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
      {#each articles as article (article.id)}
        <ArticleCard {...article} />
      {/each}
    </div>
  </section>
{/if}
