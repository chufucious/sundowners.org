<script>
  // A silent loop standing in for a GIF. It plays only while it's on screen,
  // so it doesn't download or run until needed, stays still for people who
  // ask for reduced motion, and has a button to pause or play it. Muted
  // inline playback lets it start without a tap on iPhones.
  // `class` goes on the wrapper (the flex item); `videoClass` sizes the video.
  let { src, poster, label, width, height, class: className = "", videoClass = "" } = $props();

  // Asset URLs are root-relative in the prerendered HTML but absolute in the
  // browser. Svelte keeps the HTML's src through hydration, so a mismatch
  // makes the next update re-set it, and a video restarts its load (aborting
  // play()) even for the same file. Same-origin paths keep both sides equal.
  const path = (url) =>
    typeof location !== "undefined" && url?.startsWith(location.origin) ? url.slice(location.origin.length) : url;

  let video;
  let paused = $state(true);
  let onScreen = false;
  let reduceMotion;
  // Until the button is pressed, follow the reduced-motion setting; after
  // that, the viewer's choice wins.
  let wanted = null;

  function sync() {
    const play = onScreen && (wanted ?? !reduceMotion.matches);
    // play() can be refused (Low Power Mode, for one): the poster stays up.
    if (play && video.paused) video.play().catch(() => {});
    else if (!play && !video.paused) video.pause();
  }

  function toggle() {
    wanted = video.paused;
    sync();
  }

  $effect(() => {
    reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    reduceMotion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener("change", sync);
    };
  });
</script>

<div class={["relative", className]}>
  <video
    bind:this={video}
    src={path(src)}
    poster={path(poster)}
    {width}
    {height}
    aria-label={label}
    loop
    muted
    playsinline
    preload="none"
    onplay={() => (paused = false)}
    onpause={() => (paused = true)}
    class={videoClass}
  ></video>
  <button
    type="button"
    onclick={toggle}
    aria-label={paused ? "Play video" : "Pause video"}
    class="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-orange-950/60 text-orange-50 transition-colors hover:bg-orange-950/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
  >
    <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true" focusable="false">
      {#if paused}
        <path d="M8 5.5v13l10.5-6.5z" />
      {:else}
        <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
        <rect x="14" y="5" width="3.5" height="14" rx="1" />
      {/if}
    </svg>
  </button>
</div>
