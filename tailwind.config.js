/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B24",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
