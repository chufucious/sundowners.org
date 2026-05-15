import { o as onDestroy } from "../../chunks/environment.js";
import { c as slot, l as stringify, n as attr_class, o as head, r as attr_style, z as attr } from "../../chunks/dev.js";
import { t as page } from "../../chunks/state.js";
//#region src/lib/components/Agentation.svelte
function Agentation_1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		onDestroy(() => {});
		$$renderer.push(`<div></div>`);
	});
}
//#endregion
//#region src/lib/assets/Photos/sundownerswalking.jpg?w=640;1280;1920&format=webp&as=srcset
var sundownerswalking_default = "/_app/immutable/assets/sundownerswalking.CNFSBrlK.webp 640w, /_app/immutable/assets/sundownerswalking.4k38FZ2o.webp 1280w, /_app/immutable/assets/sundownerswalking.DGQNvBqm.webp 1920w";
//#endregion
//#region src/lib/assets/wax-fabric/sunrise.jpeg?w=200&format=webp
var sunrise_default = "/_app/immutable/assets/sunrise.DwubN6kK.webp";
//#endregion
//#region src/lib/assets/logo/lion.svg
var lion_default = "/_app/immutable/assets/lion.BcqTOKDz.svg";
//#endregion
//#region src/lib/assets/logo/sundowners-logo-type-2025-solid.png?w=300;600;1200&as=srcset
var sundowners_logo_type_2025_solid_default = "/_app/immutable/assets/sundowners-logo-type-2025-solid.KE_rG9KL.png 300w, /_app/immutable/assets/sundowners-logo-type-2025-solid.-RvdAU2f.png 600w, /_app/immutable/assets/sundowners-logo-type-2025-solid.DKAd7vQm.png 1200w";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Sundowners – Black Rock City</title>`);
			});
			$$renderer.push(`<meta name="description" content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world."/> <meta property="og:title" content="Sundowners – Black Rock City"/> <meta property="og:description" content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world."/> <meta property="og:type" content="website"/> <meta property="og:url" content="https://sundowners.org"/> <meta property="og:image" content="https://sundowners.org/android-chrome-512x512.png"/> <meta property="og:site_name" content="Sundowners"/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title" content="Sundowners – Black Rock City"/> <meta name="twitter:description" content="Sundowners is a Burning Man camp centered on creating liminal spaces to celebrate the multicultural art, music, dance, and hospitality that African traditions and speakeasies bring to the world."/> <meta name="twitter:image" content="https://sundowners.org/android-chrome-512x512.png"/>`);
		});
		$$renderer.push(`<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2">Skip to main content</a> <main class="grid grid-cols-12 gap-4 font-mono pb-32"><header${attr_class("col-span-12 h-[18rem] relative overflow-hidden", void 0, { "md:h-[36rem]": !page.data.smallHeader })}><a href="/" class="fixed left-0 right-0 top-12 md:top-16 z-20 flex justify-center mix-blend-color-dodge"><img class="w-[300px] md:w-[600px]"${attr("srcset", sundowners_logo_type_2025_solid_default)} sizes="(max-width: 768px) 300px, 600px" alt="sundowners logo"/></a> <img${attr("srcset", sundownerswalking_default)} sizes="100vw" alt="Sundowners walking in Black Rock City" class="absolute inset-0 w-full h-full object-cover" fetchpriority="high"/> <div class="h-1 md:h-2 w-full absolute bottom-0"${attr_style(`background-image: url('${stringify(sunrise_default)}'); background-repeat: repeat; background-size: 200px; background-position: center;`)}></div></header> <div id="main-content" class="contents"><!--[-->`);
		slot($$renderer, $$props, "default", {}, null);
		$$renderer.push(`<!--]--></div> <footer class="col-span-12"><img${attr("src", lion_default)} class="col-span-12 mx-auto mb-4 mt-24 w-24" alt="sundowners lion logo" loading="lazy"/> <h2 class="px-8 md:px-0 col-span-12 max-w-prose mx-auto text-xl md:text-2xl font-garamond text-orange-950 mb-4 text-center">Collaborate with us if you would like to participate as a musician, DJ,
      dancer, artist or in any creative capacity.</h2> <p class="col-span-12 max-w-prose mx-auto px-8 md:px-0 text-sm text-center leading-relaxed text-orange-950/80">At Black Rock City and year-round, our goal is to spread the Sundowners'
      vision through our flavor of African diaspora events, creative projects,
      and community involvement.<br/><br/>We would love to hear from you.<br/><br/> <a href="mailto:sundownersbrc@gmail.com" class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2" aria-label="Email Sundowners camp">Email Us</a> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfv2tBFZXZsBnXomp4Ke-zkuQeW33qUtsqnGlwixeMUJYpAXg/viewform?usp=sf_link" class="inline-block bg-orange-500 hover:bg-orange-700 text-white px-4 py-2" aria-label="Open DJ application form (opens Google Form)">DJ Application Form</a></p></footer></main> `);
		Agentation_1($$renderer, {});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _layout as default };
