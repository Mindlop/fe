/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exo2: '"Exo 2"',
        quicksand: "Quicksand",
        sans: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
