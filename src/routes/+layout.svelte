<script>
  import "../app.css";
  import { page } from "$app/state";
  import SiteHeader from "#lib/components/SiteHeader.svelte";
  import Agentation from "#lib/components/Agentation.svelte";
  import logoLion from "#lib/assets/logo/lion.svg";
  import { BANNER_TINT, bannerEdges, edgeGradient } from "#lib/header-colors.js";

  let { children } = $props();

  const headerTint = $derived(page.data.headerImage?.tint ?? BANNER_TINT);
  const headerEdge = $derived(page.data.headerImage?.edge ?? {
    mobile: bannerEdges.mobile,
    desktop: page.data.smallHeader ? bannerEdges.smallDesktop : bannerEdges.desktop,
  });
  const headerStyle = $derived(`
    html { --header-tint: ${headerTint}; --header-edge: ${edgeGradient(headerEdge.mobile)}; }
    @media (min-width: 48rem) { html { --header-edge: ${edgeGradient(headerEdge.desktop)}; } }
  `);

  const SITE_URL = "https://sundowners.org";
  const DEFAULT_TITLE = "Sundowners Burning Man Camp | Black Rock City";
  const DEFAULT_DESCRIPTION =
    "Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world.";
  const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
  const DEFAULT_IMAGE_ALT = "Sundowners walking in Black Rock City";

  // Pages override any of these via their load(); the layout owns the single
  // canonical set of tags so a page's values can't end up as ignored duplicates.
  const meta = $derived({
    title: page.data.title ?? DEFAULT_TITLE,
    description: page.data.description ?? DEFAULT_DESCRIPTION,
    image: page.data.ogImage ?? DEFAULT_IMAGE,
    imageAlt: page.data.ogImageAlt ?? DEFAULT_IMAGE_ALT,
    type: page.data.ogType ?? "website",
    url: SITE_URL + (page.url.pathname.replace(/\/+$/, "") || "/"),
  });
</script>

<svelte:head>
  <meta name="theme-color" content={headerTint} />
  <!-- Render the tint on direct loads and update it with client navigation. -->
  <svelte:element this={"style"}>{headerStyle}</svelte:element>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.url} />
  <!-- Open Graph -->
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:type" content={meta.type} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={meta.imageAlt} />
  <meta property="og:site_name" content="Sundowners" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  <meta name="twitter:image:alt" content={meta.imageAlt} />
</svelte:head>

<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-[calc(1rem+var(--safe-area-top))] focus:left-[calc(1rem+var(--safe-area-left))] focus:z-50 focus:bg-orange-700 focus:text-white focus:px-4 focus:py-2">
  Skip to main content
</a>

<main class="page-shell grid grid-cols-12 gap-4 font-mono pb-32 bg-orange-100">
  <SiteHeader hero={page.data.headerImage} smallHeader={page.data.smallHeader} />
  <div id="main-content" class="contents">
    {@render children()}
  </div>
  <footer class="col-span-12">
    <img
      src={logoLion}
      width="79"
      height="71"
      class="mx-auto mb-8 md:mb-12 mt-section w-24"
      alt="sundowners lion logo"
      loading="lazy"
    />
    <p
      class="px-8 md:px-0 max-w-prose mx-auto text-xl md:text-2xl font-garamond text-orange-950 mb-4 text-center"
    >
      Collaborate with us if you would like to participate as a musician, DJ,
      dancer, artist or in any creative capacity.
    </p>
    <div
      class="max-w-prose mx-auto px-8 md:px-0 text-sm text-center leading-relaxed text-orange-900 space-y-[1lh]"
    >
      <p>
        At Black Rock City and year-round, our goal is to spread the Sundowners'
        vision through our flavor of African diaspora events, creative projects,
        and community involvement.
      </p>
      <p>We would love to hear from you.</p>
      <p class="flex flex-wrap items-center justify-center gap-4">
        <a
          href="mailto:sundownersbrc@gmail.com"
          class="inline-flex h-11 items-center justify-center gap-2 border border-transparent bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          aria-label="Email Sundowners camp"
        >
          <svg viewBox="0 0 24 24" class="size-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 6 9 7 9-7" />
          </svg>
          Email
        </a>
        <a
          href="https://www.instagram.com/sundownerssafari/"
          class="inline-flex h-11 items-center justify-center gap-2 border border-transparent bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          aria-label="Follow Sundowners on Instagram"
        >
          <svg viewBox="0 0 24 24" class="size-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          Instagram
        </a>
        <a
          href="https://www.facebook.com/sundownersbrc"
          class="inline-flex h-11 items-center justify-center gap-2 border border-transparent bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          aria-label="Follow Sundowners on Facebook"
        >
          <svg viewBox="0 0 24 24" class="size-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V1.5a23 23 0 0 0-3-.2C12 1.3 10 3.2 10 6.6V9H7v4h3v8" />
          </svg>
          Facebook
        </a>
      </p>
    </div>
  </footer>
</main>

{#if import.meta.env.DEV}
  <Agentation />
{/if}
