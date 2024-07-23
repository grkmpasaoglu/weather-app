/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#040418',
        'custom-light': '#2d3753',
      },
    },
  },
  plugins: [],
}