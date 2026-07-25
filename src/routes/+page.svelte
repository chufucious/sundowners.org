<script>
    // Full-width images: 640/1280/1920
    import katiesunset from "$lib/assets/Photos/katiesunset.jpg?w=640;1280;1920&format=webp&as=srcset";
    // Line art: ship the original 2392px PNG untouched (137 kB) — webp
    // re-encoding softened the strokes, and 2392 is the native ceiling.
    import rexanEvolution from "$lib/assets/rexan-evolution.png";
    import lionAndLeyla from "$lib/assets/Photos/lion-and-leyla.jpg?w=640;1280;1920&format=webp&as=srcset";
    import rexanGroup2023 from "$lib/assets/Photos/DSC01143-Edit.jpeg?w=640;1280;1920&format=webp&as=srcset";

    // Half-width / medium images: 400/800/1200
    import devofisheye from "$lib/assets/Photos/devofisheye.jpg?w=400;800;1200&format=webp&as=srcset";
    import gregonrexan from "$lib/assets/Photos/gregonrexan.jpg?w=400;800;1200&format=webp&as=srcset";
    import runninglion from "$lib/assets/Photos/runninglion.jpg?w=400;800;1200&format=webp&as=srcset";
    import rexanFire from "$lib/assets/Photos/rexan-fire.jpg?w=400;800;1200&format=webp&as=srcset";
    import rexanDancer from "$lib/assets/Photos/rexan-dancer.jpg?w=400;800;1200&format=webp&as=srcset";
    import rexanNightWide from "$lib/assets/Photos/rexan-night-wide.jpg?w=400;800;1200&format=webp&as=srcset";
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

    // Current placement — rendered in both the address card and the top row of
    // the expeditions table. Update here only.
    const currentYear = 2026;
    const currentAddress = "7:45 & Bodhi";
</script>

<section id="intro" class="col-span-12 relative">
    <div class="grid grid-cols-12 gap-4">
        <div
            class="col-start-2 col-span-10 md:col-start-3 md:col-span-8 p-2 -rotate-1 md:-mt-80 mb-12"
            style="background-image: url('{patternSunflower}'); background-repeat: repeat; background-size: 300px;"
        >
            <img
                srcset={rexanGroup2023}
                sizes="(max-width: 768px) 100vw, 66vw"
                alt="jump!"
                class="max-w-full"
                loading="lazy"
            />
        </div>
        <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
            <h1 class="text-2xl md:text-3xl text-orange-950 mb-8 font-garamond">
                🦁 See you in {currentYear} at {currentAddress}!
            </h1>
            <h2 class="text-xl md:text-2xl text-orange-950 mb-4 font-garamond">
                Sundowners is centered on creating liminal spaces to celebrate
                the multicultural art, music, dance, and hospitality that
                African traditions and speakeasies bring to the world.
            </h2>
            <p class="text-sm text-orange-950/80 leading-relaxed max-w-prose">
                We strive for a holistic offering through our shebeen speakeasy
                and safari-theme art car. The deep artistry, meaning, and
                humanity of African-based music is our creative North Star.<br
                /><br />We flavor our experience through Afrofuturism, imagining
                a positive, inclusive future through speculative art and
                technology, representing the diverse background and skills of
                our community.
            </p>
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

<section id="collage" class="col-span-12 mt-4 overflow-hidden py-12">
    <div class="relative w-full max-w-7xl mx-auto h-screen">
        <div
            class="absolute w-full top-0 md:w-[48rem] md:left-1/4 p-2 rotate-1 drop-shadow-xl"
            style="background-image: url('{patternFans}'); background-repeat: repeat; background-size: 300px;"
        >
            <img
                srcset={tucoLauren}
                sizes="(max-width: 768px) 100vw, 768px"
                class="object-cover"
                alt="t + l"
                loading="lazy"
            />
        </div>
        <div
            class="absolute md:w-[23rem] top-48 md:top-24 ml-8 p-2 -rotate-1 drop-shadow-xl"
            style="background-image: url('{patternSpirograph}'); background-repeat: repeat; background-size: 300px;"
        >
            <img
                srcset={coogieSign}
                sizes="(max-width: 768px) 200px, 368px"
                class="object-cover"
                alt="sundowners with sign"
                loading="lazy"
            />
        </div>
        <div
            class="absolute md:w-[23rem] w-[12rem] top-20 md:top-auto right-0 hidden md:block md:bottom-1/4 p-2 rotate-12 drop-shadow-xl"
            style="background-image: url('{patternLeaves}'); background-repeat: repeat; background-size: 300px;"
        >
            <img
                srcset={joshRexan}
                sizes="(max-width: 768px) 192px, 368px"
                class="object-cover"
                alt="j on rexan"
                loading="lazy"
            />
        </div>
        <div
            class="absolute md:w-[44rem] bottom-0 md:right-48 p-2 rotate-3 drop-shadow-xl"
            style="background-image: url('{patternHandshake}'); background-repeat: repeat; background-size: 300px;"
        >
            <img
                srcset={zuraSpotter}
                sizes="(max-width: 768px) 100vw, 704px"
                class="object-cover"
                alt="z on spotter"
                loading="lazy"
            />
        </div>
    </div>
</section>

<section id="crew" class="col-span-12 md:mt-8">
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-start-2 md:col-span-6 md:mr-8 px-6">
            <div
                class="w-full p-2 -rotate-1 drop-shadow-xl"
                style="background-image: url('{patternLeopard}'); background-repeat: repeat; background-size: 300px;"
            >
                <img
                    srcset={group2022}
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

<section id="l and lion" class="col-span-12 overflow-hidden mt-48">
    <div
        class="p-2 md:p-4 drop-shadow-xl -rotate-1 max-w-6xl mx-auto"
        style="background-image: url('{patternChickens}'); background-repeat: repeat; background-size: 300px;"
    >
        <div class="overflow-hidden">
            <img
                srcset={lionAndLeyla}
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
    class="col-span-12 bg-linear-to-b from-sky-900 to-amber-800 mt-48"
>
    <div
        class="h-2 md:h-4 w-full"
        style="background-image: url('{patternDazzle}') ; background-repeat: repeat-x;"
    ></div>
    <div class="grid grid-cols-12 gap-4 text-white pt-48">
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
            <picture class="col-start-3 col-span-8">
                <img
                    srcset={katiesunset}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    alt="k staring into distance"
                    loading="lazy"
                    class="drop-shadow-xl"
                />
            </picture>
        </div>
        <p
            class="col-start-2 col-span-10 md:col-start-7 md:col-span-4 text-sm text-white/80 mt-8 mb-48 leading-relaxed"
        >
            We feel Burning Man, as the world's largest temporary city, is a
            fitting ecosystem to explore a unique ethnographic heritage that has
            expressed itself across Africa, America, South America, and the
            Caribbean.
        </p>
    </div>
    <div
        class="h-2 md:h-4 w-full"
        style="background-image: url('{patternDazzle}') ; background-repeat: repeat-x;"
    ></div>
</section>

<section id="history" class="col-span-12 mt-48">
    <div class="grid grid-cols-12 gap-4">
        <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-4">
                In 2017, a passionate crew of longtime Burning Man vets from
                across the globe traveled to South Africa and went on a
                life-changing wildlife safari.
            </h2>
            <p
                class="text-sm mb-8 text-orange-950/80 leading-relaxed max-w-prose"
            >
                On the Savannah, we would end each day with the country's lovely
                sunset social ceremony.<br /><br />
                That same year, we dubbed ourselves Sundowners and created Rexan,
                a psychedelic safari-themed art car to bring this special cultural
                ritual to the Burning Man community and beyond.
            </p>
        </div>

        <div
            class="col-start-2 col-span-10 md:col-start-8 md:col-span-4 md:pl-8 relative"
        >
            <table
                class="text-orange-950/50 text-xs border-separate border-spacing-4 bg-orange-950/5 w-full rounded"
            >
                <caption class="mb-4 text-orange-950">EXPEDITIONS</caption>

                <tbody>
                    <tr>
                        <td>{currentYear}</td>
                        <td>
                            <a
                                href="https://journal.burningman.org/2025/10/philosophical-center/the-theme/burning-man-2026-axis-mundi/"
                                class="underline hover:text-orange-500"
                            >
                                Axis Mundi
                            </a>
                        </td>
                        <td>{currentAddress}</td>
                    </tr><tr>
                        <td>2025</td>
                        <td>
                            <a
                                href="https://journal.burningman.org/2024/11/philosophical-center/the-theme/burning-man-2025-tomorrow-today/"
                                class="underline hover:text-orange-500"
                            >
                                Tomorrow Today
                            </a>
                        </td>
                        <td>7:45 & Ellison</td>
                    </tr><tr>
                        <td>2024</td>
                        <td
                            ><a
                                href="https://journal.burningman.org/2023/10/philosophical-center/the-theme/2024-curiouser-curiouser/"
                                class="underline hover:text-orange-500"
                                >Curiouser & Curiouser</a
                            ></td
                        >
                        <td>Rest year</td>
                    </tr>
                    <tr>
                        <td>2023</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2023-event-archive/"
                                class="underline hover:text-orange-500"
                                >Animalia</a
                            ></td
                        >
                        <td>4:45 & Grootslang</td>
                    </tr>
                    <tr>
                        <td>2022</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2022-event-archive/"
                                class="underline hover:text-orange-500"
                                >Waking Dreams</a
                            ></td
                        >
                        <td>4:15 & Glimmer</td>
                    </tr>
                    <tr class="line-through">
                        <td>2021</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2021-event-archive/"
                                class="underline hover:text-orange-500"
                                >The Great Unknown</a
                            ></td
                        >
                        <td>CANCELLED</td>
                    </tr>
                    <tr class="line-through">
                        <td>2020</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2020-event-archive/"
                                class="underline hover:text-orange-500"
                                >The Multiverse</a
                            ></td
                        >
                        <td>CANCELLED</td>
                    </tr>
                    <tr>
                        <td>2019</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2019-event-archive/"
                                class="underline hover:text-orange-500"
                                >Metamorphoses</a
                            ></td
                        >
                        <td>4:15 & Hyacinth</td>
                    </tr>
                    <tr>
                        <td>2018</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2018-event-archive/"
                                class="underline hover:text-orange-500"
                                >I, Robot</a
                            ></td
                        >
                        <td>8:15 & Cylon</td>
                    </tr>
                    <tr>
                        <td>2017</td>
                        <td
                            ><a
                                href="https://burningman.org/about/history/brc-history/event-archives/2017-event-archive/2017-art-theme-radical-ritual/"
                                class="underline hover:text-orange-500"
                                >Radical Ritual</a
                            ></td
                        >
                        <td>7:30 & Labyrinth</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            class="col-start-1 col-span-12 md:col-start-2 md:col-span-10 flex overflow-x-auto no-scrollbar p-2 mb-8"
        >
            <img
                src={rexanEvolution}
                width="2392"
                height="851"
                alt="the evolution of our art car, rexan"
                class="w-full max-w-[1196px] mx-auto"
                loading="lazy"
            />
        </div>

        <div
            class="col-start-2 col-span-10 md:col-start-2 md:col-span-10 mb-8 text-center"
        >
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 mb-1">
                Rexan Build 2026
            </h2>
            <p class="text-sm text-orange-950/80">Somewhere in Reno</p>
        </div>

        <div
            class="col-start-2 col-span-10 md:col-start-2 md:col-span-10 md:w-3/4 md:mx-auto grid grid-cols-2 md:grid-cols-3 items-start mb-16 md:mb-8"
        >
            <div class="aspect-[4/3] overflow-hidden">
                <img
                    srcset={build2026Frame}
                    sizes="(max-width: 768px) 42vw, 21vw"
                    alt="raising the new frame"
                    loading="lazy"
                    class="block w-full h-full object-cover"
                />
            </div>
            <div class="aspect-[4/3] overflow-hidden">
                <img
                    srcset={build2026Toolkit}
                    sizes="(max-width: 768px) 42vw, 21vw"
                    alt="socket set at the dash"
                    loading="lazy"
                    class="block w-full h-full object-cover"
                />
            </div>
            <div class="aspect-[4/3] overflow-hidden">
                <img
                    srcset={build2026NightCanopy}
                    sizes="(max-width: 768px) 42vw, 21vw"
                    alt="working on the canopy at dusk"
                    loading="lazy"
                    class="block w-full h-full object-cover"
                />
            </div>
            <div class="aspect-[4/3] overflow-hidden">
                <img
                    srcset={build2026NightDrill}
                    sizes="(max-width: 768px) 42vw, 21vw"
                    alt="drilling into the side panel after dark"
                    loading="lazy"
                    class="block w-full h-full object-cover"
                />
            </div>
            <div class="aspect-[4/3] overflow-hidden">
                <img
                    srcset={build2026Solar}
                    sizes="(max-width: 768px) 42vw, 21vw"
                    alt="solar panels on the roof rack"
                    loading="lazy"
                    class="block w-full h-full object-cover"
                />
            </div>
            <div class="aspect-[4/3] overflow-hidden">
                <img
                    srcset={build2026Daylight}
                    sizes="(max-width: 768px) 42vw, 21vw"
                    alt="rexan in the yard"
                    loading="lazy"
                    class="block w-full h-full object-cover"
                />
            </div>
        </div>
    </div>
</section>

<section id="jagged-balls-promo" class="col-span-12 mt-48">
    <div class="grid grid-cols-12 gap-4">
        <div class="col-start-2 col-span-10 md:col-start-3 md:col-span-5">
            <img
                srcset={jaggedBalls}
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
<section id="collaborate" class="col-span-12 mt-48">
    <div class="grid grid-cols-12 gap-4">
        <div
            id="gallery"
            class="col-span-12 inline-flex overflow-x-auto no-scrollbar mb-8"
        >
            <img
                srcset={gregonrexan}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="on rexan"
                loading="lazy"
                class="w-full max-h-96 object-cover"
            />
            <img
                srcset={jonSmoke}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="j attracting influencers"
                loading="lazy"
                class="w-full max-h-64 object-cover"
            />
            <img
                srcset={rexanDancer}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="dancer on rexan"
                loading="lazy"
                class="w-full max-h-96 object-cover self-end"
            />
            <img
                srcset={runninglion}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="a running lion"
                loading="lazy"
                class="w-full max-h-80 object-cover"
            />
            <img
                srcset={sign}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="sundowners sign"
                loading="lazy"
                class="w-full max-h-96 object-cover"
            />
            <img
                srcset={gregFlying}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="g flying"
                loading="lazy"
                class="w-full max-h-80 object-cover self-end"
            />
            <img
                srcset={devofisheye}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="fisheye lens"
                loading="lazy"
                class="w-full max-h-96 object-cover"
            />
            <img
                srcset={rexanFire}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="fire on rexan"
                loading="lazy"
                class="w-full max-h-80 object-cover"
            />
            <img
                srcset={rexanNightWide}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="night time with rexan"
                loading="lazy"
                class="w-full max-h-96 object-cover"
            />
        </div>
    </div>
</section>
