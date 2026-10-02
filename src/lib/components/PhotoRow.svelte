<script>
  import Photo from "./Photo.svelte";

  let { photos } = $props();
</script>

<!-- Weight each photo by its aspect ratio so the row shares one image height. -->
<div class="flex flex-col md:flex-row gap-10 md:gap-6">
  {#each photos as { image, alt, caption } (image)}
    <Photo {image} {alt} {caption} grow={image.img.w / image.img.h} />
  {/each}
</div>
