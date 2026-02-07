/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'laptop': { 'min': '1024px', 'max': '1536px' },
      },
      colors: {
        orange: {
          DEFAULT: '#ff6b35',
          glow: 'rgba(255, 107, 53, 0.5)',
        },
        dark: {
          bg: '#000000',
          darker: '#000000',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-custom': 'pulse-custom 2s infinite',
      },
      keyframes: {
        'pulse-custom': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
