/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {},
    theme: {
     textColor: theme => theme('colors'),
     textColor: {
      'md-purple': '#4e27a0',
      'drk-purple': '#130c3a',
      'md-gold': '#fca700',
    }
  },
  plugins: [],
}
}

