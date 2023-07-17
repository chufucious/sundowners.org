<script>
  import logo from "$lib/assets/images/logo/words.png?w=400;900;1200&as=srcset";
  import logoLion from "$lib/assets/images/logo/lion.svg?w=400;900;1200&as=srcset";
  import gutterBottom from "$lib/assets/images/Gutter/Bottom.png";
  import gutterLeft from "$lib/assets/images/Gutter/Left.png";
  import gutterTop from "$lib/assets/images/Gutter/Top.png";
  import gutterRight from "$lib/assets/images/Gutter/Right.png";
  import katiesunset from "$lib/assets/images/Photos/katiesunset.jpg?w=400;900;1200&as=srcset";
  import devofisheye from "$lib/assets/images/Photos/devofisheye.jpg?w=400;900;1200&as=srcset";
  import gregonrexan from "$lib/assets/images/Photos/gregonrexan.jpg?w=400;900;1200&as=srcset";
  import runninglion from "$lib/assets/images/Photos/runninglion.jpg?w=400;900;1200&as=srcset";
  import rexanjump from "$lib/assets/images/Photos/rexanjump.jpg?w=400;900;1200&as=srcset";
  import logoMosaic from "$lib/assets/images/logo/Mosaic.png?w=400;900;1200&as=srcset";
  import sundownerswalking from "$lib/assets/images/Photos/sundownerswalking.jpg?w=400;1080&as=srcset";
  import rexanFire from "$lib/assets/images/Photos/rexan-fire.jpg?w=400;1080&as=srcset";
  import rexanDancer from "$lib/assets/images/Photos/rexan-dancer.jpg?w=400;1080&as=srcset";
  import rexanNightWide from "$lib/assets/images/Photos/rexan-night-wide.jpg?w=400;1080&as=srcset";
  import group2022 from "$lib/assets/images/Photos/2022-group.jpg?w=400;1080&as=srcset";
  import danSign from "$lib/assets/images/Photos/dan-sign.jpg?w=400;1080&as=srcset";
  import gregFlying from "$lib/assets/images/Photos/greg-flying.jpg?w=400;1080&as=srcset";
  import footerImage from "$lib/assets/images/Footer.png?w=400;1080&as=srcset";
</script>

<article class="grid grid-cols-12 gap-4 font-mono leading-relaxed">
  <header class="col-span-12 h-52">
    <img
      class="w-48 absolute m-auto left-0 right-0 top-8"
      srcset={logoMosaic}
      alt="sundowners mosaic logo"
    />

    <picture>
      <img
        srcset={sundownerswalking}
        sizes=""
        alt="Sundowners walking"
        class=""
      />
    </picture>
  </header>

  <picture class="col-start-3 col-span-8">
    <img srcset={rexanjump} sizes="" alt="jump!" class="" />
  </picture>

  <section id="intro" class="col-span-12 mt-32">
    <div class="grid grid-cols-12 gap-4">
      <p class="col-start-3 col-span-6 mb-8 text-orange-950">
        <span class="text-orange-500 font-bold">OUR CAMP</span> is centered on
        creating liminal spaces to celebrate the multicultural art, music,
        dance, and hospitality that African traditions and speakeasies bring to
        the world.<br /><br />We strive for a holistic offering through our
        shebeen speakeasy and safari-theme art car. However, the deep artistry,
        meaning, and humanity of African-based music is our creative North Star.<br
        /><br />We flavor our experience through Afrofuturism, imagining a
        positive, inclusive future through speculative art and technology,
        representing the diverse background and skills of our community.
      </p>
    </div>
    <div class="col-span-12 flex overflow-x-auto no-scrollbar">
      <img srcset={rexanDancer} alt="dancer on rexan" />
    </div>
  </section>
  <section id="history" class="col-span-12">
    <div class="grid grid-cols-12 gap-4">
      <p class="col-start-3 col-span-6 mt-48 mb-8 text-orange-950">
        <span class="text-orange-500 font-bold">IN 2017</span>, a passionate
        crew of longtime Burning Man vets from across the globe traveled to
        South Africa and went on a life-changing wildlife safari. On the
        Savannah, we would end each day with the country's lovely sunset social
        ceremony.<br /><br />
        That same year, we dubbed ourselves Sundowners and created Rexan, a psychedelic
        safari-themed art car to bring this special cultural ritual to the Burning
        Man community and beyond.
      </p>
      <div class="col-span-12 flex overflow-x-auto no-scrollbar">
        <img
          srcset={gregonrexan}
          sizes="(max-width: 640px) 640px, (max-width: 768px) 1024px, 1024"
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
      </div>
    </div>
  </section>
  <section
    id="mission"
    class="col-span-12 bg-gradient-to-b from-indigo-400 to-orange-300 mt-48"
  >
    <div class="grid grid-cols-12 gap-4 text-white">
      <p class="col-start-7 col-span-4 mt-48 mb-8">
        <span class="font-bold">OUR MISSION</span> is to directly challenge nationalism
        through our unique expression of diversity. We are an African-diaspora inspired
        art collective named after 'Sundowners' - a wonderful South African tradition
        of sharing stories, laughter, and libations at dusk.
      </p>
      <div class="col-start-3 col-span-8">
        <picture class="col-start-3 col-span-8">
          <img srcset={katiesunset} sizes="" alt="jump!" class="" />
        </picture>
      </div>
      <p class="col-start-7 col-span-4 mt-8 mb-32">
        We feel Burning Man, as the world’s largest temporary city, is a fitting
        ecosystem to explore a unique ethnographic heritage that has expressed
        itself across Africa, America, South America, and the Caribbean.
      </p>
    </div>
  </section>

  <section id="collaborate" class="col-span-12">
    <div class="grid grid-cols-12 gap-4">
      <p class="col-start-3 col-span-6 mt-48 text-orange-950 mb-8">
        <span class="text-orange-500 font-bold"
          >OUR VETERAN, MULTI-CONTINENTAL CREW</span
        > offers an experience, interactivity, and vibe that is distinct from anything
        in Black Rock. At every step, we strive to share the wonder and appreciation
        for one of the most special places on the planet, much like Burning Man itself.
      </p>
      <div class="col-start-3 col-span-8 flex overflow-x-auto no-scrollbar">
        <img srcset={gregFlying} alt="dan with sign" />
      </div>
    </div>
  </section>

  <section id="collaborate" class="col-span-12">
    <div class="grid grid-cols-12 gap-4">
      <p class="col-start-3 col-span-6 mt-48 text-orange-950">
        <span class="text-orange-500 font-bold">COLLABORATE WITH US</span> if
        you would like to participate as a musician, DJ, dancer, artist or in
        any creative capacity. At Black Rock City and year-round, our goal is to
        spread the Sundowners' vision through our flavor of African diaspora
        events, creative projects, and community involvement.<br /><br />We
        would love to hear from you.<br /><br />

        <button
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-none"
          >EMAIL US</button
        >
      </p>
    </div>
  </section>
  <footer class="col-span-12 mt-32">
    <img srcset={footerImage} sizes="" alt="footer" class="" />
  </footer>
</article>
