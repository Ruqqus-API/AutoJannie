// tailwind.config.js
const colors = require('./node_modules/tailwindcss/colors')

module.exports = {
  purge: [
  './src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      lightblue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      yellow: colors.yellow,
      orange: colors.orange,
      green: colors.green,
      teal: colors.teal,
      cyan: colors.cyan,
      purple: colors.violet,
      fuchsia: colors.fuchsia,
      pink: colors.pink
    },
    fontSize: {
     'xs': '.75rem',
     'sm': '.875rem',
     'base': '1rem',
     'lg': '1.125rem',
     'xl': '1.25rem',
     '2xl': '1.5rem',
     '3xl': '1.875rem',
     '4xl': '2.25rem',
     '5xl': '3rem',
     '6xl': '4rem',
     '7xl': '5rem',
     '10xl': '8rem',
     '12xl': '16rem'
   },
   scale: {
    '0': '0',
    '25': '.25',
    '50': '.5',
    '60': '.6',
    '70': '.7',
    '75': '.75',
    '80': '.8',
    '85': '.85',
    '90': '.9',
    '95': '.95',
    '100': '1',
    '105': '1.05',
    '110': '1.1',
    '125': '1.25',
    '150': '1.5',
    '200': '2'
  },
  borderWidth: {
    DEFAULT: '1px',
    '0': '0',
    '2': '2px',
    '3': '3px',
    '4': '4px',
    '6': '6px',
    '8': '8px',
  }
},
variants: {
  extend: {
    scale: ['hover', 'group-hover', 'active'],
    transform: ['hover', 'focus', 'group-hover'],
    translate: ['hover', 'group-hover'],
    zIndex: ['hover'],
    display: ['hover', 'group-hover', 'focus'],
    animation: ['hover', 'focus']
  }
},
plugins: [],
}
