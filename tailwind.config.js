// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter","sans-serif"],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
