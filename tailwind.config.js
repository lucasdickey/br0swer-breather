/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        'breathing-primary': '#3B82F6', // Blue
        'breathing-secondary': '#60A5FA', // Lighter blue
        'breathing-accent': '#10B981', // Green
        'breathing-neutral': '#F3F4F6', // Light gray
        'breathing-dark': '#1F2937', // Dark gray
      },
      animation: {
        'breathing-in': 'breatheIn 4s ease-in-out',
        'breathing-hold': 'breatheHold 4s ease-in-out',
        'breathing-out': 'breatheOut 4s ease-in-out',
        celebration: 'celebration 0.5s ease-out',
        fadeIn: 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        breatheIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.25)' },
        },
        breatheHold: {
          '0%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1.25)' },
        },
        breatheOut: {
          '0%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        celebration: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
