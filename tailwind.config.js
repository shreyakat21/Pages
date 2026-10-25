/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        stone: {
          100: '#f5f5f4', // Soft white/cream
          600: '#57534e', // Warm tan
        },
        emerald: {
          200: '#a7f3d0', // Light green
          300: '#6ee7b7', // Light green accent
          600: '#047857', // Deep green
          700: '#065f46', // Forest green
        },
      },
    },
  },
  plugins: [],
}