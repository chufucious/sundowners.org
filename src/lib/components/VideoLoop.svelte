<script>
  import LoopVideo from "#lib/components/LoopVideo.svelte";

  let { src, poster, label, caption, ratio, class: extraClass = "" } = $props();
</script>

<figure class="md:min-w-0 {extraClass}" style:flex={ratio ? `${ratio} 1 0` : undefined}>
  <LoopVideo {src} {poster} {label} videoClass="w-full h-auto" />
  <figcaption class="mt-3 font-mono text-xs leading-relaxed text-orange-800">{caption}</figcaption>
</figure>
