/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-sunrise": "url('images/wax-fabric/sunrise.jpeg')",
      },
    },
  },
  plugins: [],
};
