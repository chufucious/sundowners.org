<script>
  import logo from "$lib/assets/images/logo/sundowners/words.png?w=400;900;1200&as=srcset";
  import logoLion from "$lib/assets/images/logo/sundowners/lion.svg?w=400;900;1200&as=srcset";
  import gutterBottom from "$lib/assets/images/Gutter/Bottom.png";
  import gutterLeft from "$lib/assets/images/Gutter/Left.png";
  import gutterTop from "$lib/assets/images/Gutter/Top.png";
  import gutterRight from "$lib/assets/images/Gutter/Right.png";
  import katiesunset from "$lib/assets/images/Photos/katiesunset.jpg?w=400;900;1200&as=srcset";
  import devofisheye from "$lib/assets/images/Photos/devofisheye.jpg?w=400;900;1200&as=srcset";
  import gregonrexan from "$lib/assets/images/Photos/gregonrexan.jpg?w=400;900;1200&as=srcset";
  import runninglion from "$lib/assets/images/Photos/runninglion.jpg?w=400;900;1200&as=srcset";
  import rexanjump from "$lib/assets/images/Photos/rexanjump.jpg?w=400;900;1200&as=srcset";
  // import sundownerswalking from "$lib/assets/images/Photos/sundownerswalking.jpg?w=640;1024;1280&as=srcset";
  import sundownerswalking from "$lib/assets/images/Photos/sundownerswalking.jpg?w=400;1080&as=srcset";
</script>

<div class="fixed top-0 h-3">
  <img src={gutterTop} alt="top gutter wax fabric pattern" />
</div>
<div class="fixed bottom-0 h-3">
  <img src={gutterBottom} alt="bottom gutter wax fabric pattern" />
</div>
<div class="fixed top-0 right-0 w-3">
  <img src={gutterRight} alt="right gutter wax fabric pattern" />
</div>
<div class="fixed top-0 left-0 w-3">
  <img src={gutterLeft} alt="left gutter wax fabric pattern" />
</div>

<div class="text-white container mx-auto">
  <header class="fixed top-10 left-10 flex mix-blend-difference">
    <img class="h-auto mr-4" alt="sundowners lion logo" srcset={logoLion} />
    <img class="h-auto w-48 object-contain" alt="sundowners" srcset={logo} />
  </header>
  <img
    srcset={sundownerswalking}
    sizes=""
    alt="Sundowners walking"
    class="min-h-[40vh] object-fill"
  />
  <section class="mt-24 mb-24 mx-auto text-center p-8">
    <h3 class="text-orange-600 mb-4">MISSION</h3>
    <p
      class="font-mono text-md text-stone-900 leading-relaxed max-w-prose mx-auto"
    >
      We are an African-diaspora inspired art collective named after
      'Sundowners' - a wonderful South African tradition of sharing stories,
      laughter, and libations at dusk. We feel Burning Man, as the world’s
      largest temporary city, is a fitting ecosystem to explore a unique
      ethnographic heritage that has expressed itself across Africa, America,
      South America, and the Caribbean. At the highest level, we aim to directly
      challenge nationalism through our unique expression of diversity.
    </p>
  </section>

  <section class="flex space-x-0.5 overflow-x-auto no-scrollbar">
    <img
      srcset={gregonrexan}
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
      alt="on rexan"
      class="max-h-96"
    />
    <img
      srcset={katiesunset}
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
      alt="viewing sunset"
      class="max-h-64"
    />
    <img
      srcset={runninglion}
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
      alt="a running lion"
      class="max-h-80"
    />
    <img
      srcset={devofisheye}
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
      alt="fisheye lens"
      class="max-h-96"
    />
  </section>

  <section class="mt-24 mb-24 mx-auto text-center p-8">
    <h3 class="text-orange-600 mb-4">OFFERING</h3>
    <p
      class="font-mono text-md text-stone-900 leading-relaxed max-w-prose mx-auto"
    >
      Our camp is centered on creating special liminal spaces to celebrate the
      multicultural art, music, dance, and hospitality that African traditions
      and speakeasies bring to the world. We strive for a holistic offering
      through our shebeen speakeasy and safari-theme art car. However, the deep
      artistry, meaning, and humanity of African-based music is our creative
      North Star. We flavor our experience through Afrofuturism, imagining a
      positive, inclusive future through speculative art and technology,
      representing the diverse background and skills of our community.
    </p>
  </section>

  <section class="flex">
    <img
      srcset={rexanjump}
      sizes="(min-width: 640px) 640px, (min-width: 1024px) 1200px"
      alt="rexan crew jumping"
      class="w-full h-auto"
    />
  </section>

  <section class="mt-24 mb-24 mx-auto text-center p-8">
    <h3 class="text-orange-600 mb-4">CREW</h3>
    <p
      class="font-mono text-md text-stone-900 leading-relaxed max-w-prose mx-auto"
    >
      Our veteran multi-continental crew offers an experience, interactivity,
      and vibe that is distinct from anything in Black Rock. At every step, we
      strive to share the wonder and appreciation for one of the most special
      places on the planet, much like Burning Man itself.
    </p>
  </section>

  <section class="mt-24 mb-24 mx-auto text-center p-8">
    <h3 class="text-orange-600 mb-4">HISTORY</h3>
    <p
      class="font-mono text-md text-stone-900 leading-relaxed max-w-prose mx-auto"
    >
      In 2017, a passionate crew of longtime Burning Man vets from across the
      globe traveled to South Africa and went on a life-changing wildlife
      safari. On the Savannah, we would end each day with the country’s lovely
      sunset social ceremony. That same year, we dubbed ourselves Sundowners and
      created Rexan, a psychedelic safari-themed art car to bring this special
      cultural ritual to the Burning Man community and beyond.
    </p>
  </section>

  <section class="mt-24 mb-24 mx-auto text-center p-8">
    <h3 class="text-orange-600 mb-4">COLLABORATE</h3>
    <p
      class="font-mono text-md text-stone-900 leading-relaxed max-w-prose mx-auto"
    >
      At Black Rock City and year-round, our goal is to spread the Sundowners'
      vision through our flavor of African diaspora events, creative projects,
      and community involvement. If you would like to participate as a musician,
      DJ, dancer, artist or in any creative capacity we would love to hear from
      you.
    </p>
  </section>
</div>
