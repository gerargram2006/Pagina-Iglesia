/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#394234',
          800: '#4b5545',
          700: '#606C59',
          600: '#77856f',
          500: '#8f9e86',
          400: '#a6b69d',
          300: '#c3d1ba',
          200: '#dfe8d7',
          100: 'rgba(96, 108, 89, 0.1)',
        },
        gold: {
          700: '#9a7b1e',
          600: '#b8942e',
          500: '#c9a84c',
          400: '#dbb958',
          300: '#e8cf7a',
          200: '#f0dfa0',
        },
        neutral: {
          white: '#ffffff',
          50: '#f8faf7',
          100: '#f0f2ef',
          200: '#e2e5e0',
          300: '#cdd1ca',
          400: '#9ca3a0',
          500: '#6b746f',
          600: '#5a635e',
          700: '#3d4540',
          800: '#2d2d2d',
        },
        text: {
          DEFAULT: '#2d3530',
          light: '#5a635e',
          muted: '#9ca3a0',
        },
      },
      boxShadow: {
        'tw-sm': '0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03)',
        'tw': '0 4px 12px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.06)',
        'tw-lg': '0 8px 24px rgba(0, 0, 0, 0.06), 0 16px 48px rgba(0, 0, 0, 0.08)',
        'tw-xl': '0 12px 32px rgba(0, 0, 0, 0.08), 0 24px 64px rgba(0, 0, 0, 0.1)',
        'gold': '0 6px 20px rgba(201, 168, 76, 0.2), 0 12px 40px rgba(201, 168, 76, 0.15)',
        'glow': '0 0 30px rgba(201, 168, 76, 0.12), 0 0 60px rgba(201, 168, 76, 0.06)',
        'green': '0 6px 20px rgba(96, 108, 89, 0.15), 0 12px 40px rgba(96, 108, 89, 0.1)',
      },
      borderRadius: {
        'tw-xs': '6px',
        'tw-sm': '10px',
        'tw': '16px',
        'tw-lg': '24px',
        'tw-xl': '32px',
        'tw-2xl': '40px',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '350': '350ms',
      },
    },
  },
  plugins: [],
}


