/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
      extend: {
          fontFamily: {
              'inconsolata': ['Inconsolata', 'sans-serif'],
              'play': ['Play', 'sans-serif'],
              'orbitron': ['Orbitron', 'sans-serif'],// after you font, add some fonts separated by commas to handle fallback.
          }
      },
  },
  plugins: [],
}
