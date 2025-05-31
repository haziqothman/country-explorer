/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        veryLightGray: "#fafafa",
        veryDarkBlueBg: "#202c37",
        darkBlue: "#2b3945",
        lightText: "#111517",
        darkText: "#ffffff",
      },
    },
  },
  plugins: [],
};
