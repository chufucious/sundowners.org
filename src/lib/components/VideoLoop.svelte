<script>
  let { src, poster, label, caption, ratio, class: extraClass = "" } = $props();
</script>

<!-- Muted inline playback lets these silent loops autoplay on iPhones. -->
<figure class="md:min-w-0 {extraClass}" style:flex={ratio ? `${ratio} 1 0` : undefined}>
  <video
    {src}
    {poster}
    aria-label={label}
    autoplay
    loop
    muted
    playsinline
    preload="metadata"
    class="w-full h-auto"
  ></video>
  <figcaption class="mt-3 font-mono text-xs leading-relaxed text-orange-800">{caption}</figcaption>
</figure>
