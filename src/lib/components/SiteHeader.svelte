<script>
  import { resolve } from "$app/paths";
  import FlameMark from "#lib/components/FlameMark.svelte";
  import CompactLogo, { HANDOVER } from "#lib/components/CompactLogo.svelte";
  import sundownerswalking from "#lib/assets/Photos/sundownerswalking.jpg?w=640;1280;1920&enhanced";
  import fabricSunrise from "#lib/assets/wax-fabric/sunrise.jpeg?w=200&format=webp";
  import logoAndType2025 from "#lib/assets/logo/sundowners-logo-type-2025-solid.png?w=300;600;1200&enhanced";

  let { hero, smallHeader = false } = $props();

  // The layout passes the route's headerImage as hero; other pages use the banner.
  // enhanced:img needs the dynamic image object assigned to a variable.
  const headerPhoto = $derived(hero?.src ?? sundownerswalking);

  // The header logo scrolls up with the header. As it slides off the top of
  // the screen it hands over to the compact flame lion, in step with the
  // scroll: `logoSwap` is 0 while it's fully in view, 1 once it's fully gone.
  // Staggered like Material 3's fade through, so the two lions are never both
  // half there: the header logo fades out over the first 60% of its exit, and
  // CompactLogo fades in from HANDOVER (halfway), where they also swap reach.
  let headerLogo;
  let logoSwap = $state(0);
  function updateLogoSwap() {
    const { top, height } = headerLogo.getBoundingClientRect();
    logoSwap = Math.min(Math.max(-top / height, 0), 1);
  }
  $effect(updateLogoSwap);
  const headerLogoOpacity = $derived(1 - Math.min(logoSwap / 0.6, 1));
</script>

<svelte:window onscroll={updateLogoSwap} onresize={updateLogoSwap} />

<header
  class={[
    "col-span-12 relative overflow-hidden",
    hero ? "h-[max(28rem,75svh)] md:h-[clamp(32rem,100svh,60rem)]" : "h-72",
    !hero && !smallHeader && "md:h-144",
  ]}
>
  <a
    href={resolve("/")}
    bind:this={headerLogo}
    inert={logoSwap >= HANDOVER}
    style:opacity={headerLogoOpacity}
    class="absolute left-1/2 -translate-x-1/2 top-8 md:top-10 z-20 block w-75 md:w-150 mix-blend-color-dodge"
  >
    <span class="relative block">
      <!-- Wordmark only; the sun mark (left 23%) is drawn by FlameMark. -->
      <enhanced:img
        class="w-full [clip-path:inset(0_0_0_23%)]"
        src={logoAndType2025}
        sizes="(max-width: 768px) 300px, 600px"
        alt="sundowners logo"
      />
      <!-- Placed over the mark's spot in the logo, with headroom above for
           the flames (see sundowners-mark-2025-flame-purple.png's padding). -->
      <FlameMark
        active={headerLogoOpacity > 0}
        class="absolute -left-[2.108%] -top-[35.256%] w-[25.252%] h-[138.462%]"
      />
    </span></a
  >
  <!-- Stand-in for a page's header photo while it loads: the tiny inlined
       copy, blurred, so the header never paints empty. -->
  {#if hero?.placeholder}
    <div
      class="absolute inset-0 bg-cover blur-2xl scale-110"
      style:background-image="url({hero.placeholder})"
      style:background-position={hero.position}
      aria-hidden="true"
    ></div>
  {/if}
  <enhanced:img
    src={headerPhoto}
    sizes="100vw"
    alt={hero?.alt ?? "Sundowners walking in Black Rock City"}
    class="absolute inset-0 w-full h-full object-cover"
    style:object-position={hero?.position}
    fetchpriority="high"
  />
  <!-- Darkens the sky behind the logo so its color-dodge blend keeps the
       mark's colors instead of blowing out to white on bright skies. -->
  <div
    class="absolute inset-x-0 top-0 h-64 md:h-96 bg-linear-to-b from-black/45 via-black/20 to-transparent"
    aria-hidden="true"
  ></div>

  <div
    class="h-1 md:h-2 w-full absolute bottom-0"
    style="background-image: url('{fabricSunrise}'); background-repeat: repeat; background-size: 200px; background-position: center;"
  ></div>
</header>
<CompactLogo swap={logoSwap} />
