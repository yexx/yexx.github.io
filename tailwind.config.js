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
      white: colors.neutral[200],
      black: colors.neutral[800],
      primary: {
        DEFAULT: '#a328cc',
        dodge: '#efcd23',
      },
      secondary: '#efcd23',
      neutral: colors.neutral,
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
