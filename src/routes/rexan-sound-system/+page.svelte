<script>
  import Photo from "#lib/components/Photo.svelte";
  import PhotoRow from "#lib/components/PhotoRow.svelte";
  import VideoLoop from "#lib/components/VideoLoop.svelte";
  import buildStockVan from "#lib/assets/rexan-sound/2017-build-stock-van.jpg?w=400;800;1200&enhanced";
  import buildBodyOff from "#lib/assets/rexan-sound/2017-build-body-off.jpg?w=400;800;1200&enhanced";
  import buildWelding from "#lib/assets/rexan-sound/2017-build-welding.jpg?w=400;800;1200&enhanced";
  import behringer2017 from "#lib/assets/rexan-sound/2017-behringer.jpg?w=400;800;1200&enhanced";
  import behringer2019 from "#lib/assets/rexan-sound/2019-behringer.jpg?w=400;800;1179&enhanced";
  import qsc2022 from "#lib/assets/rexan-sound/2022-first-qsc.jpg?w=400;768&enhanced";
  import qsc2023 from "#lib/assets/rexan-sound/2023-qsc.jpg?w=400;848&enhanced";
  import sunrise2025 from "#lib/assets/rexan-sound/2025-sunrise.jpg?w=400;800;1179&enhanced";
  import beforeMounts2026 from "#lib/assets/rexan-sound/2026-before-mounts.jpg?w=400;800;1179&enhanced";
  import afterMounts2026 from "#lib/assets/rexan-sound/2026-after-mounts.jpg?w=400;800;1179&enhanced";
  import duskLoop from "#lib/assets/rexan-sound/dusk-loop.mp4";
  import duskLoopPoster from "#lib/assets/rexan-sound/dusk-loop-poster.jpg";
  import panelsLoop from "#lib/assets/rexan-sound/panels-loop.mp4";
  import panelsLoopPoster from "#lib/assets/rexan-sound/panels-loop-poster.jpg";
  import panelTestLoop from "#lib/assets/rexan-sound/panel-test-loop.mp4";
  import panelTestLoopPoster from "#lib/assets/rexan-sound/panel-test-loop-poster.jpg";
  import EvolutionCarousel from "#lib/components/rexan/EvolutionCarousel.svelte";
  import CurrentRigDiagram from "#lib/components/rexan/CurrentRigDiagram.svelte";
  import SideTowersDiagram from "#lib/components/rexan/SideTowersDiagram.svelte";
  import TableOfContents from "#lib/components/TableOfContents.svelte";
  import ArticleText from "#lib/components/ArticleText.svelte";
  import { articleLayout } from "#lib/article-styles.js";

  // Title / OG tags come from this route's load() and are rendered
  // once by +layout.svelte — see the meta defaults there.

  // Photos run wider than the text; the widest reach near the page edges.
  const photoColumn = "mx-auto max-w-4xl px-6";
  const widePhotoColumn = "mx-auto max-w-7xl px-4 md:px-6";
  // The build photos: one large beside two small, between the two.
  const featurePhotoColumn = "mx-auto max-w-5xl px-6";
  // Smaller photos beside the main build photo.
  const smallPhotoSizes = "(max-width: 768px) 100vw, 20rem";
  // Diagrams set their two views side by side, so they need the room too.
  const diagramColumn = "mx-auto max-w-6xl px-6";

  // Section headings, in order; the table of contents links to these ids.
  const sections = [
    { id: "where-we-started", title: "Where we started" },
    { id: "the-rig-today", title: "The rig today" },
    { id: "whats-your-sound-system", title: '"What\'s your sound system?"' },
    { id: "keeping-it-green", title: "Keeping it green" },
    { id: "bumps-in-the-road", title: "Bumps in the road (and what we learned)" },
    { id: "whats-next", title: "What's next for year ten" },
    { id: "thanks", title: "Thanks" },
  ];
  const sectionTitle = Object.fromEntries(sections.map(({ id, title }) => [id, title]));
</script>

<!-- scroll-mt clears the compact logo when jumping to a section. -->
{#snippet sectionHeading(id)}
  <h2 {id} class="scroll-mt-24 pt-8 md:pt-12">{sectionTitle[id]}</h2>
{/snippet}

<!-- The hero photo is the site header on this page (headerImage in +page.server.ts). -->
<article class="col-span-12 grid grid-cols-1 lg:grid-cols-[minmax(12rem,1fr)_minmax(0,80rem)_minmax(12rem,1fr)] {articleLayout}">
  <!-- Editorial title block: centred, the title set huge with tight leading. -->
  <header class="col-span-full w-full mx-auto max-w-7xl px-6 mt-12 md:mt-20 mb-16 md:mb-24 text-center">
    <h1 class="font-sans font-light uppercase tracking-tight leading-[0.9] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-balance">
      The Rexan Sound System
    </h1>
    <p class="mt-6 md:mt-8 text-xl md:text-3xl lg:text-4xl leading-snug text-balance text-orange-950/75">
      How we built a solar-powered QSC rig on a psychedelic safari car.
    </p>
    <p class="mt-6 md:mt-8 font-mono text-sm text-orange-950/80">
      By <strong class="font-semibold text-orange-950">Joshuah Vincent</strong> &amp;
      <strong class="font-semibold text-orange-950">Greg Liburd</strong>
    </p>
  </header>

  <!-- Equal outer tracks keep the article centered; the left track holds the rail. -->
  <aside class="hidden lg:block col-start-1 row-start-2 px-4">
    <div class="sticky top-28 w-40 ml-auto">
      <TableOfContents {sections} />
    </div>
  </aside>

  <div class="min-w-0 lg:col-start-2 lg:row-start-2">
    <ArticleText>
      <p>
        In early 2017 a crew of longtime Burner friends from around the world went on a safari in South
        Africa, and on the Savannah we ended every day the way you do there: a sundowner, which means
        stories, laughter and a drink at dusk. It was a magical, seminal trip. By the end of it we were
        calling ourselves Sundowners, and we'd decided to bring that ritual to Black Rock City.
      </p>
      <p>
        Sundowners is an African-diaspora-inspired art collective and Burning Man camp. We build spaces
        to celebrate the art, music, dance and hospitality of diasporic traditions and speakeasies, with
        some Afrofuturism mixed in. On playa that comes down to two things. The first is our Shebeen,
        named after the South African speakeasy. The second is Rexan.
      </p>
    </ArticleText>

    <!-- One photo large, two small stacked beside it on desktop. Phones stack all
         three in build order: the side column dissolves (contents) so the stock
         van can move ahead of the large photo. -->
    <div class="{featurePhotoColumn} my-12 grid grid-cols-1 md:grid-cols-3 items-start gap-10 md:gap-6">
      <Photo
        image={buildBodyOff}
        alt="The van with its body cut away behind the front seats and a steel frame going up over the back"
        caption="Summer 2017, in Sparks: most of the body cut off and the new frame going up."
        class="md:col-span-2"
      />
      <div class="contents md:grid md:gap-6">
        <Photo
          image={buildStockVan}
          alt="A stock dark-blue 1997 Ford E350 van in a parking lot"
          caption="The E350 as we bought it."
          sizes={smallPhotoSizes}
          class="order-first md:order-none"
        />
        <Photo
          image={buildWelding}
          alt="Welding the new steel cage onto the stripped van at night"
          caption="Welding the new cage, late into the night."
          sizes={smallPhotoSizes}
        />
      </div>
    </div>

    <ArticleText>
      <p>
        Rexan is our psychedelic safari art car. We started from a 1997 Ford E350 with a V10, cut most of
        the body off in a workshop in Sparks, and welded a whole new frame and cage around it. Nine years
        of mutations later there's a two-level viewing deck, a tracker seat up front, zebra-striped LED
        panels, flame-effect lanterns, 29" custom LED disc "googly eyes" on the front, and a dashboard
        sound panel loaded with African animal calls. We take riders out on "game drives" to track
        CAR-nimals, spot ART-ilopes and collect MAN-imals for study. Rexan has been on playa in 2017,
        2018, 2019, 2022, 2023, 2025 and 2026. Next year is our tenth anniversary.
      </p>
      <p>And Rexan's heart is our community, and its voice is its sound system.</p>
    </ArticleText>

    <section aria-label="The evolution of Rexan" class="mt-12">
      <div class="px-6 mb-4">
        <div class="mx-auto max-w-(--reading-width)">
          <p class="eyebrow">The evolution of Rexan</p>
        </div>
      </div>
      <EvolutionCarousel />
    </section>

    <ArticleText class="mt-12">
      {@render sectionHeading("where-we-started")}
      <p>
        Our first years were focused on mutating the vehicle so we could get through the Burning Man DMV
        (Department of Mutant Vehicles) review on playa. Every art car has to be sufficiently mutated to
        get licensed, one license for day and one for night, so our sound system was secondary to that
        goal. In 2017 and 2018 we ran two Behringer speakers mounted at the back for the people riding in
        the cab, with a sub and amp we built. There was no DJ setup. The system was there so the guides
        could talk to riders and so we could play African wildlife sounds, ambient and world music. In
        2019 we added two more Behringers facing forward, a sub and our first DJ setup. It started out as
        a safari tour with a soundtrack, and by 2019 it was turning into a dance floor.
      </p>
    </ArticleText>

    <div class="{widePhotoColumn} my-12">
      <PhotoRow photos={[
        { image: behringer2017, alt: "Rexan in 2017 with Behringer speakers at the back", caption: "2017: two Behringers at the back for the riders, and no DJ setup yet." },
        { image: behringer2019, alt: "Rexan in 2019 with Behringer speakers facing forward", caption: "2019: more Behringers facing forward, a sub, and our first DJ setup." },
      ]} />
    </div>

    <ArticleText>
      <p>
        Being a crew of some talented and seasoned DJs, it was inevitable that the music took over. The
        DJs playing African and African-inspired music at our sundowner ceremonies and pop-ups kept
        getting an amazing response on playa, so the sound system had to grow up. When we came back after
        the pandemic in 2022 we switched to QSC and never looked back.
      </p>
      <p>
        The first QSC rig in 2022 was two K12.2s up top, two more K12.2s as DJ monitors and a single KS118
        sub. It took us from a system that stayed under 90 dB at 30 feet to one we'd compare to an
        intimate dance club. In 2023 we added a second KS118, put four K12.2s up top and moved to using
        K10.2s as DJ monitors. That was the system basically complete. 2025 was a scramble. Two of the
        K12.2s wouldn't work, so we moved K10.2s up top next to the two good ones, and we tried K8.2s as
        DJ monitors. The K8s kept failing on us (those heat fans are just too small for the dust at BRC).
        By 2026 all four K12.2s were working again, and that's the rig we run today.
      </p>
    </ArticleText>

    <div class="{widePhotoColumn} my-12">
      <PhotoRow photos={[
        { image: qsc2022, alt: "Rexan in 2022 with its first QSC speakers", caption: "2022: our first year on QSC." },
        { image: qsc2023, alt: "Rexan in 2023 with four K12.2s on the top bar", caption: "2023: four K12.2s up top and K10.2s on the booth. The two subs are out of frame." },
        { image: sunrise2025, alt: "Rexan at sunrise in 2025 with speakers on the top bar and subs on the passenger side", caption: "Sunrise, 2025. K12.2s and K10.2s up top, the booth monitors in the middle, and the subs stacked on the passenger side." },
      ]} />
    </div>

    <ArticleText>
      {@render sectionHeading("the-rig-today")}
      <p>This is how Rexan is set up now:</p>
      <ul>
        <li><strong>Subs:</strong> 2× QSC KS118, stacked on the passenger (right) side.</li>
        <li><strong>Tops:</strong> 4× QSC K12.2 mounted high on the horizontal top bar, firing out over the deck and the crowd.</li>
        <li><strong>Monitors:</strong> 2× QSC K10.2 in the middle, pointed at the DJ booth.</li>
        <li><strong>Booth:</strong> Pioneer XDJ-1000 decks into a DJM-900NXS mixer.</li>
      </ul>
      <p>It's rated in the "dance club" class (90 dB and up at under 100 feet).</p>
    </ArticleText>

    <div class="{diagramColumn} my-12">
      <CurrentRigDiagram />
    </div>

    <ArticleText>
      {@render sectionHeading("whats-your-sound-system")}
      <p>
        The two main questions we get from people dancing in front of the car are "What's the name of
        this car?" and "What's the sound system?" People come up to the booth all the time to tell us how
        good Rexan sounds, and how much they love hearing our music on it. It's a big part of why we're
        writing this post.
      </p>
      <p>
        Our music is mostly Afro-Latin infused house: tribal, a bit weird, full of bleeps and bloops, and
        mostly on the house tip. We also dive into Brazilian funk, amapiano and unexpected music from all
        over the world. That kind of music needs real low end and clean, clear tops, and the QSC rig gives
        us both.
      </p>
      <p>
        Rexan's size is part of the magic too. A lot of the big art cars are too big or too loud to play
        in the city, so they head out past 10 o'clock and into deep playa before they turn it up. Rexan is
        small enough to cruise through the city with 30 people on it bumping the music, and we love it.
        People come out of their camps to party with us as we roll by, and the love and energy they give
        back is a huge part of why we do this.
      </p>
      <p>
        We turn it down near the Temple and anywhere else that calls for reverence, and we save the full
        volume for the trash fence. In 2026 we planned sunrise runs on Sunday, Tuesday, Thursday and
        Saturday, playing out at the fence from around 5am well into the morning.
      </p>
    </ArticleText>

    <div class="{photoColumn} my-12">
      <VideoLoop
        src={duskLoop}
        poster={duskLoopPoster}
        label="Rexan at dusk on the playa, headlight eyes glowing, a DJ up top and people walking past"
        caption="Rexan at dusk on the playa."
      />
    </div>

    <ArticleText>
      {@render sectionHeading("keeping-it-green")}
      <p>
        Early on we powered the lights and sound with a pair of Honda 2000 generators. That worked, but it
        wasn't who we wanted to be. We've been working toward Burning Man's sustainability roadmap for
        years, and in 2022 we moved the whole light and sound system onto batteries.
      </p>
      <p>Today's power system has four parts:</p>
      <ul>
        <!-- TODO: 13.6 kWh here vs "14 kWh" in the draft's Instagram caption — confirm which. -->
        <li>
          A 13.6 kWh lithium iron phosphate battery bank (multiple 23S LiFePO4 batteries in parallel) in a
          box at the back of the car, carrying the sound system and our roughly 4,000 LEDs.
        </li>
        <li>
          About 600W of solar on the frame above the DJ booth, charging the batteries through the day. We
          upgraded the array during our Reno build weeks this year.
        </li>
        <li>
          The engine's alternator, which runs an inverter and charges the batteries while Rexan is
          driving. In 2023 we automated the charger so it switches on when the engine starts. Before that
          it was a manual switch under the dash, and we flattened the 12V starter battery one time too
          many.
        </li>
        <li>
          A Honda 2000 generator in the back to top the batteries up in the evening when the day's charge
          isn't enough for a long night.
        </li>
      </ul>
      <p>
        Sun and battery first, alternator while we roll, generator as the backup. It took us years of
        iteration to land on that balance.
      </p>
    </ArticleText>

    <!-- Aspect ratios are the encoded clips' own: 720×1100 and 1280×720. -->
    <div class="{photoColumn} my-12 flex flex-col md:flex-row gap-10 md:gap-6">
      <!-- Full width on a phone, this tall clip would fill the screen. -->
      <VideoLoop
        src={panelTestLoop}
        poster={panelTestLoopPoster}
        label="A laser-cut zebra panel lying on the floor, its LEDs shifting through pink, red and white"
        caption="Testing a zebra panel's LEDs before it goes on the car."
        ratio={720 / 1100}
        class="max-md:w-3/4 max-md:mx-auto"
      />
      <VideoLoop
        src={panelsLoop}
        poster={panelsLoopPoster}
        label="Rexan's zebra-striped LED panels glowing purple, green and pink over the rear wheel"
        caption="The panels on Rexan, part of the roughly 4,000 LEDs the batteries carry."
        ratio={1280 / 720}
      />
    </div>

    <ArticleText>

      {@render sectionHeading("bumps-in-the-road")}
      <p>
        The playa is as brutal as it is beautiful. Fine alkaline dust gets into everything, the vehicle
        bounces across miles of rutted lakebed, and we ask our gear to keep the party going for hours on
        end—often up to 10 hours straight, night after night. Naturally, a few things have tested us along
        the way! Here are the big learning moments.
      </p>
      <p>
        <strong>The 3kW inverter ran a bit too warm.</strong> Our original battery inverter tended to
        overheat under pressure, so in 2023 we happily upgraded to a 6kW unit. That gave us almost three
        times the headroom for sound and lights, plus nice, cool operation.
      </p>
      <p>
        <strong>An adventurous inverter output 136V instead of 120V.</strong> We ran into a fun puzzle in
        2026 when our rear inverter drifted up to 136V. The K12.2s powered on safely but wouldn't play
        audio, sending us on a bit of a mystery hunt! To keep the music flowing, we plugged them directly
        into the generator while we worked out the fix: ensuring a rock-solid 120V supply from the rear
        inverter for future runs.
      </p>
      <p>
        <strong>The K12.2 pole mounts needed a redesign.</strong> Early in the week in 2026, the bumps of
        the lakebed proved to be a bit much for our custom pole mounts, and the cabinet cups cracked under
        the strain. Our upcoming fix is to take the cups out of the load path entirely: we'll shorten the
        poles so the speakers rest safely on the horizontal bar with shock-absorbing neoprene, secured
        with custom tie-downs and yoke mounts.
      </p>
      <p>
        Even with the cracked mounts, the music didn't stop for a second! We simply brought the K12.2s
        down and stacked them in pairs on the sides of the car. It was a bit improvisational, but it
        sounded fantastic and kept everyone dancing.
      </p>
    </ArticleText>

    <div class="{photoColumn} my-12">
      <PhotoRow photos={[
        { image: beforeMounts2026, alt: "Rexan in 2026 with four K12.2s on the top bar", caption: "2026, before the mounts went: four K12.2s up top and the K10.2s on the booth." },
        { image: afterMounts2026, alt: "Rexan in 2026 with the K12.2s stacked in pairs on each side", caption: "After the mounts broke: the K12.2s stacked in pairs on both sides of the car." },
      ]} />
    </div>

    <ArticleText>
      <p>
        <strong>Giving the monitors some extra TLC.</strong> Our DJ booth K10.2s have definitely eaten
        their share of dust over the years. When the fine playa dust clogs the cooling fans, the amplifiers
        can thermal-throttle. We've learned a handy field trick—using compressed air on the fans during
        startup to get them spinning freely—and for future burns, we're planning to build a sealed DJ box
        and step up to K12.2 monitors.
      </p>
      <p>
        <strong>Weatherproofing the DJ booth.</strong> Our trusted DJM-900NXS had a few power-cycling
        quirks this year from the elements. To keep our setups seamless, we're adding a backup mixer,
        treating all connections with DeoxIT, and giving our cable runs extra weatherproofing.
      </p>
      <p>
        None of these little hiccups missed a single sunrise, which is a true testament to our incredible
        crew! Whether troubleshooting electrical quirks in 2026 or dancing through the rain in 2023, the
        team always finds a way to keep the energy high and the music playing.
      </p>

      {@render sectionHeading("whats-next")}
      <!-- TODO: The subfolder's side-towers diagram (below) is the plan, and it disagrees with this paragraph:
           - Subs: text says move ONE sub to a new driver-side bracket "so there's one on each side".
             Diagram stacks BOTH KS118s on the new driver bracket and puts an LS218 on the passenger bracket.
           - Text says 2× LS218; the diagram shows 1×.
           - Draft said "QSC L series"; changed to "L Class", QSC's name for the line. -->
      <p>
        Sundowners' decade at the Burn is in 2027 and we want Rexan to sound the best it ever has. The plan
        is to move one of the subs to a new bracket on the driver's side so there's one on each side of
        the car, which spreads the bass and gives us a second platform for stacking. We're also designing
        a line array (QSC L Class: we want 4× LA112 and 2× LS218s if we can raise the money to support
        it), and we've started talking with the QSC team about how to position and mount it.
      </p>
    </ArticleText>

    <div class="{diagramColumn} my-12">
      <p class="eyebrow mb-6">
        <span class="inline-block rounded-full bg-orange-950/10 px-3 py-1 text-orange-950">2027 concept</span>
        <span class="ml-2">Work in progress, not final</span>
      </p>
      <SideTowersDiagram />
    </div>

    <ArticleText>
      {@render sectionHeading("thanks")}
      <p>
        Rexan is built by a big multi-continental crew: welders, fabricators, firmware and electrical
        people, DJs, drivers and trackers. Without the community of makers and doers this project would be
        nowhere. It's the community that makes this happen, and it's a community that's been expanding
        over the past decade, forged and strengthened in the dust, wind and rain.
      </p>
      <p>
        Thanks also to QSC. Nine years in, and four with your gear, and your boxes are still the ones we
        trust on the back of a moving safari truck in a dust storm.
      </p>
      <p>See you on the trash fence at sunrise.</p>
      <p class="italic">
        — Joshuah Vincent &amp; Greg Liburd
      </p>
      <p>
        <a href="/" class="font-mono text-sm text-orange-950 underline hover:text-orange-500">Back to home</a>
      </p>
    </ArticleText>
  </div>
</article>
