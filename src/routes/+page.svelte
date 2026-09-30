<script>
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import { articles, build2026Photos, galleryPhotos } from "$lib/homepage.js";
    // Full-width images: 640/1280/1920
    import katiesunset from "$lib/assets/Photos/katiesunset.jpg?w=640;1280;1920&enhanced";
    // Line art: transparent PNG rendered from the 2026 evolution SVG at 3795px.
    import rexanEvolution from "$lib/assets/rexan-evolution-2026.png?w=800;1600;2400;3200&enhanced";
    import lionAndLeyla from "$lib/assets/Photos/lion-and-leyla.jpg?w=640;1280;1920&enhanced";
    import rexanGroup2023 from "$lib/assets/Photos/DSC01143-Edit.jpeg?w=640;1280;1920&enhanced";

    // Half-width / medium images: 400/800/1200
    import group2022 from "$lib/assets/Photos/2022-group.jpg?w=400;800;1200&enhanced";
    import zuraSpotter from "$lib/assets/Photos/zura-spotter-seat.jpg?w=400;800;1200&enhanced";
    import tucoLauren from "$lib/assets/Photos/tucolauren.jpg?w=400;800;1200&enhanced";

    // Small accent images: 300/600
    import coogieSign from "$lib/assets/Photos/coogie-sign.jpg?w=300;600&enhanced";
    import joshRexan from "$lib/assets/Photos/josh-on-rexan.jpg?w=300;600&enhanced";

    // Patterns: tiles for repeating backgrounds (higher res for crisp tiling)
    import patternDazzle from "$lib/assets/dazzle.jpeg?w=800&format=webp";
    import patternChickens from "$lib/assets/wax-fabric/chickens.webp?w=800&format=webp";
    import patternFans from "$lib/assets/wax-fabric/fans.jpg?w=800&format=webp";
    import patternSunflower from "$lib/assets/wax-fabric/sunflower.webp?w=800&format=webp";
    import patternSpirograph from "$lib/assets/wax-fabric/spirograph.png?w=800&format=webp";
    import patternHandshake from "$lib/assets/wax-fabric/handshake.jpg?w=800&format=webp";
    import patternLeaves from "$lib/assets/wax-fabric/leaves.jpeg?w=800&format=webp";
    import patternLeopard from "$lib/assets/wax-fabric/leopard-pattern.avif?w=800&format=webp";

    import { currentYear, currentAddress, expeditions } from "$lib/expeditions.js";

    let gallery;
    let galleryAtStart = $state(true);
    let galleryAtEnd = $state(false);

    // Mouse users can't swipe a scrollbar-less strip, so the hints page it.
    function scrollGallery(direction) {
        gallery.scrollBy({ left: direction * gallery.clientWidth * 0.8, behavior: "smooth" });
    }

    function updateGalleryEnds() {
        galleryAtStart = gallery.scrollLeft <= 1;
        galleryAtEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
    }

</script>

<section id="intro" class="col-span-12 relative">
    <div class="mx-auto w-5/6 md:w-2/3 max-w-7xl grid grid-cols-8 gap-4">
        <div
            class="pattern-frame col-span-full p-2 -rotate-1 mt-8 md:-mt-88 mb-12"
            style:background-image="url({patternSunflower})"
        >
            <enhanced:img
                src={rexanGroup2023}
                sizes="(min-width: 1920px) 1280px, (min-width: 768px) 66vw, 83vw"
                alt="jump!"
                class="max-w-full"
                loading="lazy"
            />
        </div>
        <div class="col-span-full md:col-span-5">
            <h1 class="text-2xl md:text-3xl text-orange-950 mb-8 font-garamond">
                🦁 Thanks for an amazing Burn — see you in {currentYear + 1}!
            </h1>
            <p class="text-xl md:text-2xl text-orange-950 mb-4 font-garamond">
                Sundowners is centered on creating liminal spaces to celebrate
                the multicultural art, music, dance, and hospitality that
                African traditions and speakeasies bring to the world.
            </p>
            <div
                class="text-sm text-orange-950/80 leading-relaxed max-w-prose space-y-[1lh]"
            >
                <p>
                    We strive for a holistic offering through our shebeen
                    speakeasy and safari-theme art car. The deep artistry,
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
            class="col-span-full md:col-span-3 md:pl-16"
        >
            <aside
                class="bg-white rounded border border-black/10 divide-y divide-black/10 h-fit mt-8 md:mt-0"
            >
                <div class="p-4">
                    <p class="text-stone-500 text-xs tracking-tighter mb-2">
                        {currentYear} ADDRESS
                    </p>
                    <p class="text-base text-stone-950">{currentAddress}</p>
                </div>
                <div class="p-4">
                    <p class="text-stone-500 text-xs tracking-tighter mb-2">
                        INSTAGRAM
                    </p>
                    <p class="text-base">
                        <a
                            href="https://www.instagram.com/sundownerssafari/"
                            class="text-orange-500 underline hover:text-orange-700"
                            aria-label="Follow Sundowners on Instagram"
                            >@sundownerssafari</a
                        >
                    </p>
                </div>
                <div class="p-4">
                    <p class="text-stone-500 text-xs tracking-tighter mb-2">
                        EMAIL
                    </p>
                    <p class="text-base">
                        <a
                            href="mailto:sundownersbrc@gmail.com"
                            class="text-orange-500 underline hover:text-orange-700"
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

<section id="collage" class="col-span-12 mt-section overflow-x-clip">
    <div class="relative w-full max-w-7xl mx-auto h-[180vw] md:h-svh">
        <div
            class="pattern-frame absolute w-full top-0 md:w-192 md:left-1/4 p-2 rotate-1 drop-shadow-xl"
            style:background-image="url({patternFans})"
        >
            <enhanced:img
                src={tucoLauren}
                sizes="(max-width: 768px) 100vw, 768px"
                class="object-cover"
                alt="t + l"
                loading="lazy"
            />
        </div>
        <div
            class="pattern-frame absolute md:w-92 top-48 md:top-24 ml-8 p-2 -rotate-1 drop-shadow-xl"
            style:background-image="url({patternSpirograph})"
        >
            <enhanced:img
                src={coogieSign}
                sizes="(max-width: 768px) 200px, 368px"
                class="object-cover w-50 md:w-full"
                alt="sundowners with sign"
                loading="lazy"
            />
        </div>
        <div
            class="pattern-frame absolute md:w-92 w-48 top-20 md:top-auto right-0 hidden md:block md:bottom-1/4 p-2 rotate-12 drop-shadow-xl"
            style:background-image="url({patternLeaves})"
        >
            <enhanced:img
                src={joshRexan}
                sizes="(max-width: 768px) 192px, 368px"
                class="object-cover"
                alt="j on rexan"
                loading="lazy"
            />
        </div>
        <div
            class="pattern-frame absolute md:w-176 bottom-0 md:right-48 p-2 rotate-3 drop-shadow-xl"
            style:background-image="url({patternHandshake})"
        >
            <enhanced:img
                src={zuraSpotter}
                sizes="(max-width: 768px) 100vw, 704px"
                class="object-cover"
                alt="z on spotter"
                loading="lazy"
            />
        </div>
    </div>
</section>

<!-- The lion photo tucks over the empty playa at the bottom of the crew photo.
     Stacked (below lg): crew photo, lion, then text. Side by side (lg): the crew
     photo spans a fixed overlap row that the lion starts in, so the lion lands
     on the photo's bottom edge and can never ride up into the text. -->
<section id="crew" class="col-span-12 -mt-12 md:mt-section overflow-x-clip">
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
                    alt="2022 group"
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
                <div class="overflow-hidden">
                    <enhanced:img
                        src={lionAndLeyla}
                        sizes="(max-width: 767px) 92vw, 75vw"
                        alt="lion and l"
                        class="w-full h-auto object-cover -rotate-1"
                        loading="lazy"
                    />
                </div>
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
            <p class="text-sm text-orange-950/80 leading-relaxed max-w-prose">
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
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-xl md:text-2xl font-garamond text-white mb-4"
        >
            Our mission is to challenge nationalism through our unique
            expression of diversity.
        </p>
        <p
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm mb-8 text-white/80 leading-relaxed"
        >
            We are an African-diaspora inspired art collective named after
            'Sundowners' - a wonderful South African tradition of sharing
            stories, laughter, and libations at dusk.
        </p>
        <div class="col-span-12 md:col-start-3 md:col-span-8">
            <enhanced:img
                src={katiesunset}
                sizes="(max-width: 768px) 100vw, 66vw"
                alt="k staring into distance"
                loading="lazy"
                class="drop-shadow-xl"
            />
        </div>
        <p
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm text-white/80 mt-8 mb-section leading-relaxed"
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
                <p class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
                    In 2017, a passionate crew of longtime Burning Man vets from
                    across the globe traveled to South Africa and went on a
                    life-changing wildlife safari.
                </p>
                <div
                    class="text-sm mb-8 text-orange-950/80 leading-relaxed max-w-prose space-y-[1lh]"
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
                    class="text-orange-950/80 text-xs border-separate border-spacing-4 bg-orange-950/5 w-full rounded"
                >
                    <caption class="mb-4 text-orange-950">EXPEDITIONS</caption>

                    <tbody>
                        {#each expeditions as { year, theme, address, url, absent, cancelled } (year)}
                            <tr class={{ "opacity-50": absent, "line-through": cancelled }}>
                                <td>{year}</td>
                                <td>
                                    <a href={url} class="underline hover:text-orange-500"
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

        <div
            class="col-start-1 col-span-12 flex overflow-x-auto no-scrollbar p-2 mb-8"
        >
            <enhanced:img
                src={rexanEvolution}
                sizes="(max-width: 800px) 800px, (min-width: 1600px) 1600px, 100vw"
                alt="the evolution of our art car, rexan"
                class="w-full min-w-200 max-w-400 mx-auto"
                loading="lazy"
            />
        </div>
        <p
            class="col-span-12 -mt-6 mb-8 text-center text-xs text-orange-950/50 min-[816px]:hidden"
        >
            swipe for all the years →
        </p>

        <div
            class="col-start-2 col-span-10 md:col-start-2 md:col-span-10 mt-8 md:mt-16 mb-8 text-center"
        >
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-1">
                Rexan Build 2026
            </h2>
            <p class="text-sm text-orange-950/80">Somewhere in Reno</p>
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
        <div class="col-span-12 flex justify-between px-4 text-xs text-orange-950/50">
            <button
                type="button"
                onclick={() => scrollGallery(-1)}
                class={["underline hover:text-orange-500 cursor-pointer", galleryAtStart && "invisible"]}
            >
                ← back
            </button>
            <button
                type="button"
                onclick={() => scrollGallery(1)}
                class={["underline hover:text-orange-500 cursor-pointer", galleryAtEnd && "invisible"]}
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
            {#each galleryPhotos as { image, video, poster, alt, class: fit } (image ?? video)}
                {#if video}
                    <video
                        src={video}
                        {poster}
                        width="960"
                        height="540"
                        aria-label={alt}
                        autoplay
                        loop
                        muted
                        playsinline
                        preload="metadata"
                        class={fit}
                    ></video>
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
