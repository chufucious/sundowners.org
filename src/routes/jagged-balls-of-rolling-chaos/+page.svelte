<script>
  import jaggedBalls from "#lib/assets/jagged-balls-of-rolling-chaos.png?w=400;800;1200&enhanced";
  import ArticleText from "#lib/components/ArticleText.svelte";
  import TableOfContents from "#lib/components/TableOfContents.svelte";
  import { articleLayout } from "#lib/article-styles.js";

  // Title / OG tags come from this route's load() and are rendered
  // once by +layout.svelte — see the meta defaults there.

  // Section headings, in order; the table of contents links to these ids.
  const sections = [
    { id: "bikes", title: "Bikes" },
    { id: "generators", title: "Generators" },
    { id: "emergency", title: "In Case of Emergency" },
    { id: "strike", title: "Strike" },
    { id: "rain", title: "Rain" },
    { id: "vehicle-care", title: "Vehicle Care" },
    { id: "gear-and-accessories", title: "Gear & Accessories" },
  ];
  const sectionTitle = Object.fromEntries(sections.map(({ id, title }) => [id, title]));
</script>

<!-- scroll-mt clears the compact logo when jumping to a section. -->
{#snippet sectionHeading(id)}
  <h2 {id} class="scroll-mt-24">{sectionTitle[id]}</h2>
{/snippet}

<article class="col-span-12 pt-8 grid grid-cols-1 lg:grid-cols-[minmax(12rem,1fr)_minmax(0,80rem)_minmax(12rem,1fr)] {articleLayout}">
  <header class="col-span-full mx-auto w-5/6 grid grid-cols-12 gap-4">
    <div
      class="col-span-full md:col-span-6 prose max-w-none prose-headings:text-orange-950 mb-8"
    >
      <!-- Rexan's title type in half the width: each size keeps "ROLLING" whole. -->
      <h1
        class="font-light font-sans uppercase text-5xl sm:text-7xl lg:text-8xl 2xl:text-9xl tracking-tight leading-[0.9] text-balance mb-8"
      >
        Jagged Balls of Rolling Chaos
      </h1>
      <p class="font-normal font-serif text-orange-900 mt-0 mb-[1em] text-xl md:text-3xl lg:text-4xl leading-snug text-balance">
        No cheap easy ups ever - in a windstorm or dust devil they can crumple
        up and turn into <span class="italic"
          >jagged balls of rolling chaos.</span
        >
      </p>
      <p class="font-light font-sans text-orange-950 text-sm mt-[1.5em] mb-[0.5em]">
        Saintly words from <strong>Poca</strong> of the Sundowners.<br />
        Updated <time datetime="2026-10">October 2026</time>
      </p>
    </div>

    <div class="col-span-full md:col-span-6">
      <figure>
        <enhanced:img
          src={jaggedBalls}
          sizes="(max-width: 767px) 83vw, 42vw"
          alt="A shredded canopy tumbling through a dust storm as people run from it"
          class="w-full"
        />
        <figcaption class="text-sm mt-2 italic">Run, Sparkle, Run!</figcaption>
      </figure>
    </div>
  </header>

  <!-- Equal outer tracks keep the article centered; the left track holds the rail. -->
  <aside class="hidden lg:block col-start-1 row-start-2 px-4">
    <div class="sticky top-28 w-40 ml-auto">
      <TableOfContents {sections} />
    </div>
  </aside>

  <div class="min-w-0 lg:col-start-2 lg:row-start-2">
    <ArticleText>
      <p class="font-mono text-sm mt-12">
        Hard-won tips from the Sundowners crew, not official advice. Read Burning
        Man's <a href="https://survival.burningman.org/">Survival Guide</a> before
        you go.
      </p>
      <section>
        {@render sectionHeading("bikes")}
        <ul class="list-disc">
          <li>
            During event, loop rope combo lock through frame & tire or to friend's
            bike, most "borrowers" are just looking to ride, so just need to make
            it inconvenient.
          </li>
          <li>
            Decorations make your bike easier to find and less likely to be swiped
            by accident
          </li>
          <li>Pole with a light = easier to find bike & be seen.</li>
        </ul>
      </section>

      <section>
        {@render sectionHeading("generators")}
        <ul class="list-disc">
          <li>
            RE generator security - we're mostly making it inconvenient to snatch
            & run. So we can either lock our pack of generators to each other with
            a long cable, or go pro - loop the end of some rebar, hammer that into
            the ground, and secure the whole blob to that as extra security.
            (Baffle boxes are a good sound dampening & potential security option,
            but that's probably a project for another day, unless someone is
            feeling feisty.) Note: ideally use the same code (resettable combo
            locks, if multiple) so anyone can move the generators if necessary
          </li>
          <li>make sure to bring secondary containment for your gas.</li>
        </ul>
      </section>

      <section>
        {@render sectionHeading("emergency")}
        <ul class="list-disc">
          <li>
            The public ESD email address brc-urgent@burningman.org is a way for the
            general public to pass emergency messages to staff and participants.
            (Delivery can't be guaranteed due to the environment, but it's worth
            passing along if someone wants the info).
          </li>
        </ul>
      </section>

      <section>
        {@render sectionHeading("strike")}
        <ul class="list-disc">
          <li>
            Yeah, ice/Gatorade & shade for strike and a crash tent (with AC) so
            Monday strikers can enjoy the sunset on playa then sleep until Tuesday
            when the line dies down.
          </li>
          <li>strike snacks in the fluffer box :D</li>
        </ul>
      </section>

      <section>
        {@render sectionHeading("rain")}
        <ul class="list-disc">
          <li>Be prepared for BMOrg services like artery etc. to be delayed.</li>
          <li>
            If it's raining, do not leave town until you're sure the gate is open.
            They have and will stop traffic for as long as it takes for the playa
            to dry. While our crew personally enjoyed waiting 12 hours on the
            road, peeing behind rocks, it is not ideal.
          </li>
          <li>
            If it's dry, you might see a bit more traffic, since other crews may
            have delayed entry.
          </li>
          <li>
            For those who haven't seen rain on playa, don't expect to easily walk
            or bike while traffic is shut down. The mud cakes up and sticks to
            wheels and feet.
          </li>
          <li>
            Oh, and if anyone is going in early, a wet generator is a sad
            generator - no touchie.
          </li>
        </ul>
      </section>

      <section>
        {@render sectionHeading("vehicle-care")}
        <h3 class="uppercase text-sm"><strong>Pre-burn</strong></h3>
        <ul class="list-disc">
          <li>
            Cover floors/surfaces with tarps/Saran Wrap (secure w/ painters tape)
          </li>
          <li>Tape/cover any cracks (radio, seams, etc.)</li>
          <li>Turn off AC when you hit dust. Close & Saran Wrap/tape.</li>
          <li>Keep windows closed.</li>
        </ul>

        <h3 class="uppercase text-sm"><strong>Arrival</strong></h3>
        <ul class="list-disc">
          <li>Wait until dust storm dies down to open door.</li>
          <li>Take everything out of the cab</li>
          <li>Open cab only if needed; shake off dust before entering</li>
        </ul>

        <h3 class="uppercase text-sm"><strong>Post Burn</strong></h3>
        <ul class="list-disc">
          <li>Unload the vehicle</li>
          <li>
            Invest in a broom, long wash brush, hand brushes, buckets, vinegar,
            glass cleaner
          </li>
          <li>
            Head to the carwash
            <ul class="list-disc">
              <li>
                Back:
                <ul class="list-disc">
                  <li>Gently remove tarps etc. (fold dusty side inward)</li>
                  <li>Sweep walls, floor, ceiling.</li>
                  <li>Vacuum</li>
                  <li>Wipe down by hand.</li>
                </ul>
              </li>
              <li>
                Cab:
                <ul class="list-disc">
                  <li>Gently remove tarps etc.</li>
                  <li>Vacuum</li>
                  <li>Wipe down w/cleaner</li>
                  <li>Glass cleaner</li>
                </ul>
              </li>
              <li>
                Exterior Car Wash: make sure to wash sides, front, back, TOP,
                UNDERCARRIAGE, inside nooks
                <ul class="list-disc">
                  <li>Wheel & tire cleaner</li>
                  <li>Engine area</li>
                  <li>Pre-soak</li>
                  <li>High pressure soap</li>
                  <li>Foam brush cycle</li>
                  <li>Now hand wash with brushes dipped in vinegar/water</li>
                  <li>Now use the long brush to scrub the roof</li>
                  <li>High pressure rinse</li>
                  <li>
                    Stop and see if there's dust dripping out of cracks/side
                    mirror/license plate etc.. Might need to soap/rinse again.
                  </li>
                  <li>High pressure wax</li>
                  <li>Spot free</li>
                  <li>Hand dry so you can catch any little spots you missed.</li>
                  <li>Glass cleaner</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        {@render sectionHeading("gear-and-accessories")}
        <ul class="list-disc">
          <li>
            Star brite snap & zipper lubricant: helps with dusty zippers (boots &
            tents, etc). it's all fun and drugs until your zipper gets stuck
            closed in a porta potty on chili friday.
          </li>
          <li>
            dry bike lube only. Not the wet stuff. It's the chunky peanut butter
            of bad decisions. Works on stuck zippers in a pinch. Nice for tents, a
            goddamn life saver if it's your pants.
          </li>
          <li>
            gaffer tape - a great alternative to duct tape bc it handles heat
            better and leaves little or no residue/damage.
          </li>
          <li>
            Also - as a sundowner, the chances of blinding yourself during a
            psychedelic ceremony are not zero. Bring eye drops. #worthit They're
            also good for washing wind blown bogies out of your eye. The single
            packs are easy to carry. Pair with a tiny mirror and tissue paper
            (since you don't want to touch your eye with dirty hands - if eyedrops
            fail to the trick, gunk will usually stick to the corner of a tissue
            applied very gently - wait, watch - lift out).
          </li>
          <li>
            Had a tough time in exodus traffic? Realized you have to pee and can't
            find the portos? This isn't the worst thing to have in your backpack,
            friends. Since we're responsible for everything that hits the playa -
            these are a solid companion for drinkers (and art cars - I'll chuck a
            few in my bag for <a href="/rexan-sound-system">Rexan</a>).
          </li>
          <li>
            Burner problem: bike light batteries don't last long enough and the
            bike lights are often 💩 Hack: get a flashlight strap. This allows you
            to use a superior flashlight that's multi use. I've battle tested this
            one. Long lasting, bright light, and best of all : hybrid rechargeable
            that ALSO takes ready available AA batteries. Pack accordingly, and
            you can ride bright all night.
            <ul class="list-disc">
              <li>
                PS: Art car spotters - this triples as a spotlight you can use to
                light up dark wads for the driver. Also handy for hippy macing
                anyone in the eyes that isn't paying attention.
              </li>
              <li>
                PSS: TAKE the light with you when you park. Quality flashlights DO
                get stolen.
              </li>
            </ul>
          </li>
          <li>
            12" stakes & rebar (candy cane the ends to prevent injury) are what it
            takes to secure a tent against playa winds
          </li>
        </ul>
      </section>
      <p class="">
        <a href="/" class="text-orange-950 underline hover:text-orange-700"
          >Back to home</a
        >
      </p>
    </ArticleText>
  </div>
</article>
