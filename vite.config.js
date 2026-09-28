import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// enhancedImages() bundles vite-imagetools: `?enhanced` imports become
// <enhanced:img> sources, and plain directives (`?w=800&format=webp`) still work.
export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), sveltekit()],
});
