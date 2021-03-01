const colors = require('./node_modules/tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      primary: ({ opacityVariable, opacityValue }) => {
        if (opacityValue !== undefined) {
          return `rgba(var(--color-primary), ${opacityValue})`
        }
        if (opacityVariable !== undefined) {
          return `rgba(var(--color-primary), var(${opacityVariable}, 1))`
        }
        return `rgb(var(--color-primary))`
      },
      secondary: ({ opacityVariable, opacityValue }) => {
        if (opacityValue !== undefined) {
          return `rgba(var(--color-secondary), ${opacityValue})`
        }
        if (opacityVariable !== undefined) {
          return `rgba(var(--color-secondary), var(${opacityVariable}, 1))`
        }
        return `rgb(var(--color-secondary))`
      },
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.yellow,
      orange: colors.orange,
      green: colors.green,
      teal: colors.teal,
      cyan: colors.cyan,
      purple: colors.violet,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
    },
    opacity: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '10': '.1',
      '13': '.13',
      '20': '.2',
      '30': '.3',
      '40': '.4',
      '50': '.5',
      '60': '.6',
      '65': '.65',
      '70': '.7',
      '80': '.8',
      '90': '.9',
      '100': '1',
    },
    scale: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
      '200': '2',
      '250': '2.5',
    },
    fontSize: {
      '3xs': '8px',
      '2xs': '11px',
      'xs': '12px',
      'sm': '13px',
      'base': '14px',
      'lg': '16px',
      'xl': '18px',
      '2xl': '21px',
      '3xl': '26px',
      '4xl': '32px',
      '5xl': '42px',
      '6xl': '56px',
      '7xl': '60px',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 600
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    borderRadius: {
      'none': '0',
      'sm': '3px',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px'
    },
    boxShadow: {
      xs: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    extend: {
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      margin: ['last'],
      backgroundOpacity: ['dark'],
      backgroundColor: ['active'],
      borderWidth: ['last', 'active'],
      boxShadow: ['active'],
      inset: ['active', 'group-hover'],
      opacity: ['disabled'],
      pointerEvents: ['disabled']
    }
  }
}