const { projectColors } = require("./src/plugins/tailwind/colors");

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      colors: projectColors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
