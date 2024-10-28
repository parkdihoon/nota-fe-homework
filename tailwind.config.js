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
      }
    },
  },
  plugins: [],
}

