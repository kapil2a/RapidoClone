/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'f1-red': '#E10600',
        'f1-black': '#15151E',
        'motogp-neon': '#00FF00',
        'motogp-blue': '#0066CC',
      },
      fontFamily: {
        'racing': ['var(--font-racing)', 'monospace'],
        'speed': ['var(--font-speed)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'racing-glow': 'racingGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        racingGlow: {
          '0%': { boxShadow: '0 0 5px rgba(225, 6, 0, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(225, 6, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
