/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#8a2be2",
        dark: "#171717",
        gray: "#6C757D",
        secondary: "#242426"
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        main: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
