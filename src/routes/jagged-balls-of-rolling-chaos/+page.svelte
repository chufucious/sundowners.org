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

<article class="grid grid-cols-12 gap-4 font-mono prose">
  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-16">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Bikes
    </h2>
    <ul class="list-disc">
      <li>
        during event, loop rope combo lock through frame & tire or to friend's
        bike, most "borrowers" are just looking to ride, so just need to make it
        inconvenient.
      </li>
      <li>
        Decorations make your bike easier to find and less likely to be swiped
        by accident
      </li>
      <li>Pole with a light = easier to find bike & be seen.</li>
    </ul>
  </section>

  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-8">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Generators
    </h2>
    <ul class="list-disc">
      <li>
        RE generator security - we're mostly making it inconvenient to snatch &
        run. So we can either lock our pack of generators to each other with a
        long cable, or go pro - loop the end of some rebar, hammer that into the
        ground, and secure the whole blob to that as extra security. (Baffle
        boxes are a good sound dampening & potential security option, but that's
        probably a project for another day, unless someone is feeling feisty.)
        Note: ideally use the same code (resettable combo locks, if multiple) so
        anyone can move the generators if necessary
      </li>
      <li>make sure to bring secondary containment for your gas.</li>
    </ul>
  </section>

  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-8">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      In Case of Emergency
    </h2>
    <ul class="list-disc">
      <li>
        The public ESD email address 911@burningman.com is a way for the general
        public to pass emergency messages to staff and participants. (Delivery
        can't be guaranteed due to the environment, but it's worth passing along
        if someone wants the info).
      </li>
    </ul>
  </section>

  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-8">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Strike
    </h2>
    <ul class="list-disc">
      <li>
        Yeah, ice/Gatorade & shade for strike and a crash tent (with AC) so
        Monday strikers can enjoy the sunset on playa then sleep until Tuesday
        when the line dies down.
      </li>
      <li>strike snacks in the fluffer box :D</li>
    </ul>
  </section>

  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-8">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Rain
    </h2>
    <ul class="list-disc">
      <li>Be prepared for BMOrg services like artery etc. to be delayed.</li>
      <li>
        If it's raining, do not leave town until you're sure the gate is open.
        They have and will stop traffic for as long as it takes for the playa to
        dry. While our crew personally enjoyed waiting 12 hours on the road,
        peeing behind rocks, it is not ideal.
      </li>
      <li>
        If it's dry, you might see a bit more traffic, since other crews may
        have delayed entry.
      </li>
      <li>
        For those who haven't seen rain on playa, don't expect to easily walk or
        bike while traffic is shut down. The mud cakes up and sticks to wheels
        and feet.
      </li>
      <li>
        Oh, and if anyone is going in early, a wet generator is a sad generator
        - no touchie.
      </li>
    </ul>
  </section>

  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-8">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Vehicle Care
    </h2>
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Preburn
    </h2>
    <ul class="list-disc">
      <li>
        Cover floors/surfaces with tarps/Saran Wrap (secure w/ painters tape)
      </li>
      <li>Tape/cover any cracks (radio, seams, etc.)</li>
      <li>Turn off AC when you hit dust. Close & Saran Wrap/tape.</li>
      <li>Keep windows closed.</li>
    </ul>

    <h2 class="font-serif">ARRIVAL</h2>
    <ul class="list-disc">
      <li>Wait until dust storm dies down to open door.</li>
      <li>Take everything out of the cab</li>
      <li>Open cab only if needed; shake off dust before entering</li>
    </ul>

    <h2 class="font-serif">POST BURN</h2>
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

  <section class="col-span-12 md:col-span-8 md:col-start-3 mt-8">
    <h2 class="text-xl md:text-2xl text-orange-950 mb-6 mt-12 font-garamond">
      Gear & Accessories
    </h2>
    <ul class="list-disc">
      <li>
        Star brite snap & zipper lubricant: helps with dusty zippers (boots &
        tents, etc). it's all fun and drugs until your zipper gets stuck closed
        in a porta potty on chili friday.
      </li>
      <li>
        dry bike lube only. Not the wet stuff. It's the chunky peanut butter of
        bad decisions. Works on stuck zippers in a pinch. Nice for tents, a
        goddamn life saver if it's your pants.
      </li>
      <li>
        gaffer tape - a great alternative to duct tape bc it handles heat better
        and leaves little or no residue/damage.
      </li>
      <li>
        Also - as a sundowner, the chances of blinding yourself during a
        psychedelic ceremony are not zero. Bring eye drops. #worthit They're
        also good for washing wind blown bogies out of your eye. The single
        packs are easy to carry. Pair with a tiny mirror and tissue paper (since
        you don't want to touch your eye with dirty hands - if eyedrops fail to
        the trick, gunk will usually stick to the corner of a tissue applied
        very gently - wait, watch - lift out).
      </li>
      <li>
        Had a tough time in exodus traffic? Realized you have to pee and can't
        find the portos? This isn't the worst thing to have in your backpack,
        friends. Since we're responsible for everything that hits the playa -
        these are a solid companion for drinkers (and art cars - I'll chuck a
        few in my bag for Rexan).
      </li>
      <li>
        Burner problem: bike light batteries don't last long enough and the bike
        lights are often 💩 Hack: get a flashlight strap. This allows you to use
        a superior flashlight that's multi use. I've battle tested this one.
        Long lasting, bright light, and best of all : hybrid rechargeable that
        ALSO takes ready available AA batteries. Pack accordingly, and you can
        ride bright all night.
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
      <li>
        And no cheap easy ups ever - in a windstorm or dust devil they can
        crumple up and turn into **jagged balls of rolling chaos**
      </li>
    </ul>
  </section>

  <footer class="col-span-12 mt-32 relative h-32"></footer>
</article>
