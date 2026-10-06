<script>
    import ArticleCard from "#lib/components/ArticleCard.svelte";
    import LoopVideo from "#lib/components/LoopVideo.svelte";
    import { articles, build2026Photos, galleryPhotos } from "#lib/homepage.js";
    // Full-width images: 640/1280/1920
    import katiesunset from "#lib/assets/Photos/katiesunset.jpg?w=640;1280;1920&enhanced";
    import EvolutionCarousel from "#lib/components/rexan/EvolutionCarousel.svelte";
    import rexanLogo from "#lib/assets/logo/rexan-sign.svg";
    import lionAndLeyla from "#lib/assets/Photos/lion-and-leyla.jpg?w=640;1280;1920&enhanced";
    import rexanGroup2023 from "#lib/assets/Photos/DSC01143-Edit.jpeg?w=640;1280;1920&enhanced";

    // Half-width / medium images: 400/800/1200
    import group2022 from "#lib/assets/Photos/2022-group.jpg?w=400;800;1200&enhanced";
    import zuraSpotter from "#lib/assets/Photos/zura-spotter-seat.jpg?w=400;800;1200&enhanced";
    import tucoLauren from "#lib/assets/Photos/tucolauren.jpg?w=400;800;1200&enhanced";

    // Small accent images: 300/600
    import coogieSign from "#lib/assets/Photos/coogie-sign.jpg?w=300;600&enhanced";
    import joshRexan from "#lib/assets/Photos/josh-on-rexan.jpg?w=300;600&enhanced";

    // Patterns: tiles for repeating backgrounds. Frames show them at 300px, so
    // 600px stays crisp on 2x screens (the Rexan carousel uses the same tiles).
    // The dazzle strip shows its image at natural size, so it keeps 800px.
    import patternDazzle from "#lib/assets/dazzle.jpeg?w=800&format=webp";
    import patternChickens from "#lib/assets/wax-fabric/chickens.webp?w=600&format=webp";
    import patternFans from "#lib/assets/wax-fabric/fans.jpg?w=600&format=webp";
    import patternSunflower from "#lib/assets/wax-fabric/sunflower.webp?w=600&format=webp";
    import patternSpirograph from "#lib/assets/wax-fabric/spirograph.png?w=600&format=webp";
    import patternHandshake from "#lib/assets/wax-fabric/handshake.jpg?w=600&format=webp";
    import patternLeaves from "#lib/assets/wax-fabric/leaves.jpeg?w=600&format=webp";
    import patternLeopard from "#lib/assets/wax-fabric/leopard-pattern.avif?w=600&format=webp";

    import { currentYear, currentAddress, expeditions } from "#lib/expeditions.js";

    let introReady = $state(false);
    function revealIntro(photo) {
        const fabric = new Image();
        fabric.src = patternSunflower;
        async function reveal() {
            // Failed images settle too, so the remaining content stays usable.
            await Promise.allSettled([photo.decode(), fabric.decode()]);
            // Resizing can cancel a decode to select a new responsive source.
            // Its load/error event will retry; don't reveal while still loading.
            if (photo.complete) introReady = true;
        }
        photo.addEventListener("load", reveal);
        photo.addEventListener("error", reveal);
        if (photo.complete) reveal(); // Already loaded (or failed) before hydration.
        return () => {
            photo.removeEventListener("load", reveal);
            photo.removeEventListener("error", reveal);
        };
    }

    let gallery;
    let galleryAtStart = $state(true);
    let galleryAtEnd = $state(false);

    // Mouse users can't swipe a scrollbar-less strip, so the hints page it.
    function scrollGallery(direction) {
        gallery.scrollBy({ left: direction * gallery.clientWidth * 0.8, behavior: "smooth" });
    }

    // Lets search engines tie the camp's name to this site and its profiles.
    const organization = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sundowners",
        url: "https://sundowners.org/",
        logo: "https://sundowners.org/android-chrome-512x512.png",
        description: "An African-diaspora inspired Burning Man camp and art collective, home of the Rexan art car.",
        sameAs: ["https://www.instagram.com/sundownerssafari/", "https://www.facebook.com/sundownersbrc"],
    });

    function updateGalleryEnds() {
        galleryAtStart = gallery.scrollLeft <= 1;
        galleryAtEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
    }

</script>

<svelte:head>
    {@html `<script type="application/ld+json">${organization}</script>`}
</svelte:head>

<section id="intro" class="col-span-12 relative">
    <div class="mx-auto w-5/6 md:w-2/3 max-w-7xl grid grid-cols-8 gap-4">
        <div
            class={["pattern-frame relative col-span-full p-2 -rotate-1 mt-8 md:-mt-88 lg:-mt-102 mb-12", !introReady && "intro-pending"]}
            style:background-image="url({patternSunflower})"
        >
            <!-- Reserve the photo's shape even when WebKit paints a broken image. -->
            <div style:aspect-ratio="{rexanGroup2023.img.w} / {rexanGroup2023.img.h}" class="relative">
                <enhanced:img
                    src={rexanGroup2023}
                    {@attach revealIntro}
                    sizes="(min-width: 1920px) 1280px, (min-width: 768px) 66vw, 83vw"
                    alt="The Sundowners crew cheering and waving from Rexan’s decks"
                    class="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                />
            </div>
            <!-- The seasonal greeting, as label-maker tape stuck on the photo. -->
            <p class="label-tape absolute -left-2 -bottom-1 md:-left-3.5 md:bottom-6 -rotate-4 whitespace-nowrap">
                <span class="fabric-shadow">🦁 Thanks for an amazing Burn — see you in {currentYear + 1}!</span>
            </p>
        </div>
        <div class="col-span-full md:col-span-5">
            <h1 class="text-xl md:text-2xl text-orange-950 mb-8 font-garamond">
                We’re <strong>Sundowners</strong>, an African-diaspora inspired Burning Man camp, bringing music, art, and community to the playa.
            </h1>
            <div
                class="text-sm text-orange-900 leading-relaxed max-w-prose space-y-[1lh]"
            >
                <p>We create liminal spaces to celebrate
                the multicultural art, music, dance, and hospitality that
                African traditions and speakeasies bring to the world.</p>
                <p>
                    We strive for a holistic offering through our shebeen
                    speakeasy and
                    <a href="/rexan-sound-system" class="text-orange-700 underline underline-offset-2 hover:text-orange-800"
                        >Rexan, our safari-themed art car</a
                    >. The deep artistry,
                    meaning, and humanity of African-based music is our creative
                    North Star.
                </p>
                <p>
                    We flavor our experience through Afrofuturism, imagining a
                    positive, inclusive future through speculative art and
                    technology, representing the diverse background and skills
                    of our community.
                </p>
            </div>
        </div>
        <div
            class="col-span-full md:col-span-3 md:pl-6 lg:pl-16"
        >
            <aside
                class="bg-white rounded border border-orange-200 divide-y divide-orange-200 h-fit mt-8 md:mt-0"
            >
                <div class="px-4 py-3">
                    <p class="eyebrow mb-1.5">
                        {currentYear} ADDRESS
                    </p>
                    <p class="text-sm text-stone-950">{currentAddress}</p>
                </div>
                <div class="px-4 py-3">
                    <p class="eyebrow mb-1.5">
                        INSTAGRAM
                    </p>
                    <p class="text-sm wrap-anywhere">
                        <a
                            href="https://www.instagram.com/sundownerssafari/"
                            class="text-orange-700 underline underline-offset-2 hover:text-orange-800"
                            aria-label="Follow Sundowners on Instagram"
                            >@sundownerssafari</a
                        >
                    </p>
                </div>
                <div class="px-4 py-3">
                    <p class="eyebrow mb-1.5">
                        EMAIL
                    </p>
                    <p class="text-sm">
                        <a
                            href="mailto:sundownersbrc@gmail.com"
                            class="text-orange-700 underline underline-offset-2 hover:text-orange-800"
                            aria-label="Email Sundowners camp">Contact Us</a
                        >
                    </p>
                </div>
            </aside>
        </div>
    </div>
</section>

<section id="articles" class="col-span-12 relative mt-section">
    <div class="mx-auto w-5/6 md:w-2/3 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        {#each articles as article (article.id)}
            <ArticleCard {...article} />
        {/each}
    </div>
</section>

<!-- Photos are placed in percentages of a box with a fixed aspect ratio, so the
     arrangement scales as one piece instead of spreading out on tall screens or
     running off the edges of narrow ones. Phones get their own arrangement; from
     md up it's the layout designed at 1280x900. -->
<section id="collage" class="col-span-12 mt-section overflow-x-clip">
    <div class="relative w-full max-w-7xl mx-auto aspect-[5/9] md:aspect-[64/45]">
        <div
            class="pattern-frame absolute top-0 left-[2%] w-[92%] md:left-1/4 md:w-3/5 p-2 rotate-1 drop-shadow-xl"
            style:background-image="url({patternFans})"
        >
            <enhanced:img
                src={tucoLauren}
                sizes="(max-width: 767px) 92vw, (max-width: 1279px) 60vw, 768px"
                class="w-full h-auto"
                alt="Two campmates in the low sun at camp, one perched on a blue stepladder"
                loading="lazy"
            />
        </div>
        <div
            class="pattern-frame absolute top-[27.8%] left-[4%] w-[48%] md:top-[10.67%] md:left-[2.5%] md:w-[28.75%] p-2 -rotate-1 drop-shadow-xl"
            style:background-image="url({patternSpirograph})"
        >
            <enhanced:img
                src={coogieSign}
                sizes="(max-width: 767px) 48vw, (max-width: 1279px) 29vw, 368px"
                class="w-full h-auto"
                alt="Campmates in African-print outfits posing under the sequined Sundowners sign"
                loading="lazy"
            />
        </div>
        <div
            class="pattern-frame absolute top-[35.6%] right-[4%] w-[44%] md:right-[4.5%] md:top-auto md:bottom-1/4 md:w-[28.75%] p-2 rotate-6 md:rotate-12 drop-shadow-xl"
            style:background-image="url({patternLeaves})"
        >
            <enhanced:img
                src={joshRexan}
                sizes="(max-width: 767px) 44vw, (max-width: 1279px) 29vw, 368px"
                class="w-full h-auto"
                alt="A DJ playing on Rexan’s top deck, with riders below and the zebra-striped hood in front"
                loading="lazy"
            />
        </div>
        <div
            class="pattern-frame absolute bottom-0 right-[1.5%] w-[94%] md:right-[15%] md:w-[55%] p-2 rotate-3 drop-shadow-xl"
            style:background-image="url({patternHandshake})"
        >
            <enhanced:img
                src={zuraSpotter}
                sizes="(max-width: 767px) 94vw, (max-width: 1279px) 55vw, 704px"
                class="w-full h-auto"
                alt="A campmate in a leopard onesie in Rexan’s raised spotter seat at dusk"
                loading="lazy"
            />
        </div>
    </div>
</section>

<!-- The lion photo tucks over the empty playa at the bottom of the crew photo.
     Stacked (below lg): crew photo, lion, then text. Side by side (lg): the crew
     photo spans a fixed overlap row that the lion starts in, so the lion lands
     on the photo's bottom edge and can never ride up into the text. -->
<section id="crew" class="col-span-12 -mt-6 md:mt-section overflow-x-clip">
    <div
        class="grid grid-cols-12 gap-x-4 [--crew-overlap:clamp(2.5rem,4.5vw,5rem)] lg:grid-rows-[auto_var(--crew-overlap)_auto]"
    >
        <div
            class="col-span-11 pl-6 md:col-start-2 md:col-span-8 md:pl-0 lg:col-start-2 lg:col-span-6 lg:row-start-1 lg:row-span-2 lg:mr-8 self-start"
        >
            <div
                class="pattern-frame w-full p-2 -rotate-1 drop-shadow-xl"
                style:background-image="url({patternLeopard})"
            >
                <enhanced:img
                    src={group2022}
                    sizes="(max-width: 767px) 92vw, (max-width: 1023px) 67vw, 50vw"
                    alt="The 2022 Sundowners crew posing in front of camp, a white lion costume at the front"
                    loading="lazy"
                />
            </div>
        </div>
        <div
            id="l-and-lion"
            class="relative z-10 col-start-2 col-span-11 -mt-[8vw] md:col-start-4 md:col-span-9 md:mr-[4vw] md:-mt-[6vw] lg:col-start-4 lg:col-end-13 lg:row-start-2 lg:row-span-2 lg:mt-0"
        >
            <div
                class="pattern-frame p-2 md:p-4 drop-shadow-xl rotate-1"
                style:background-image="url({patternChickens})"
            >
                <enhanced:img
                    src={lionAndLeyla}
                    sizes="(max-width: 767px) 92vw, 75vw"
                    alt="A campmate laughing beside a stuffed lion in yellow sunglasses at the camp bar"
                    class="w-full h-auto"
                    loading="lazy"
                />
            </div>
        </div>
        <div
            class="col-start-2 col-span-10 mt-12 md:col-start-2 md:col-span-8 lg:col-start-8 lg:col-span-5 lg:pr-8 xl:col-span-4 xl:pr-0 lg:row-start-1 lg:mt-8 lg:pb-8"
        >
            <p class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
                Our veteran, multi-continental crew offers an experience,
                interactivity, and vibe that is distinct from anything in Black
                Rock.
            </p>
            <p class="text-sm text-orange-900 leading-relaxed max-w-prose">
                At every step, we strive to share the wonder and appreciation
                for one of the most special places on the planet, much like
                Burning Man itself.
            </p>
        </div>
    </div>
</section>

<section
    id="mission"
    class="col-span-12 bg-linear-to-b from-sky-900 to-amber-800 mt-section"
>
    <div
        class="h-2 md:h-4 w-full bg-repeat-x"
        style:background-image="url({patternDazzle})"
    ></div>
    <div class="grid grid-cols-12 gap-4 text-white pt-section">
        <p
            class="col-start-2 col-span-10 md:col-start-3 md:col-span-4 text-xl md:text-2xl font-garamond text-white mb-4"
        >
            Our mission is to challenge nationalism through our unique
            expression of diversity.
        </p>
        <p
            class="col-start-2 col-span-10 md:col-start-3 md:col-span-4 text-sm mb-8 text-orange-50 leading-relaxed"
        >
            We are an African-diaspora inspired art collective named after
            'Sundowners' - a wonderful South African tradition of sharing
            stories, laughter, and libations at dusk.
        </p>
        <div class="col-span-12 md:col-start-3 md:col-span-8">
            <enhanced:img
                src={katiesunset}
                sizes="(max-width: 768px) 100vw, 66vw"
                alt="A campmate watching the sunset over a crowd gathered on the playa"
                loading="lazy"
                class="drop-shadow-xl"
            />
        </div>
        <p
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm text-orange-50 mt-8 mb-section leading-relaxed"
        >
            We feel Burning Man, as the world's largest temporary city, is a
            fitting ecosystem to explore a unique ethnographic heritage that has
            expressed itself across Africa, America, South America, and the
            Caribbean.
        </p>
    </div>
    <div
        class="h-2 md:h-4 w-full bg-repeat-x"
        style:background-image="url({patternDazzle})"
    ></div>
</section>

<section id="history" class="col-span-12 mt-section">
    <div class="grid grid-cols-12 gap-4">
        <div
            class="col-start-2 col-span-10 w-full max-w-5xl mx-auto md:flex md:gap-16"
        >
            <div class="md:flex-1">
                <p class="text-xl md:text-2xl font-garamond text-orange-950 mb-8">
                    In 2017, a passionate crew of longtime Burning Man vets from
                    across the globe traveled to South Africa and went on a
                    life-changing wildlife safari.
                </p>
                <div
                    class="text-sm mb-8 text-orange-900 leading-relaxed max-w-prose space-y-[1lh]"
                >
                    <p>
                        On the Savannah, we would end each day with the country's
                        lovely sunset social ceremony.
                    </p>
                    <p>
                        That same year, we dubbed ourselves Sundowners and created
                        Rexan, a psychedelic safari-themed art car to bring this
                        special cultural ritual to the Burning Man community and
                        beyond.
                    </p>
                </div>
            </div>

            <div class="md:w-96 md:shrink-0">
                <table
                    class="text-orange-900 text-xs border-separate border-spacing-4 bg-orange-950/5 w-full rounded"
                >
                    <caption class="mb-4 eyebrow">EXPEDITIONS</caption>

                    <tbody>
                        {#each expeditions as { year, theme, address, url, absent, cancelled } (year)}
                            <tr class={{ "text-orange-900/60": absent, "line-through": cancelled }}>
                                <td>{year}</td>
                                <td>
                                    <a href={url} class="underline hover:text-orange-700"
                                        >{theme}</a
                                    >
                                </td>
                                <td>{address}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-start-1 col-span-12 mb-8">
            <img
                src={rexanLogo}
                alt="Rexan"
                width="4536"
                height="864"
                class="mx-auto mt-12 md:mt-20 mb-6 md:mb-0 w-44 md:w-64 h-auto"
                loading="lazy"
            />
            <EvolutionCarousel mode="grid" />
            <p class="mt-3 px-6 text-center font-mono text-xs text-orange-800 min-[816px]:hidden">
                Swipe for all the years →
            </p>
            <p class="mt-6 px-6 text-center font-garamond text-xl">
                <a
                    href="/rexan-sound-system"
                    class="text-orange-800 underline underline-offset-4 hover:text-orange-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
                    >Read about Rexan's Evolution</a
                >
            </p>
        </div>

        <div
            class="col-start-2 col-span-10 md:col-start-2 md:col-span-10 mt-8 md:mt-16 mb-8 text-center"
        >
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-1">
                Rexan Build 2026
            </h2>
            <p class="text-sm text-orange-900">Somewhere in Reno</p>
        </div>

        <div
            class="col-start-2 col-span-10 md:col-start-2 md:col-span-10 md:w-3/4 md:mx-auto grid grid-cols-2 md:grid-cols-3 items-start"
        >
            {#each build2026Photos as { image, alt } (image)}
                <div class="aspect-4/3 overflow-hidden">
                    <enhanced:img
                        src={image}
                        sizes="(max-width: 768px) 42vw, 21vw"
                        {alt}
                        loading="lazy"
                        class="block w-full h-full object-cover"
                    />
                </div>
            {/each}
        </div>
    </div>
</section>


<section id="collaborate" class="col-span-12 mt-section">
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 flex justify-between px-4 text-xs text-orange-900">
            <button
                type="button"
                onclick={() => scrollGallery(-1)}
                class={["underline hover:text-orange-700 cursor-pointer", galleryAtStart && "invisible"]}
            >
                ← back
            </button>
            <button
                type="button"
                onclick={() => scrollGallery(1)}
                class={["underline hover:text-orange-700 cursor-pointer", galleryAtEnd && "invisible"]}
            >
                more photos →
            </button>
        </div>
        <div
            id="gallery"
            bind:this={gallery}
            onscroll={updateGalleryEnds}
            class="col-span-12 inline-flex overflow-x-auto no-scrollbar"
        >
            {#each galleryPhotos as { image, video, poster, alt, class: fit, videoClass } (image ?? video)}
                {#if video}
                    <LoopVideo
                        src={video}
                        {poster}
                        label={alt}
                        width="960"
                        height="540"
                        class={fit}
                        {videoClass}
                    />
                {:else}
                    <enhanced:img
                        src={image}
                        sizes="(max-width: 768px) 100vw, 400px"
                        {alt}
                        loading="lazy"
                        class={["w-full object-cover", fit]}
                    />
                {/if}
            {/each}
        </div>
    </div>
</section>

<style>
    /* Reserve the photo's existing space from the first SSR paint. Without
       JavaScript, keep the ordinary image and fabric visible. */
    @media (scripting: enabled) {
        .intro-pending {
            opacity: 0;
        }
    }

    .label-tape {
        /* The sunflower fabric's key colour, as on the Rexan carousel's 2017 card. */
        --tint: #a07517;
        /* One strip on phones too: tighter tracking and a font that shrinks with
           the photo, so it stays one line along the bottom edge, below the faces. */
        font: 400 11px / 2.9 var(--font-mono);
        font-size: min(11px, 2.6vw);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--color-orange-50);
    }

    @media (min-width: 48rem) {
        .label-tape {
            font-size: clamp(11px, 1.15vw, 15px);
            letter-spacing: 0.14em;
        }
    }

    .label-tape > span {
        padding: 0.55em 1em;
        background: var(--color-orange-950);
    }
</style>
