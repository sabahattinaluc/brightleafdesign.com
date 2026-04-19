/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moss: '#2E4036',
        clay: '#CC5833',
        cream: '#F2F0E9',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        drama: ['Cormorant Garamond', 'serif'],
        data: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        'container': '2rem',
        'container-lg': '3rem',
      }
    },
  },
  plugins: [],
}
