# Sundowners

The Sundowners Burning Man camp website. Built with SvelteKit 3, Svelte 5, and Tailwind CSS 4; all pages are prerendered. Netlify builds with Node 22 and publishes `build/`. SvelteKit and Netlify adapter configuration live in `vite.config.js`.

## Start editing

Use Node 22.17 or newer and Bun. Check the active versions first:

```sh
node --version
bun --version
```

If you use nvm, select Node 22 with `nvm install 22 && nvm use 22`. Both Node and Bun must be installed before continuing. From the repository root:

```sh
bun install --frozen-lockfile
bun run dev --open
```

The terminal prints the local URL. Changes update in the browser automatically.

## Find the right file

| Change | File |
| --- | --- |
| Camp year, address, expedition history | `src/lib/expeditions.js` |
| Homepage gallery, build photos, article cards | `src/lib/homepage.js` |
| Homepage copy and collage | `src/routes/+page.svelte` |
| Rexan article | `src/routes/rexan-sound-system/+page.svelte` |
| Survival guide | `src/routes/jagged-balls-of-rolling-chaos/+page.svelte` |
| Default social tags and footer | `src/routes/+layout.svelte` |
| Hero banner and scrolling logo handoff | `src/lib/components/SiteHeader.svelte` |
| Shared fonts, colors, spacing | `src/app.css` |

When rolling over to a new camp year, preserve the previous expedition as a literal year/address entry before changing `currentYear` and `currentAddress`. Add the new theme and link at the top of `expeditions`. Also review the homepage's seasonal headline: it currently thanks visitors and displays `currentYear + 1`.

## Update photos

1. Add the source image under `src/lib/assets/Photos/` or the relevant article asset folder.
2. Import it using a nearby image's `?w=…&enhanced` pattern. Keep requested widths within the source image's dimensions.
3. For homepage galleries, update `galleryPhotos` or `build2026Photos` in `src/lib/homepage.js`; gallery `class` controls height and alignment. For article photos, update the relevant route's `Photo` or `PhotoRow` props (or its existing image markup). Include descriptive `alt` text.
4. Check both phone and desktop layouts.

Keep source images in `src/lib/assets/` when they need responsive processing. `static/` holds files served unchanged, such as favicons, the default social image, and the sitemap.

Shared media components live in `src/lib/components/`:

- `Photo.svelte`: captioned image; accepts `image`, `alt`, `caption`, and optional `sizes`, `class`, and `grow`.
- `PhotoRow.svelte`: a `photos` array of `{ image, alt, caption }`; matches image heights on desktop and stacks on phones.
- `VideoLoop.svelte`: silent inline video; accepts `src`, `poster`, `label`, `caption`, and optional `ratio` and `class`.

## Add an article

1. Create `src/routes/<slug>/+page.svelte`. Use the existing articles as examples; the Rexan article demonstrates shared media components and a table of contents.
2. Add `+page.server.ts` beside it. Follow an existing route's `load()` for `title`, `description`, `ogType`, `ogImage`, and `ogImageAlt`. Keep `ogImage` an absolute URL cropped to 1200×630 (`?w=1200&h=630&fit=cover`): the layout declares that size and the tests check it. The shared layout renders the social tags and canonical URL once.
3. Choose `smallHeader: true` for a compact banner, or follow the Rexan route's `headerImage` shape (`src`, `placeholder`, `alt`, `position`) for a photo-led header.
4. Add a card to `articles` in `src/lib/homepage.js`: unique `id`, `href`, `image`, `alt`, `title`, `blurb`, and optional crop class in `position`.
5. Add the public URL to `static/sitemap.xml`. The page-rendering tests read this file, so the new route joins their coverage.

## Preview and check

Preview the production build:

```sh
bun run build
bun run preview --port 4173 --strictPort
```

Stop any production preview with Ctrl+C before running tests, even previews on other ports: the test build replaces their shared output. Install the test browsers once:

```sh
bunx playwright install chromium webkit
```

Run the browser checks against a fresh production build:

```sh
bun run check
CI=1 bun run test:e2e
git diff --check
```

The suite starts its own preview on port 4173 and covers desktop Chromium, desktop WebKit, and iPhone emulation. It checks page rendering, image loading, social tags and headers during client navigation, keyboard access, narrow-screen overflow, article links, galleries, the logo handoff, diagrams, video playback, and the table of contents. Some cases intentionally skip layouts where they do not apply. Review new content visually as well.

Deployment settings live in `netlify.toml`: `npm run build`, output `build/`, Node 22. Local preview and test commands do not publish the site.
