<script>
  import logo from "$lib/assets/images/logo/sundowners/words.png";
  import logoLion from "$lib/assets/images/logo/sundowners/lion.svg";
  import gutterBottom from "$lib/assets/images/Gutter/Bottom.png";
  import gutterLeft from "$lib/assets/images/Gutter/Left.png";
  import gutterTop from "$lib/assets/images/Gutter/Top.png";
  import gutterRight from "$lib/assets/images/Gutter/Right.png";
</script>

<div class="fixed top-0 h-3"><img src={gutterTop} /></div>
<div class="fixed bottom-0 h-3"><img src={gutterBottom} /></div>
<div class="fixed top-0 right-0 w-3"><img src={gutterRight} /></div>
<div class="fixed top-0 left-0 w-3"><img src={gutterLeft} /></div>
<div class="text-white container mx-auto mt-8">
  <div class="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="flex">
      <img class="h-auto mr-4" alt="sundowners lion logo" src={logoLion} />
      <img class="h-auto w-64 object-contain" alt="sundowners" src={logo} />
    </div>

    <p class="mt-24 mb-24 max-w-prose mx-auto text-center">
      In 2017, a passionate crew of longtime Burning Man vets from South Africa
      and Brooklyn traveled to South Africa and went on a life-changing wildlife
      safari. On the Savannah, we would end each day with "Sundowners", a
      fantastic regional tradition of sharing sunset stories, laughter, and
      drinks with friends old and new.
    </p>
  </div>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.black);
  }
</style>
