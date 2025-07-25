<script>
  import "../app.css";
  import { page } from "$app/stores";
  import shoppng from "$lib/assets/Shop.png?w=512&format=webp";
  import visitOurStore from "$lib/assets/btn/visit-our-store.png?w=200&format=webp";
  import logoMosaic from "$lib/assets/logo/Mosaic.png?w=400;800&format=webp&as=srcset";
  import sundownerswalking from "$lib/assets/Photos/sundownerswalking.jpg?w=390;768;1366;1920&format=webp&as=srcset";
  import fabricSunrise from "$lib/assets/wax-fabric/sunrise.jpeg?w=300&format=webp";
  import logoLion from "$lib/assets/logo/lion.svg?w=400;900;1200&as=srcset";
  import logoAndType2025 from "$lib/assets/logo/sundowners-logo-type-2025-solid.png?w=400;900;1200&as=srcset";
</script>

<svelte:head>
  <title>Sundowners – Black Rock City</title>
  <meta
    name="description"
    content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the
    multicultural art, music, dance, and hospitality that African traditions and
    speakeasies bring to the world."
  />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap");
  </style>
</svelte:head>

<main class="grid grid-cols-12 gap-4 font-mono pb-32">
  <header
    class="col-span-12 h-[18rem] relative overflow-hidden"
    class:md:h-[18rem]={$page.data.smallHeader}
    class:md:h-[36rem]={!$page.data.smallHeader}
  >
    <img
      srcset={sundownerswalking}
      sizes="100vw"
      alt="Sundowners walking in Black Rock City"
      class="absolute inset-0 w-full h-full object-cover"
      fetchpriority="high"
    />
    <a href="/">
      <img
        class="w-[400px] md:w-[600px] absolute m-auto left-0 right-0 top-12 md:top-32 z-10 mix-blend-color-dodge"
        srcset={logoAndType2025}
        sizes="800px"
        alt="sundowners logo"
      /></a
    >

    <div
      class="h-1 md:h-2 w-full absolute bottom-0"
      style="background-image: url('{fabricSunrise}'); background-repeat: repeat; background-size: 25%; background-position: center;"
    />
  </header>
  <slot />
  <footer class="col-span-12">
    <img
      srcset={logoLion}
      sizes="256px"
      class="col-span-12 mx-auto mb-4 mt-24"
      alt="t + l"
      loading="lazy"
    />
    <h2
      class="px-8 md:px-0 col-span-12 max-w-prose mx-auto text-xl md:text-2xl font-garamond text-orange-950 mb-4 text-center"
    >
      Collaborate with us if you would like to participate as a musician, DJ,
      dancer, artist or in any creative capacity.
    </h2>
    <p
      class="col-span-12 max-w-prose mx-auto px-8 md:px-0 text-sm text-center leading-relaxed text-orange-950 text-opacity-80"
    >
      At Black Rock City and year-round, our goal is to spread the Sundowners'
      vision through our flavor of African diaspora events, creative projects,
      and community involvement.<br /><br />We would love to hear from you.<br
      /><br />
      <a
        href="mailto:sundownersbrc@gmail.com"
        class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2"
        >Email Us</a
      >

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfv2tBFZXZsBnXomp4Ke-zkuQeW33qUtsqnGlwixeMUJYpAXg/viewform?usp=sf_link"
        class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2"
        >DJ Application Form</a
      >
    </p>

    <!-- <div id="store" class="absolute bottom-0 right-0 hidden">
    <div class="absolute top-0 md:top-12 w-64">
      <a href="https://shop.sundowners.org/"
        ><img
          src={visitOurStore}
          class="mb-2"
          alt="click here to visit our store"
          loading="lazy"
        />
      </a>
      <h3
        class="text-xs text-orange-950 text-opacity-80 leading-relaxed text-center"
      >
        20% of each purchase goes towards support for our camp & Rexan 🦁
      </h3>
    </div>

    <picture class="">
      <img
        src={shoppng}
        class="w-[24rem] md:w-[32rem]"
        alt="sundowners merchandise"
        loading="lazy"
      />
    </picture>
  </div> -->
  </footer>
</main>
