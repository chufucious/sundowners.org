<script>
  import "../app.css";
  import { page } from "$app/stores";
  import Agentation from "$lib/components/Agentation.svelte";
  import sundownerswalking from "$lib/assets/Photos/sundownerswalking.jpg?w=640;1280;1920&format=webp&as=srcset";
  import fabricSunrise from "$lib/assets/wax-fabric/sunrise.jpeg?w=200&format=webp";
  import logoLion from "$lib/assets/logo/lion.svg?w=256;512&as=srcset";
  import logoAndType2025 from "$lib/assets/logo/sundowners-logo-type-2025-solid.png?w=300;600;1200&as=srcset";
</script>

<svelte:head>
  <title>Sundowners – Black Rock City</title>
  <meta
    name="description"
    content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world."
  />
  <!-- Open Graph -->
  <meta property="og:title" content="Sundowners – Black Rock City" />
  <meta property="og:description" content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sundowners.org" />
  <meta property="og:image" content="https://sundowners.org/android-chrome-512x512.png" />
  <meta property="og:site_name" content="Sundowners" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Sundowners – Black Rock City" />
  <meta name="twitter:description" content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world." />
  <meta name="twitter:image" content="https://sundowners.org/android-chrome-512x512.png" />
</svelte:head>

<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2">
  Skip to main content
</a>

<main class="grid grid-cols-12 gap-4 font-mono pb-32">
  <header
    class="col-span-12 h-[18rem] relative overflow-hidden"
    class:md:h-[36rem]={!$page.data.smallHeader}
  >
    <a
      href="/"
      class="fixed left-0 right-0 top-12 md:top-16 z-20 flex justify-center mix-blend-color-dodge"
    >
      <img
        class="w-[300px] md:w-[600px]"
        srcset={logoAndType2025}
        sizes="(max-width: 768px) 300px, 600px"
        alt="sundowners logo"
      /></a
    >
    <img
      srcset={sundownerswalking}
      sizes="100vw"
      alt="Sundowners walking in Black Rock City"
      class="absolute inset-0 w-full h-full object-cover"
      fetchpriority="high"
    />

    <div
      class="h-1 md:h-2 w-full absolute bottom-0"
      style="background-image: url('{fabricSunrise}'); background-repeat: repeat; background-size: 200px; background-position: center;"
    ></div>
  </header>
  <div id="main-content" class="contents">
    <slot />
  </div>
  <footer class="col-span-12">
    <img
      srcset={logoLion}
      sizes="96px"
      class="col-span-12 mx-auto mb-4 mt-24 w-24"
      alt="sundowners lion logo"
      loading="lazy"
    />
    <h2
      class="px-8 md:px-0 col-span-12 max-w-prose mx-auto text-xl md:text-2xl font-garamond text-orange-950 mb-4 text-center"
    >
      Collaborate with us if you would like to participate as a musician, DJ,
      dancer, artist or in any creative capacity.
    </h2>
    <p
      class="col-span-12 max-w-prose mx-auto px-8 md:px-0 text-sm text-center leading-relaxed text-orange-950/80"
    >
      At Black Rock City and year-round, our goal is to spread the Sundowners'
      vision through our flavor of African diaspora events, creative projects,
      and community involvement.<br /><br />We would love to hear from you.<br
      /><br />
      <a
        href="mailto:sundownersbrc@gmail.com"
        class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2"
        aria-label="Email Sundowners camp"
        >Email Us</a
      >

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfv2tBFZXZsBnXomp4Ke-zkuQeW33qUtsqnGlwixeMUJYpAXg/viewform?usp=sf_link"
        class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2"
        aria-label="Open DJ application form (opens Google Form)"
        >DJ Application Form</a
      >
    </p>
  </footer>
</main>

<Agentation />
