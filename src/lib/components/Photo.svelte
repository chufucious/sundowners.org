<script>
  let {
    image,
    alt,
    caption,
    sizes = "(max-width: 768px) 100vw, 40rem",
    class: extraClass = "",
    grow,
  } = $props();
</script>

<figure class="md:min-w-0 {extraClass}" style:flex={grow ? `${grow} 1 0` : undefined}>
  <enhanced:img src={image} {sizes} {alt} loading="lazy" class="w-full h-auto" />
  <figcaption class="mt-3 font-mono text-xs leading-relaxed text-orange-950/70">{caption}</figcaption>
</figure>
