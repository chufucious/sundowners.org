<script>
  import crewOnRexan from "$lib/assets/rexan-sound/crew-on-rexan.jpg?w=640;1264&enhanced";
  import behringer2017 from "$lib/assets/rexan-sound/2017-behringer.jpg?w=400;800;1200&enhanced";
  import behringer2019 from "$lib/assets/rexan-sound/2019-behringer.jpg?w=400;800;1179&enhanced";
  import qsc2022 from "$lib/assets/rexan-sound/2022-first-qsc.jpg?w=400;768&enhanced";
  import qsc2023 from "$lib/assets/rexan-sound/2023-qsc.jpg?w=400;848&enhanced";
  import sunrise2025 from "$lib/assets/rexan-sound/2025-sunrise.jpg?w=400;800;1179&enhanced";
  import beforeMounts2026 from "$lib/assets/rexan-sound/2026-before-mounts.jpg?w=400;800;1179&enhanced";
  import afterMounts2026 from "$lib/assets/rexan-sound/2026-after-mounts.jpg?w=400;800;1179&enhanced";
  import patternLeopard from "$lib/assets/wax-fabric/leopard-pattern.avif?w=800&format=webp";
  import EvolutionCarousel from "$lib/components/rexan/EvolutionCarousel.svelte";
  import CurrentRigDiagram from "$lib/components/rexan/CurrentRigDiagram.svelte";
  import SideTowersDiagram from "$lib/components/rexan/SideTowersDiagram.svelte";
  import TableOfContents from "$lib/components/TableOfContents.svelte";

  // Title / OG tags come from this route's load() and are rendered
  // once by +layout.svelte — see the meta defaults there.

  // Reading column; its width is --reading-width on the article, which
  // EvolutionCarousel also reads to line its first card up with the text.
  // Important (!) so it beats proseStyles' max-w-none on the same element.
  const textColumn = "mx-auto max-w-(--reading-width)! px-6";
  const proseStyles =
    "prose prose-xl max-w-none prose-p:text-orange-950/90 prose-li:text-orange-950/90 prose-p:leading-[1.6] prose-li:leading-[1.6] prose-headings:text-orange-950 prose-headings:font-light prose-strong:text-orange-950 [--tw-prose-bullets:var(--color-amber-600)]";
  // Photos run wider than the text; the widest reach near the page edges.
  const photoColumn = "mx-auto max-w-4xl px-6";
  const widePhotoColumn = "mx-auto max-w-7xl px-4 md:px-6";

  // Section headings, in order; the table of contents links to these ids.
  const sections = [
    { id: "where-we-started", title: "Where we started" },
    { id: "the-rig-today", title: "The rig today" },
    { id: "whats-your-sound-system", title: '"What\'s your sound system?"' },
    { id: "keeping-it-green", title: "Keeping it green" },
    { id: "what-broke", title: "What broke (and what we learned)" },
    { id: "whats-next", title: "What's next for year ten" },
    { id: "thanks", title: "Thanks" },
  ];
  const sectionTitle = Object.fromEntries(sections.map(({ id, title }) => [id, title]));
</script>

<!-- A row of captioned photos at one shared height: each photo's flex-grow is
     its aspect ratio (from the enhanced image's own dimensions), so they line up
     top and bottom. Stacks on phones, with room to tie each caption to its photo. -->
{#snippet photoRow(photos)}
  <div class="flex flex-col md:flex-row gap-10 md:gap-6">
    {#each photos as { image, alt, caption } (image)}
      <figure class="md:min-w-0" style:flex="{image.img.w / image.img.h} 1 0">
        <enhanced:img
          src={image}
          sizes="(max-width: 768px) 100vw, 28rem"
          {alt}
          loading="lazy"
          class="w-full h-auto"
        />
        <figcaption class="mt-3 font-mono text-xs leading-relaxed text-orange-950/70">{caption}</figcaption>
      </figure>
    {/each}
  </div>
{/snippet}

<!-- scroll-mt clears the compact logo when jumping to a section. -->
{#snippet sectionHeading(id)}
  <h2 {id} class="scroll-mt-24">{sectionTitle[id]}</h2>
{/snippet}

<article class="col-span-12 font-serif text-orange-950 pt-8 [--reading-width:36rem]">
  <header class="mx-auto max-w-6xl px-6 grid grid-cols-12 gap-4 md:gap-12 mb-16">
    <div class="col-span-full md:col-span-6 prose prose-headings:text-orange-950">
      <h1 class="font-light font-sans uppercase text-4xl md:text-7xl tracking-tight mb-8">
        The Rexan Sound System
      </h1>
      <h2 class="font-extralight font-garamond mt-0 text-xl md:text-3xl">
        How we built a solar-powered QSC rig on a psychedelic safari car.
      </h2>
      <p class="not-prose font-mono text-sm text-orange-950/80">
        By <strong class="font-semibold text-orange-950">Joshuah Vincent</strong> &amp;
        <strong class="font-semibold text-orange-950">Greg Liburd</strong>
      </p>
    </div>

    <div class="col-span-full md:col-span-6">
      <figure>
        <div class="pattern-frame p-2 -rotate-1 drop-shadow-xl" style:background-image="url({patternLeopard})">
          <enhanced:img
            src={crewOnRexan}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="The Sundowners crew piled onto Rexan, waving under two QSC speakers on the top deck"
            class="w-full"
            fetchpriority="high"
          />
        </div>
      </figure>
    </div>
  </header>

  <!-- From md up, a left rail holds the table of contents, pinned while the
       post scrolls; everything else centres in the space to its right.
       Phones skip it: there's no room, and the post reads top to bottom. -->
  <div class="relative md:pl-60">
    <aside class="hidden md:block absolute inset-y-0 left-6 w-48">
      <div class="sticky top-28">
        <TableOfContents {sections} />
      </div>
    </aside>

    <div class="{textColumn} {proseStyles}">
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
    </div>

    <section aria-label="The evolution of Rexan" class="mt-12">
      <p class="{textColumn} eyebrow mb-4">The evolution of Rexan</p>
      <EvolutionCarousel />
    </section>

    <div class="{textColumn} {proseStyles} mt-12">
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
    </div>

    <div class="{photoColumn} my-12">
      {@render photoRow([
        { image: behringer2017, alt: "Rexan in 2017 with Behringer speakers at the back", caption: "2017: two Behringers at the back for the riders, and no DJ setup yet." },
        { image: behringer2019, alt: "Rexan in 2019 with Behringer speakers facing forward", caption: "2019: more Behringers facing forward, a sub, and our first DJ setup." },
      ])}
    </div>

    <div class="{textColumn} {proseStyles}">
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
    </div>

    <div class="{widePhotoColumn} my-12">
      {@render photoRow([
        { image: qsc2022, alt: "Rexan in 2022 with its first QSC speakers", caption: "2022: our first year on QSC." },
        { image: qsc2023, alt: "Rexan in 2023 with four K12.2s on the top bar", caption: "2023: four K12.2s up top and K10.2s on the booth. The two subs are out of frame." },
        { image: sunrise2025, alt: "Rexan at sunrise in 2025 with speakers on the top bar and subs on the passenger side", caption: "Sunrise, 2025. K12.2s and K10.2s up top, the booth monitors in the middle, and the subs stacked on the passenger side." },
      ])}
    </div>

    <div class="{textColumn} {proseStyles}">
      {@render sectionHeading("the-rig-today")}
      <p>This is how Rexan is set up now:</p>
      <ul>
        <li><strong>Subs:</strong> 2× QSC KS118, stacked on the passenger (right) side.</li>
        <li><strong>Tops:</strong> 4× QSC K12.2 mounted high on the horizontal top bar, firing out over the deck and the crowd.</li>
        <li><strong>Monitors:</strong> 2× QSC K10.2 in the middle, pointed at the DJ booth.</li>
        <li><strong>Booth:</strong> Pioneer XDJ-1000 decks into a DJM-900NXS mixer.</li>
      </ul>
      <p>It's rated in the "dance club" class (90 dB and up at under 100 feet).</p>
    </div>

    <div class="{textColumn} my-12">
      <CurrentRigDiagram />
    </div>

    <div class="{textColumn} {proseStyles}">
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

      {@render sectionHeading("what-broke")}
      <p>
        Playa is brutal. Fine alkaline dust gets into everything, the car shakes its way across miles of
        rutted lakebed, and we ask the system to play for hours at a time (often up to 10 hours
        continuous), night after night. Plenty has gone wrong. Here are the big ones.
      </p>
      <p>
        <strong>The 3kW inverter overheated.</strong> Our first charging inverter ran too hot, so in 2023
        we moved up to 6kW. More headroom, cooler running.
      </p>
      <p>
        <strong>Our inverter pushed 136V instead of 120V.</strong> This was a big headache in 2026. The
        rear inverter drifted to about 136V, which meant we couldn't run the K12.2s off the main circuit
        (they powered on but wouldn't play, and it was a nightmare homing in on the problem). We ended up
        running them straight off the generator (bypassing the batteries) to keep the party going. That's
        our electrical problem, not a speaker problem, and it's the first thing we're fixing: a stable 120V
        from the rear inverter.
      </p>
      <p>
        <strong>The pole mounts cracked.</strong> Early on in 2026 (Monday afternoon) every pole mount on
        the top K12.2s had broken. A cabinet sitting on top of a pole, on a vehicle bouncing across the
        playa, puts a lot of repeated load into a small cup. Our fix is to take the cup out of the load
        path. We'll shorten the pole so the base of each cabinet rests on the horizontal bar with neoprene
        in between to absorb shock, then fabricate tie-down points off the yoke mounts and strap
        everything to the bar.
      </p>
      <p>
        When the mounts went this year we didn't stop the party. We pulled the K12.2s down and stacked
        them in pairs, one pair on top of the subs on the passenger side and another pair on the driver's
        side. It wasn't pretty, but it sounded great.
      </p>
    </div>

    <div class="{photoColumn} my-12">
      {@render photoRow([
        { image: beforeMounts2026, alt: "Rexan in 2026 with four K12.2s on the top bar", caption: "2026, before the mounts went: four K12.2s up top and the K10.2s on the booth." },
        { image: afterMounts2026, alt: "Rexan in 2026 with the K12.2s stacked in pairs on each side", caption: "After the mounts broke: the K12.2s stacked in pairs on both sides of the car." },
      ])}
    </div>

    <div class="{textColumn} {proseStyles}">
      <p>
        <strong>The monitors cook.</strong> Our K10.2s have failed pretty much every year. The cooling fan
        pulls playa dust in until it clogs and the amp overheats. In 2026 one died partway through the
        week, and the 136V supply probably didn't help either. We're looking at swapping those monitors
        for K12.2s and building a proper sealed DJ box. Special hack: spray compressed air at the fans
        while you power up the system, and they usually start up again (get those fans spinning).
      </p>
      <p>
        <strong>The DJ booth takes a beating too.</strong> Our DJM-900NXS had some power-cycling issues
        this year. We're adding a spare mixer, spraying every terminal with DeoxIT, and weatherproofing
        the XLR, power and cabling.
      </p>
      <p>
        None of these failures stopped a single sunrise, and the crew deserves the credit for that. The
        car had problems in 2026 and we still kept the party rolling all week. Similarly, in 2023 during
        the big rains, we turned it all off and started it up again post rain and had a real party!
      </p>

      {@render sectionHeading("whats-next")}
      <!-- TODO: The subfolder's side-towers diagram (below) is the plan, and it disagrees with this paragraph:
           - Subs: text says move ONE sub to a new driver-side bracket "so there's one on each side".
             Diagram stacks BOTH KS118s on the new driver bracket and puts an LS218 on the passenger bracket.
           - Line array: text says "LS112"; QSC's box (and the diagrams) is the LA112.
           - Text says 2× LS218; the diagram shows 1×.
           - Draft said "QSC L series"; changed to "L Class", QSC's name for the line. -->
      <p>
        Sundowners' decade at the Burn is in 2027 and we want Rexan to sound the best it ever has. The plan
        is to move one of the subs to a new bracket on the driver's side so there's one on each side of
        the car, which spreads the bass and gives us a second platform for stacking. We're also designing
        a line array (QSC L Class: we want 4× LS112 and 2× LS218s if we can raise the money to support
        it), and we've started talking with the QSC team about how to position and mount it.
      </p>
    </div>

    <div class="{textColumn} my-12">
      <p class="eyebrow mb-6">
        <span class="inline-block rounded-full bg-orange-950/10 px-3 py-1 text-orange-950">2027 concept</span>
        <span class="ml-2">Work in progress, not final</span>
      </p>
      <SideTowersDiagram />
    </div>

    <div class="{textColumn} {proseStyles}">
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
        — Joshuah Vincent &amp; Greg Liburd, Rexan by Joshuah Vincent &amp; the Sundowners
      </p>
      <p>
        <a href="/" class="font-mono text-sm text-orange-950 underline hover:text-orange-500">Back to home</a>
      </p>
    </div>
  </div>
</article>
