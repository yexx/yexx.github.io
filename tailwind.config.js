const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: 'var(--white)',
      black: 'var(--black)',
      primary: colors.fuchsia,
      secondary: colors.amber,
      trueGray: colors.trueGray,
    },
    extend: {
      fontFamily: {
        'redhat': ['Red Hat Mono', 'monospace'],
        'cabin': ['Cabin', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
