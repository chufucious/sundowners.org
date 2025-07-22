<script>
  import logoMosaic from "$lib/assets/logo/Mosaic.png?w=400;900;1200&as=srcset";
  import sundownerswalking from "$lib/assets/Photos/sundownerswalking.jpg?w=1080";
  import fabricSunrise from "$lib/assets/wax-fabric/sunrise.jpeg?w=400";
</script>

<svelte:head>
  <title>Jagged Balls of Rolling Chaos | Sundowners – Black Rock City</title>
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
    </div>
  </section>

  <section id="essential-info" class="col-span-12 relative mt-16">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-8">
        <h2 class="text-xl md:text-2xl text-orange-950 mb-6 font-garamond">
          Essential Camp Setup & Security
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <p>
            <strong>PSA:</strong> 12" stakes & rebar (candy cane the ends to prevent
            injury) are what it takes to secure a tent against playa winds.
          </p>
          <p>
            And no cheap easy ups ever - in a windstorm or dust devil they can
            crumple up and turn into jagged balls of rolling chaos.
          </p>
          <p>
            Also, if you're bringing a generator; make sure to bring secondary
            containment for your gas. Bonus points: bring a lock with cable, as
            they're known to wander off (especially during exodus).
          </p>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Bikes
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <ol class="list-decimal list-inside space-y-2">
            <li>
              During event, loop rope combo lock through frame & tire Or to
              friends bike, Most "borrowers" are just looking to ride, so just
              need to make it inconvenient.
            </li>
            <li>
              Decorations make your bike easier to find and less likely to be
              swiped by accident
            </li>
            <li>Pole with a light = easier to find bike & be seen.</li>
          </ol>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Generator Security
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <p>
            RE generator security - we're mostly making it inconvenient to
            snatch & run. So we can either lock our pack of generators to each
            other with a long cable, or go pro - loop the end of some rebar,
            hammer that into the ground, and secure the whole blob to that as
            extra security. (Baffle boxes are a good sound dampening & potential
            security option, but that's probably a project for another day,
            unless someone is feeling feisty.)
          </p>
          <p>
            <strong>Note:</strong> ideally use the same code (resettable combo locks,
            if multiple) so anyone can move the generators if necessary
          </p>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Strike
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <p>
            Yeah, ice/Gatorade & shade for strike and a crash tent (with AC) so
            Monday strikers can enjoy the sunset on playa then sleep until
            Tuesday when the line dies down.
          </p>
          <p>strike snacks in the fluffer box :D</p>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Rain & Weather
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <ul class="list-disc list-inside space-y-2">
            <li>
              Be prepared for BMOrg services like artery etc. to be delayed.
            </li>
            <li>
              If it's raining, do not leave town until you're sure the gate is
              open. They have and will stop traffic for as long as it takes for
              the playa to dry. While our crew personally enjoyed waiting 12
              hours on the road, peeing behind rocks, it is not ideal.
            </li>
            <li>
              If it's dry, you might see a bit more traffic, since other crews
              may have delayed entry.
            </li>
            <li>
              For those who haven't seen rain on playa, don't expect to easily
              walk or bike while traffic is shut down. The mud cakes up and
              sticks to wheels and feet.
            </li>
            <li>
              Oh, and if anyone is going in early, a wet generator is a sad
              generator - no touchie.
            </li>
          </ul>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Pre-Burn Vehicle Prep
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <ul class="list-disc list-inside space-y-2">
            <li>
              Cover floors/surfaces with tarps/Saran Wrap (secure w/ painters
              tape)
            </li>
            <li>Tape/cover any cracks (radio, seams, etc.)</li>
            <li>Turn off AC when you hit dust. Close & Saran Wrap/tape.</li>
            <li>Keep windows closed.</li>
          </ul>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Arrival
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <ul class="list-disc list-inside space-y-2">
            <li>Wait until dust storm dies down to open door.</li>
            <li>Take everything off the cab</li>
            <li>Open cab only if needed; shake off dust before entering</li>
          </ul>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Post Event Cleanup
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <ul class="list-disc list-inside space-y-2">
            <li>Unload the vehicle</li>
            <li>
              Invest in a broom, long wash brush, hand brushes, buckets,
              vinegar, glass cleaner
            </li>
            <li>Head to the carwash</li>
          </ul>
          <div class="ml-4 space-y-2">
            <p><strong>Back:</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Gently remove tarps etc. (fold dusty side inward)</li>
              <li>Sweep walls, floor, ceiling.</li>
              <li>Vacuum</li>
              <li>Wipe down by hand.</li>
            </ul>
            <p><strong>Cab:</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Gently remove tarps etc.</li>
              <li>Vacuum</li>
              <li>Wipe down w/cleaner</li>
              <li>Glass cleaner</li>
            </ul>
            <p>
              <strong>Exterior Car Wash:</strong> make sure to wash sides, front,
              back, TOP, UNDERCARRIAGE, inside nooks
            </p>
            <ul class="list-disc list-inside space-y-1 ml-4">
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
          </div>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Essential Supplies & Hacks
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <p>
            <strong>Star brite snap & zipper lubricant:</strong> helps with dusty
            zippers (boots & tents, etc). it's all fun and drugs until your zipper
            gets stuck closed in a porta potty on chili friday.
          </p>

          <p>
            <strong>Gaffer tape</strong> - a great alternative to duct tape bc it
            handles heat better and leaves little or no residue/damage.
          </p>

          <p>
            <strong>Burner problem:</strong> bike light batteries don't last
            long enough and the bike lights are often 💩 <strong>Hack:</strong> get
            a flashlight strap. This allows you to use a superior flashlight that's
            multi use. I've battle tested this one. Long lasting, bright light, and
            best of all : hybrid rechargeable that ALSO takes ready available AA
            batteries. Pack accordingly, and you can ride bright all night.
          </p>
          <ul class="list-disc list-inside space-y-1 ml-4">
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

          <p>
            <strong>Also - dry bike lube only.</strong> Not the wet stuff. It's the
            chunky peanut butter of bad decisions. Works on stuck zippers in a pinch.
            Nice for tents, a goddamn life saver if it's your pants.
          </p>

          <p>
            <strong>Also - as a sundowner,</strong> the chances of blinding yourself
            during a psychedelic ceremony are not zero. Bring eye drops. #worthit
            They're also good for washing wind blown bogies out of your eye. The
            single packs are easy to carry. Pair with a tiny mirror and tissue paper
            (since you don't want to touch your eye with dirty hands - if eyedrops
            fail to the trick, gunk will usually stick to the corner of a tissue
            applied very gently - wait, watch - lift out).
          </p>

          <p>
            <strong>Had a tough time in exodus traffic?</strong> Realized you have
            to pee and can't find the portos? This isn't the worst thing to have
            in your backpack, friends. Since we're responsible for everything that
            hits the playa - these are a solid companion for drinkers (and art cars
            - I'll chuck a few in my bag for Rexan).
          </p>
        </div>

        <h2
          class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond"
        >
          Emergency Contact
        </h2>
        <div
          class="space-y-4 text-sm text-orange-950 text-opacity-80 leading-relaxed"
        >
          <p>
            <strong>FYI:</strong> The public ESD email address 911@burningman.com
            is a way for the general public to pass emergency messages to staff and
            participants. (Delivery can't be guaranteed due to the environment, but
            it's worth passing along if someone wants the info).
          </p>
        </div>
      </div>
    </div>
  </section>

  <footer class="col-span-12 mt-32 relative h-32"></footer>
</article>
