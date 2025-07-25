<script>
  import "../app.css";
  import shoppng from "$lib/assets/Shop.png?w=512&format=webp";
  import visitOurStore from "$lib/assets/btn/visit-our-store.png?w=200&format=webp";
  import logoMosaic from "$lib/assets/logo/Mosaic.png?w=400;800&format=webp&as=srcset";
  import sundownerswalking from "$lib/assets/Photos/sundownerswalking.jpg?w=390;768;1366;1920&format=webp&as=srcset";
  import fabricSunrise from "$lib/assets/wax-fabric/sunrise.jpeg?w=300&format=webp";
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

<main class="grid grid-cols-12 gap-4 font-mono">
  <header class="col-span-12 h-[18rem] md:h-[36rem] relative overflow-hidden">
    <img
      srcset={sundownerswalking}
      sizes="100vw"
      alt="Sundowners walking in Black Rock City"
      class="absolute inset-0 w-full h-full object-cover"
      fetchpriority="high"
    />
    <img
      class="w-64 absolute m-auto left-0 right-0 top-12 md:top-16 z-10"
      srcset={logoMosaic}
      sizes="400px"
      alt="sundowners mosaic logo"
    />

    <div
      class="h-1 md:h-2 w-full absolute bottom-0"
      style="background-image: url('{fabricSunrise}'); background-repeat: repeat; background-size: 25%; background-position: center;"
    />
  </header>
  <slot />
</main>
<footer class="col-span-12 mt-32 relative h-32">
  <div id="store" class="absolute bottom-0 right-0 hidden">
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
  </div>
</footer>
