<script>
  let { id, href, image, alt, position = "", title, blurb } = $props();
</script>

<!-- A post's card: photo beside its title, blurb and Read Now. The photo and
     the text are the targets, not the whole row: the photo is its own link
     (hidden from tabbing and screen readers, which get Read Now), and Read
     Now's ::after stretches over the text. Hovering either lights up the card.
     `position` is the photo's object-position class. -->
<section {id} class="col-span-12 mt-section">
    <div class="grid grid-cols-12 gap-4 group">
        <a
            {href}
            tabindex="-1"
            aria-hidden="true"
            class="block col-start-2 col-span-10 md:col-start-3 md:col-span-5 overflow-hidden"
        >
            <enhanced:img
                src={image}
                sizes="(max-width: 768px) 100vw, 42vw"
                {alt}
                loading="lazy"
                class="w-full max-h-96 object-cover {position} transition-transform duration-500 group-has-[a:hover]:scale-[1.03]"
            />
        </a>

        <div
            class="relative self-start col-start-2 col-span-10 md:col-start-8 md:col-span-4 md:pl-8"
        >
            <h2 class="text-xl md:text-2xl font-garamond text-orange-950 group-has-[a:hover]:text-orange-700 transition-colors mb-4">
                {title}
            </h2>
            <p class="text-sm mb-8 text-orange-950/80 leading-relaxed max-w-prose">
                {blurb}
            </p>
            <a
                {href}
                class="inline-block bg-orange-500 group-has-[a:hover]:bg-orange-700 text-white px-4 py-2 text-sm after:absolute after:inset-0"
                >Read Now<span class="sr-only">: {title}</span></a
            >
        </div>
    </div>
</section>
