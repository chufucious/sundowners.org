<script>
  import logo from "$lib/assets/logo/words.png?w=400;900;1200&as=srcset";
  import logoLion from "$lib/assets/logo/lion.svg?w=400;900;1200&as=srcset";
  import katiesunset from "$lib/assets/Photos/katiesunset.jpg?w=400;900;1200&as=srcset";
  import devofisheye from "$lib/assets/Photos/devofisheye.jpg?w=400;900;1200&as=srcset";
  import gregonrexan from "$lib/assets/Photos/gregonrexan.jpg?w=400;900;1200&as=srcset";
  import runninglion from "$lib/assets/Photos/runninglion.jpg?w=400;900;1200&as=srcset";
  import rexanjump from "$lib/assets/Photos/rexanjump.jpg?w=400;900;1200&as=srcset";
  import logoMosaic from "$lib/assets/logo/Mosaic.png?w=400;900;1200&as=srcset";
  import sundownerswalking from "$lib/assets/Photos/sundownerswalking.jpg?w=1080";
  import rexanFire from "$lib/assets/Photos/rexan-fire.jpg?w=400;1080&as=srcset";
  import rexanDancer from "$lib/assets/Photos/rexan-dancer.jpg?w=400;1080&as=srcset";
  import rexanNightWide from "$lib/assets/Photos/rexan-night-wide.jpg?w=400;1080&as=srcset";
  import danSign from "$lib/assets/Photos/dan-sign.jpg?w=400;1080&as=srcset";
  import gregFlying from "$lib/assets/Photos/greg-flying.jpg?w=400;1080&as=srcset";
  import fabricSunrise from "$lib/assets/wax-fabric/sunrise.jpeg?w=400";
  import patternDazzle from "$lib/assets/dazzle.jpeg?w=500";
  import patternChickens from "$lib/assets/wax-fabric/chickens.webp?w=800";
  import patternFans from "$lib/assets/wax-fabric/fans.jpg?w=800";
  import patternSunflower from "$lib/assets/wax-fabric/sunflower.webp?w=800";
  import patternSpirograph from "$lib/assets/wax-fabric/spirograph.png?w=400&format=webp";
  import patternHandshake from "$lib/assets/wax-fabric/handshake.jpg?w=800";
  import patternLeaves from "$lib/assets/wax-fabric/leaves.jpeg?w=800";
  import rexanEvolution from "$lib/assets/rexan-evolution.png?w=1600";
  import lionAndLeyla from "$lib/assets/Photos/lion-and-leyla.jpg?w=1600";
  import coogieSign from "$lib/assets/Photos/coogie-sign.jpg?w=1600";
  import group2022 from "$lib/assets/Photos/2022-group.jpg?w=1600";
  import patternLeopard from "$lib/assets/wax-fabric/leopard-pattern.avif?w=800";
  import joshRexan from "$lib/assets/Photos/josh-on-rexan.jpg?w=1600";
  import zuraSpotter from "$lib/assets/Photos/zura-spotter-seat.jpg?w=1600";
  import tucoLauren from "$lib/assets/Photos/tucolauren.jpg?w=1600";
  import sign from "$lib/assets/Photos/sign.jpg?w=1600";
  import jonSmoke from "$lib/assets/Photos/jon-smoke.jpg?w=1600";
  import shopwebp from "$lib/assets/Shop.png?w=640;768;1024&format=webp&as=srcset";
  import shoppng from "$lib/assets/Shop.png?w=640";
  import visitOurStore from "$lib/assets/btn/visit-our-store.png";
  import rexanGroup2023 from "$lib/assets/Photos/DSC01143-Edit.jpeg?w=800;1600;2400&format=webp&as=srcset";
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

<article class="grid grid-cols-12 gap-4 font-mono">
  <header
    class="col-span-12 h-[18rem] md:h-[36rem] relative"
    style="background-image: url('{sundownerswalking}'); background-position: center; background-size: cover;"
  >
    <img
      class="w-64 absolute m-auto left-0 right-0 top-12 md:top-16"
      srcset={logoMosaic}
      alt="sundowners mosaic logo"
    />

    <div
      class="h-1 md:h-2 w-full absolute bottom-0"
      style="background-image: url('{fabricSunrise}') ; background-repeat: repeat; background-size: 25%; background-position: center;"
    />
  </header>

  <section id="intro" class="col-span-12 relative">
    <div class="grid grid-cols-12 gap-4">
      <div
        class="col-start-2 col-span-10 md:col-start-3 md:col-span-8 p-2 -rotate-1 md:-mt-72 mb-12"
        style="background-image: url('{patternSunflower}'); background-repeat: repeat; background-size: contain; background-position: center;"
      >
        <img
          srcset={rexanGroup2023}
          sizes="(max-width: 768px) 100vw, 80vw"
          alt="jump!"
          class="max-w-full"
          loading="lazy"
        />
      </div>
      <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
        <h2 class="text-xl md:text-2xl text-orange-950 mb-4 font-garamond">
          🦁 See you in 2025! Come visit us at 7:45 & E.
        </h2>
        <h2 class="text-xl md:text-2xl text-orange-950 mb-4 font-garamond">
          Sundowners is centered on creating liminal spaces to celebrate the
          multicultural art, music, dance, and hospitality that African
          traditions and speakeasies bring to the world.
        </h2>
        <p
          class="text-sm text-orange-950 text-opacity-80 leading-relaxed max-w-prose"
        >
          We strive for a holistic offering through our shebeen speakeasy and
          safari-theme art car. The deep artistry, meaning, and humanity of
          African-based music is our creative North Star.<br /><br />We flavor
          our experience through Afrofuturism, imagining a positive, inclusive
          future through speculative art and technology, representing the
          diverse background and skills of our community.
        </p>
      </div>
      <div
        class="col-start-2 col-span-10 md:col-start-8 md:col-span-3 md:pl-16"
      >
        <div
          class="bg-white rounded border border-black border-opacity-10 divide-y divide-black divide-opacity-10 h-fit mt-8 md:mt-0"
        >
          <div class="p-4">
            <h3 class="text-stone-500 text-xs tracking-tighter mb-2">
              2025 ADDRESS
            </h3>
            <p class="text-sm text-stone-950">7:45 & Ellison</p>
          </div>
          <div class="p-4">
            <h3 class="text-stone-500 text-xs tracking-tighter mb-2">
              INSTAGRAM
            </h3>
            <p class="text-sm">
              <a
                href="https://www.instagram.com/sundownerssafari/"
                class="text-orange-500 underline hover:text-orange-700"
                >@sundownerssafari</a
              >
            </p>
          </div>
          <div class="p-4">
            <h3 class="text-stone-500 text-xs tracking-tighter mb-2">EMAIL</h3>
            <p class="text-sm">
              <a
                href="mailto:sundownersbrc@gmail.com"
                class="text-orange-500 underline hover:text-orange-700"
                >Contact Us</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="collage" class="col-span-12 mt-4 overflow-hidden py-12">
    <div class="relative w-full h-screen">
      <div
        class="absolute w-full top-0 md:w-[48rem] md:top-0 md:left-1/4 p-2 rotate-1 drop-shadow-xl"
        style="background-image: url('{patternFans}'); background-repeat: repeat; background-size: contain; background-position: center;"
      >
        <img srcset={tucoLauren} class="object-cover" alt="t + l" />
      </div>
      <div
        class="absolute md:w-[23rem] top-48 md:top-24 ml-8 p-2 -rotate-1 drop-shadow-xl"
        style="background-image: url('{patternSpirograph}'); background-repeat: repeat; background-size: contain; background-position: center;"
      >
        <img
          srcset={coogieSign}
          class=" object-cover"
          alt="sundowners with sign"
        />
      </div>
      <div
        class="absolute md:w-[23rem] w-[12rem] top-20 right-0 invisible md:visible md:bottom-1/4 md:right-0 p-2 rotate-12 drop-shadow-xl"
        style="background-image: url('{patternLeaves}'); background-repeat: repeat; background-size: contain; background-position: center;"
      >
        <img srcset={joshRexan} class="object-cover" alt="j on rexan" />
      </div>
      <div
        class="absolute md:w-[44rem] bottom-0 md:right-48 p-2 rotate-3 drop-shadow-xl"
        style="background-image: url('{patternHandshake}'); background-repeat: repeat; background-size: contain; background-position: center;"
      >
        <img srcset={zuraSpotter} class="object-cover" alt="z on spotter" />
      </div>
    </div>
  </section>

  <section id="crew" class="col-span-12 md:mt-8">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-start-2 md:col-span-6 md:mr-8 px-6">
        <div
          class="w-full p-2 -rotate-1 drop-shadow-xl"
          style="background-image: url('{patternLeopard}'); background-repeat: repeat; background-size: contain; background-position: center; "
        >
          <img srcset={group2022} alt="2022 group" />
        </div>
      </div>
      <div class="col-start-2 col-span-10 md:col-start-8 md:col-span-4 mt-8">
        <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
          Our veteran, multi-continental crew offers an experience,
          interactivity, and vibe that is distinct from anything in Black Rock.
        </h2>
        <p
          class="text-sm text-orange-950 text-opacity-80 leading-relaxed max-w-prose"
        >
          At every step, we strive to share the wonder and appreciation for one
          of the most special places on the planet, much like Burning Man
          itself.
        </p>
      </div>
    </div>
  </section>

  <section id="" class="col-span-12 overflow-hidden mt-48">
    <div
      class="p-2 md:p-4 drop-shadow-xl -rotate-1"
      style="background-image: url('{patternChickens}'); background-repeat: repeat; background-size: contain; background-position: center;"
    >
      <img
        srcset={lionAndLeyla}
        alt="lion and l"
        class="w-full h-auto object-cover"
      />
    </div>
  </section>

  <section
    id="mission"
    class="col-span-12 bg-gradient-to-b from-sky-900 bg-amber-800 mt-48"
  >
    <div
      class="h-2 md:h-4 w-full"
      style="background-image: url('{patternDazzle}') ; background-repeat: repeat-x;"
    />
    <div class="grid grid-cols-12 gap-4 text-white pt-48">
      <h2
        class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-xl md:text-2xl font-garamond text-white mb-4"
      >
        Our mission is to challenge nationalism through our unique expression of
        diversity.
      </h2>
      <p
        class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm mb-8 text-opacity-80 leading-relaxed"
      >
        We are an African-diaspora inspired art collective named after
        'Sundowners' - a wonderful South African tradition of sharing stories,
        laughter, and libations at dusk.
      </p>
      <div class="col-span-12 md:col-start-3 md:col-span-8">
        <picture class="col-start-3 col-span-8">
          <img
            srcset={katiesunset}
            sizes=""
            alt="k staring into distance"
            class="drop-shadow-xl"
          />
        </picture>
      </div>
      <p
        class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm text-opacity-80 mt-8 mb-48 leading-relaxed"
      >
        We feel Burning Man, as the world's largest temporary city, is a fitting
        ecosystem to explore a unique ethnographic heritage that has expressed
        itself across Africa, America, South America, and the Caribbean.
      </p>
    </div>
    <div
      class="h-2 md:h-4 w-full"
      style="background-image: url('{patternDazzle}') ; background-repeat: repeat-x;"
    />
  </section>

  <section id="history" class="col-span-12 mt-48">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
        <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
          In 2017, a passionate crew of longtime Burning Man vets from across
          the globe traveled to South Africa and went on a life-changing
          wildlife safari.
        </h2>
        <p
          class="text-sm mb-8 text-orange-950 text-opacity-80 leading-relaxed max-w-prose"
        >
          On the Savannah, we would end each day with the country's lovely
          sunset social ceremony.<br /><br />
          That same year, we dubbed ourselves Sundowners and created Rexan, a psychedelic
          safari-themed art car to bring this special cultural ritual to the Burning
          Man community and beyond.
        </p>
      </div>

      <div
        class="col-start-2 col-span-10 md:col-start-8 md:col-span-4 md:pl-8 relative"
      >
        <table
          class="text-orange-950 text-opacity-50 text-xs border-separate border-spacing-4 bg-orange-950 bg-opacity-5 w-full rounded"
        >
          <caption class="mb-4 text-orange-950">EXPEDITIONS</caption>

          <tbody>
            <tr>
              <td>2025</td>
              <td>
                <a
                  href="https://journal.burningman.org/2024/11/philosophical-center/the-theme/burning-man-2025-tomorrow-today/"
                  class="underline hover:text-orange-500"
                >
                  Tomorrow Today
                </a>
              </td>
              <td>7:45 & Ellison</td>
            </tr><tr>
              <td>2024</td>
              <td
                ><a
                  href="https://journal.burningman.org/2023/10/philosophical-center/the-theme/2024-curiouser-curiouser/"
                  class="underline hover:text-orange-500"
                  >Curiouser & Curiouser</a
                ></td
              >
              <td>Rest year</td>
            </tr>
            <tr>
              <td>2023</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2023-event-archive/"
                  class="underline hover:text-orange-500">Animalia</a
                ></td
              >
              <td>4:45 & Grootslang</td>
            </tr>
            <tr>
              <td>2022</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2022-event-archive/"
                  class="underline hover:text-orange-500">Waking Dreams</a
                ></td
              >
              <td>4:15 & Glimmer</td>
            </tr>
            <tr class="line-through">
              <td>2021</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2021-event-archive/"
                  class="underline hover:text-orange-500">The Great Unknown</a
                ></td
              >
              <td>CANCELLED</td>
            </tr>
            <tr class="line-through">
              <td>2020</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2020-event-archive/"
                  class="underline hover:text-orange-500">The Multiverse</a
                ></td
              >
              <td>CANCELLED</td>
            </tr>
            <tr>
              <td>2019</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2019-event-archive/"
                  class="underline hover:text-orange-500">Metamorphoses</a
                ></td
              >
              <td>4:15 & Hyacinth</td>
            </tr>
            <tr>
              <td>2018</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2018-event-archive/"
                  class="underline hover:text-orange-500">I, Robot</a
                ></td
              >
              <td>8:15 & Cylon</td>
            </tr>
            <tr>
              <td>2017</td>
              <td
                ><a
                  href="https://burningman.org/about/history/brc-history/event-archives/2017-event-archive/2017-art-theme-radical-ritual/"
                  class="underline hover:text-orange-500">Radical Ritual</a
                ></td
              >
              <td>7:30 & Labyrinth</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="col-start-1 col-span-12 md:col-start-2 md:col-span-10 flex overflow-x-auto no-scrollbar p-2 mb-8"
      >
        <img
          srcset={rexanEvolution}
          alt="the evolution of our art car, rexan"
          class="w-full"
        />
      </div>
    </div>
  </section>

  <section id="collaborate" class="col-span-12 mt-48">
    <div class="grid grid-cols-12 gap-4">
      <div
        id="gallery"
        class="col-span-12 inline-flex overflow-x-auto no-scrollbar mb-8"
      >
        <img
          srcset={gregonrexan}
          sizes="(max-width: 640px) 640px, (max-width: 768px) 1024px, 1024"
          alt="on rexan"
          class="w-full max-h-96 object-cover"
        />
        <img
          srcset={jonSmoke}
          sizes="(max-width: 640px) 640px, (max-width: 768px) 1024px, 1024"
          alt="j attracting influencers"
          class="w-full max-h-64 object-cover"
        />
        <img
          srcset={rexanDancer}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="dancer on rexan"
          class="w-full max-h-96 object-cover self-end"
        />
        <img
          srcset={runninglion}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="a running lion"
          class="w-full max-h-80 object-cover"
        />
        <img
          srcset={sign}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="sundowners sign"
          class="w-full max-h-96 object-cover"
        />
        <img
          srcset={gregFlying}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="g flying"
          class="w-full max-h-80 object-cover self-end"
        />
        <img
          srcset={devofisheye}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="fisheye lens"
          class="w-full max-h-96 object-cover"
        />
        <img
          srcset={rexanFire}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="fire on rexan"
          class="w-full max-h-80 object-cover"
        />
        <img
          srcset={rexanNightWide}
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1280px"
          alt="night time with rexan"
          class="w-full max-h-96 object-cover"
        />
      </div>

      <img
        srcset={logoLion}
        class="col-span-12 mx-auto mb-4 mt-24"
        alt="t + l"
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
    </div>
  </section>
  <footer class="col-span-12 mt-32 relative h-32">
    <div id="store" class="absolute bottom-0 right-0 hidden">
      <div class="absolute top-0 md:top-12 w-64">
        <a href="https://shop.sundowners.org/"
          ><img
            src={visitOurStore}
            class="mb-2"
            alt="click here to visit our store"
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
        />
      </picture>
    </div>
  </footer>
</article>
