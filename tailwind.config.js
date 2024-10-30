const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00DCF0',
        secondary: '#3164EF',
        neutral: '#252A39',
      },
      keyframes: {
        bounceDots: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
      animation: {
        bounceDot1: 'bounceDots 1.2s infinite 0s',
        bounceDot2: 'bounceDots 1.2s infinite 0.2s',
        bounceDot3: 'bounceDots 1.2s infinite 0.4s',
      },
    },
  },
  plugins: [],
}

