<script>
  let { id, href, image, alt, position = "", title, blurb } = $props();
</script>

<!-- A post's card: photo above its title, blurb and Read Now. The photo and
     the text are the targets, not the whole row: the photo is its own link
     (hidden from tabbing and screen readers, which get Read Now), and Read
     Now's ::after stretches over the text. Hovering either lights up the card.
     `position` is the photo's object-position class. -->
<section {id} class="group">
    <div class="flex flex-col gap-6">
        <a
            {href}
            tabindex="-1"
            aria-hidden="true"
            class="block overflow-hidden"
        >
            <enhanced:img
                src={image}
                sizes="(min-width: 1920px) 624px, (min-width: 768px) 33vw, 83vw"
                {alt}
                loading="lazy"
                class="w-full aspect-video object-cover {position} motion-safe:transition-transform duration-300 can-hover:group-has-[a:hover]:scale-[1.03]"
            />
        </a>

        <div
            class="relative"
        >
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 can-hover:group-has-[a:hover]:text-orange-700 transition-colors mb-4">
                {title}
            </h2>
            <p class="text-sm mb-8 text-orange-900 leading-relaxed max-w-prose">
                {blurb}
            </p>
            <a
                {href}
                class="inline-block bg-orange-500 can-hover:group-has-[a:hover]:bg-orange-400 group-has-[a:active]:bg-orange-600 text-orange-950 px-4 py-2 text-sm after:absolute after:inset-0"
                >Read Now<span class="sr-only">: {title}</span></a
            >
        </div>
    </div>
</section>
