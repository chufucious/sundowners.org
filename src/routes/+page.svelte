<script>
  import logo from "$lib/assets/images/logo/sundowners/words.png?w=400;900;1200&as=srcset";
  import logoLion from "$lib/assets/images/logo/sundowners/lion.svg?w=400;900;1200&as=srcset";
  import gutterBottom from "$lib/assets/images/Gutter/Bottom.png";
  import gutterLeft from "$lib/assets/images/Gutter/Left.png";
  import gutterTop from "$lib/assets/images/Gutter/Top.png";
  import gutterRight from "$lib/assets/images/Gutter/Right.png";
  import katiesunset from "$lib/assets/images/Photos/katiesunset.jpg";
  import devofisheye from "$lib/assets/images/Photos/devofisheye.jpg";
  import gregonrexan from "$lib/assets/images/Photos/gregonrexan.jpg";
  import runninglion from "$lib/assets/images/Photos/runninglion.jpg";
  import rexanjump from "$lib/assets/images/Photos/rexanjump.jpg?w=400;900;1200&as=srcset";
  import sundownerswalking from "$lib/assets/images/Photos/sundownerswalking.jpg?w=400;900;1200&as=srcset";
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

<img
  srcset={sundownerswalking}
  alt="walking into sunset"
  class="w-full object-cover"
/>

<div class="text-white container mx-auto mt-8">
  <div class="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="fixed top-10 left-10 flex">
      <img class="h-auto mr-4" alt="sundowners lion logo" srcset={logoLion} />
      <img class="h-auto w-48 object-contain" alt="sundowners" srcset={logo} />
    </div>

    <section class="mt-24 mb-24 mx-auto text-center">
      <h3 class="mb-8">HISTORY</h3>
      <p class="max-w-prose">
        In 2017, a passionate crew of longtime Burning Man vets from South
        Africa and Brooklyn traveled to South Africa and went on a life-changing
        wildlife safari. On the Savannah, we would end each day with
        "Sundowners", a fantastic regional tradition of sharing sunset stories,
        laughter, and drinks with friends old and new.
      </p>
    </section>

    <section class="flex">
      <div class="w-1/2 md:w-1/4 mr-1">
        <img src={katiesunset} alt="k viewing sunset" class="w-full h-auto" />
      </div>
      <div class="w-1/2 md:w-1/4 mr-1">
        <img src={gregonrexan} alt="on rexan" class="w-full h-auto" />
      </div>
      <div class="w-1/2 md:w-1/4 mr-1">
        <img src={runninglion} alt="a running lion" class="w-full h-auto" />
      </div>
      <div class="w-1/2 md:w-1/4">
        <img src={devofisheye} alt="fisheye lens" r class="w-full h-auto" />
      </div>
    </section>

    <section class="mt-24 mb-24 mx-auto text-center">
      <h3 class="mb-8">MISSION</h3>
      <p class="max-w-prose">
        At the highest level, we aim to directly challenge nationalism through
        our exploration of diversity. We believe we can capture a growing
        zeitgeist of globalist curiosity and positivity through our theme camp.
        We strive for a holistic offering, however, the deep artistry, meaning,
        and humanity of African-based music is our creative North Star. Beyond
        Black Rock City, our goal is to continue to spread the Sundowners'
        vision through our flavor of African diaspora events, creative projects,
        and community involvement.
      </p>
    </section>

    <section class="flex">
      <img srcset={rexanjump} alt="rexan crew jumping" class="w-full h-auto" />
    </section>

    <section class="mt-24 mb-24 mx-auto text-center">
      <h3 class="mb-8">MISSION</h3>
      <p class="max-w-prose">
        At the highest level, we aim to directly challenge nationalism through
        our exploration of diversity. We believe we can capture a growing
        zeitgeist of globalist curiosity and positivity through our theme camp.
        We strive for a holistic offering, however, the deep artistry, meaning,
        and humanity of African-based music is our creative North Star. Beyond
        Black Rock City, our goal is to continue to spread the Sundowners'
        vision through our flavor of African diaspora events, creative projects,
        and community involvement.
      </p>
    </section>
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.black);
  }
</style>
