/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        garamond: ["EB Garamond", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
