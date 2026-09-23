<script>
    // Full-width images: 640/1280/1920
    import katiesunset from "$lib/assets/Photos/katiesunset.jpg?w=640;1280;1920&format=webp&as=srcset";
    // Line art: transparent PNG rendered from the 2026 evolution SVG at 3795px.
    import rexanEvolution from "$lib/assets/rexan-evolution-2026.png?w=800;1600;2400;3200&format=webp&as=srcset";
    import lionAndLeyla from "$lib/assets/Photos/lion-and-leyla.jpg?w=640;1280;1920&format=webp&as=srcset";
    import rexanGroup2023 from "$lib/assets/Photos/DSC01143-Edit.jpeg?w=640;1280;1920&format=webp&as=srcset";

    // Half-width / medium images: 400/800/1200
    import devofisheye from "$lib/assets/Photos/devofisheye.jpg?w=400;800;1200&format=webp&as=srcset";
    import gregonrexan from "$lib/assets/Photos/gregonrexan.jpg?w=400;800;1200&format=webp&as=srcset";
    import runninglion from "$lib/assets/Photos/runninglion.jpg?w=400;800;1200&format=webp&as=srcset";
    import rexanFire from "$lib/assets/Photos/rexan-fire.jpg?w=400;800;1200&format=webp&as=srcset";
    import rexanDancer from "$lib/assets/Photos/rexan-dancer.jpg?w=400;800;1200&format=webp&as=srcset";
    import rexanNightWide from "$lib/assets/Photos/rexan-night-wide.jpg?w=400;800;1200&format=webp&as=srcset";
    import manBurnFire from "$lib/assets/Photos/man-burn-fire.jpg?w=400;627&format=webp&as=srcset";
    import gregFlying from "$lib/assets/Photos/greg-flying.jpg?w=400;800;1200&format=webp&as=srcset";
    import group2022 from "$lib/assets/Photos/2022-group.jpg?w=400;800;1200&format=webp&as=srcset";
    import zuraSpotter from "$lib/assets/Photos/zura-spotter-seat.jpg?w=400;800;1200&format=webp&as=srcset";
    import tucoLauren from "$lib/assets/Photos/tucolauren.jpg?w=400;800;1200&format=webp&as=srcset";
    import sign from "$lib/assets/Photos/sign.jpg?w=400;800;1200&format=webp&as=srcset";
    import jonSmoke from "$lib/assets/Photos/jon-smoke.jpg?w=400;800;1200&format=webp&as=srcset";
    import jaggedBalls from "$lib/assets/jagged-balls-of-rolling-chaos.png?w=400;800;1200&format=webp&as=srcset";

    // Rexan build 2026
    import build2026Frame from "$lib/assets/Photos/build-2026-frame.jpg?w=400;800;1200&format=webp&as=srcset";
    import build2026Toolkit from "$lib/assets/Photos/build-2026-toolkit.jpg?w=400;800;1200&format=webp&as=srcset";
    import build2026NightCanopy from "$lib/assets/Photos/build-2026-night-canopy.jpg?w=400;800;1200&format=webp&as=srcset";
    import build2026NightDrill from "$lib/assets/Photos/build-2026-night-drill.jpg?w=400;800;1200&format=webp&as=srcset";
    import build2026Solar from "$lib/assets/Photos/build-2026-solar.jpg?w=400;800;1200&format=webp&as=srcset";
    import build2026Daylight from "$lib/assets/Photos/build-2026-daylight.jpg?w=400;800;1200&format=webp&as=srcset";

    // Small accent images: 300/600
    import coogieSign from "$lib/assets/Photos/coogie-sign.jpg?w=300;600&format=webp&as=srcset";
    import joshRexan from "$lib/assets/Photos/josh-on-rexan.jpg?w=300;600&format=webp&as=srcset";

    // Patterns: tiles for repeating backgrounds (higher res for crisp tiling)
    import patternDazzle from "$lib/assets/dazzle.jpeg?w=800&format=webp";
    import patternChickens from "$lib/assets/wax-fabric/chickens.webp?w=800&format=webp";
    import patternFans from "$lib/assets/wax-fabric/fans.jpg?w=800&format=webp";
    import patternSunflower from "$lib/assets/wax-fabric/sunflower.webp?w=800&format=webp";
    import patternSpirograph from "$lib/assets/wax-fabric/spirograph.png?w=800&format=webp";
    import patternHandshake from "$lib/assets/wax-fabric/handshake.jpg?w=800&format=webp";
    import patternLeaves from "$lib/assets/wax-fabric/leaves.jpeg?w=800&format=webp";
    import patternLeopard from "$lib/assets/wax-fabric/leopard-pattern.avif?w=800&format=webp";

    // Current placement — rendered in the headline, the address card, and the
    // top row of the expeditions table. Update here only.
    const currentYear = 2026;
    const currentAddress = "7:45 & Bodhi";

    const build2026Photos = [
        { srcset: build2026Frame, alt: "raising the new frame" },
        { srcset: build2026Toolkit, alt: "socket set at the dash" },
        { srcset: build2026NightCanopy, alt: "working on the canopy at dusk" },
        { srcset: build2026NightDrill, alt: "drilling into the side panel after dark" },
        { srcset: build2026Solar, alt: "solar panels on the roof rack" },
        { srcset: build2026Daylight, alt: "rexan in the yard" },
    ];

    // Bottom gallery, left to right. `class` sets each photo's max height and alignment.
    let gallery;

    // Mouse users can't swipe a scrollbar-less strip, so the hint pages it;
    // at the end it wraps back to the start.
    function scrollGallery() {
        const atEnd = gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
        gallery.scrollTo({
            left: atEnd ? 0 : gallery.scrollLeft + gallery.clientWidth * 0.8,
            behavior: "smooth",
        });
    }

    const galleryPhotos = [
        { srcset: gregonrexan, width: 2688, height: 3586, alt: "on rexan", class: "max-h-96" },
        { srcset: jonSmoke, width: 2048, height: 1365, alt: "j attracting influencers", class: "max-h-64" },
        { srcset: manBurnFire, width: 627, height: 940, alt: "the man lit up above a wall of fire", class: "max-h-96" },
        { srcset: rexanDancer, width: 4000, height: 2667, alt: "dancer on rexan", class: "max-h-96 self-end" },
        { srcset: runninglion, width: 2156, height: 2803, alt: "a running lion", class: "max-h-80" },
        { srcset: sign, width: 2000, height: 1336, alt: "sundowners sign", class: "max-h-96" },
        { srcset: gregFlying, width: 3106, height: 2075, alt: "g flying", class: "max-h-80 self-end" },
        { srcset: devofisheye, width: 5568, height: 4176, alt: "fisheye lens", class: "max-h-96" },
        { srcset: rexanFire, width: 5765, height: 3843, alt: "fire on rexan", class: "max-h-80" },
        { srcset: rexanNightWide, width: 3910, height: 2932, alt: "night time with rexan", class: "max-h-96" },
    ];

    // Newest first. `absent` dims years we didn't go; `cancelled` also strikes the row through.
    const expeditions = [
        { year: currentYear, theme: "Axis Mundi", address: currentAddress, url: "https://journal.burningman.org/2025/10/philosophical-center/the-theme/burning-man-2026-axis-mundi/" },
        { year: 2025, theme: "Tomorrow Today", address: "7:45 & Ellison", url: "https://journal.burningman.org/2024/11/philosophical-center/the-theme/burning-man-2025-tomorrow-today/" },
        { year: 2024, theme: "Curiouser & Curiouser", address: "Rest year", absent: true, url: "https://journal.burningman.org/2023/10/philosophical-center/the-theme/2024-curiouser-curiouser/" },
        { year: 2023, theme: "Animalia", address: "4:45 & Grootslang", url: "https://burningman.org/about/history/brc-history/event-archives/2023-event-archive/" },
        { year: 2022, theme: "Waking Dreams", address: "4:15 & Glimmer", url: "https://burningman.org/about/history/brc-history/event-archives/2022-event-archive/" },
        { year: 2021, theme: "The Great Unknown", address: "CANCELLED", absent: true, cancelled: true, url: "https://burningman.org/about/history/brc-history/event-archives/2021-event-archive/" },
        { year: 2020, theme: "The Multiverse", address: "CANCELLED", absent: true, cancelled: true, url: "https://burningman.org/about/history/brc-history/event-archives/2020-event-archive/" },
        { year: 2019, theme: "Metamorphoses", address: "4:15 & Hyacinth", url: "https://burningman.org/about/history/brc-history/event-archives/2019-event-archive/" },
        { year: 2018, theme: "I, Robot", address: "8:15 & Cylon", url: "https://burningman.org/about/history/brc-history/event-archives/2018-event-archive/" },
        { year: 2017, theme: "Radical Ritual", address: "7:30 & Labyrinth", url: "https://burningman.org/about/history/brc-history/event-archives/2017-event-archive/2017-art-theme-radical-ritual/" },
    ];
</script>

<section id="intro" class="col-span-12 relative">
    <div class="grid grid-cols-12 gap-4">
        <div
            class="pattern-frame col-start-2 col-span-10 md:col-start-3 md:col-span-8 p-2 -rotate-1 md:-mt-80 mb-12"
            style:background-image="url({patternSunflower})"
        >
            <img
                srcset={rexanGroup2023}
                width="6000"
                height="4000"
                sizes="(max-width: 768px) 100vw, 66vw"
                alt="jump!"
                class="max-w-full"
                loading="lazy"
            />
        </div>
        <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
            <h1 class="text-2xl md:text-3xl text-orange-950 mb-8 font-garamond">
                🦁 Thanks for an amazing Burn — see you in {currentYear + 1}!
            </h1>
            <h2 class="text-xl md:text-2xl text-orange-950 mb-4 font-garamond">
                Sundowners is centered on creating liminal spaces to celebrate
                the multicultural art, music, dance, and hospitality that
                African traditions and speakeasies bring to the world.
            </h2>
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
            class="col-start-2 col-span-10 md:col-start-8 md:col-span-3 md:pl-16"
        >
            <aside
                class="bg-white rounded border border-black/10 divide-y divide-black/10 h-fit mt-8 md:mt-0"
            >
                <div class="p-4">
                    <h3 class="text-stone-500 text-xs tracking-tighter mb-2">
                        {currentYear} ADDRESS
                    </h3>
                    <p class="text-sm text-stone-950">{currentAddress}</p>
                </div>
                <div class="p-4">
                    <h3 class="text-stone-500 text-xs tracking-tighter mb-2">
                        INSTAGRAM
                    </h3>
                    <p class="text-sm">
                        <a
                            href="https://www.instagram.com/sundownerssafari/"
                            class="text-orange-500 underline hover:text-orange-700"
                            aria-label="Follow Sundowners on Instagram"
                            >@sundownerssafari</a
                        >
                    </p>
                </div>
                <div class="p-4">
                    <h3 class="text-stone-500 text-xs tracking-tighter mb-2">
                        EMAIL
                    </h3>
                    <p class="text-sm">
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

<section id="collage" class="col-span-12 mt-section overflow-x-clip">
    <div class="relative w-full max-w-7xl mx-auto h-[180vw] md:h-svh">
        <div
            class="pattern-frame absolute w-full top-0 md:w-192 md:left-1/4 p-2 rotate-1 drop-shadow-xl"
            style:background-image="url({patternFans})"
        >
            <img
                srcset={tucoLauren}
                width="2000"
                height="1336"
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
            <img
                srcset={coogieSign}
                width="2075"
                height="3106"
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
            <img
                srcset={joshRexan}
                width="2075"
                height="3106"
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
            <img
                srcset={zuraSpotter}
                width="2048"
                height="1365"
                sizes="(max-width: 768px) 100vw, 704px"
                class="object-cover"
                alt="z on spotter"
                loading="lazy"
            />
        </div>
    </div>
</section>

<section id="crew" class="col-span-12 -mt-12 md:mt-section">
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-start-2 md:col-span-6 md:mr-8 px-6">
            <div
                class="pattern-frame w-full p-2 -rotate-1 drop-shadow-xl"
                style:background-image="url({patternLeopard})"
            >
                <img
                    srcset={group2022}
                    width="6000"
                    height="4000"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="2022 group"
                    loading="lazy"
                />
            </div>
        </div>
        <div class="col-start-2 col-span-10 md:col-start-8 md:col-span-4 mt-8">
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
                Our veteran, multi-continental crew offers an experience,
                interactivity, and vibe that is distinct from anything in Black
                Rock.
            </h2>
            <p class="text-sm text-orange-950/80 leading-relaxed max-w-prose">
                At every step, we strive to share the wonder and appreciation
                for one of the most special places on the planet, much like
                Burning Man itself.
            </p>
        </div>
    </div>
</section>

<section id="l-and-lion" class="col-span-12 overflow-hidden mt-section">
    <div
        class="pattern-frame p-2 md:p-4 drop-shadow-xl -rotate-1 max-w-6xl mx-auto"
        style:background-image="url({patternChickens})"
    >
        <div class="overflow-hidden">
            <img
                srcset={lionAndLeyla}
                width="3106"
                height="2075"
                sizes="(max-width: 768px) 100vw, 1152px"
                alt="lion and l"
                class="w-full h-auto object-cover rotate-1"
                loading="lazy"
            />
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
        <h2
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-xl md:text-2xl font-garamond text-white mb-4"
        >
            Our mission is to challenge nationalism through our unique
            expression of diversity.
        </h2>
        <p
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm mb-8 text-white/80 leading-relaxed"
        >
            We are an African-diaspora inspired art collective named after
            'Sundowners' - a wonderful South African tradition of sharing
            stories, laughter, and libations at dusk.
        </p>
        <div class="col-span-12 md:col-start-3 md:col-span-8">
            <picture>
                <img
                    srcset={katiesunset}
                    width="4240"
                    height="2832"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    alt="k staring into distance"
                    loading="lazy"
                    class="drop-shadow-xl"
                />
            </picture>
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
                <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
                    In 2017, a passionate crew of longtime Burning Man vets from
                    across the globe traveled to South Africa and went on a
                    life-changing wildlife safari.
                </h2>
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
                    class="text-orange-950/50 text-xs border-separate border-spacing-4 bg-orange-950/5 w-full rounded"
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
            <img
                srcset={rexanEvolution}
                sizes="(max-width: 800px) 800px, (min-width: 1600px) 1600px, 100vw"
                width="3795"
                height="995"
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
            {#each build2026Photos as { srcset, alt } (srcset)}
                <div class="aspect-4/3 overflow-hidden">
                    <img
                        {srcset}
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

<section id="jagged-balls-promo" class="col-span-12 mt-section">
    <div class="grid grid-cols-12 gap-4">
        <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
            <img
                srcset={jaggedBalls}
                width="2048"
                height="2048"
                sizes="(max-width: 768px) 100vw, 42vw"
                alt="jagged balls of rolling chaos"
                loading="lazy"
                class="w-full max-h-96 object-cover"
            />
        </div>

        <div
            class="col-start-2 col-span-10 md:col-start-8 md:col-span-4 md:pl-8 relative"
        >
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
                Jagged Balls of Rolling Chaos
            </h2>
            <p
                class="text-sm mb-8 text-orange-950/80 leading-relaxed max-w-prose"
            >
                A guide on how to survive the playa.
            </p>
            <a
                href="/jagged-balls-of-rolling-chaos"
                class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 text-sm"
                >Read Now</a
            >
        </div>
    </div>
</section>
<section id="collaborate" class="col-span-12 mt-section">
    <div class="grid grid-cols-12 gap-4">
        <button
            type="button"
            onclick={scrollGallery}
            class="col-span-12 justify-self-end px-4 text-xs text-orange-950/50 hover:text-orange-500 cursor-pointer"
        >
            more photos →
        </button>
        <div
            id="gallery"
            bind:this={gallery}
            class="col-span-12 inline-flex overflow-x-auto no-scrollbar"
        >
            {#each galleryPhotos as { srcset, width, height, alt, class: fit } (srcset)}
                <img
                    {srcset}
                    {width}
                    {height}
                    sizes="(max-width: 768px) 100vw, 400px"
                    {alt}
                    loading="lazy"
                    class={["w-full object-cover", fit]}
                />
            {/each}
        </div>
    </div>
</section>
