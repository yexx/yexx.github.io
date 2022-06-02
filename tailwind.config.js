const colors = require('tailwindcss/colors');

module.exports = {
  contents: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      custom: '#454545',
      white: 'var(--white)',
      black: 'var(--black)',
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      trueGray: colors.trueGray,
    },
    extend: {
      fontFamily: {
        'redhat': ['Red Hat Mono', 'monospace'],
        'cabin': ['Cabin', 'sans-serif']
      },
      typography: ({ theme }) => ({
        white: {
          css: {
            '--tw-prose-headings': 'var(--white)',
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
