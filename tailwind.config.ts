import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#111111',
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8D5A3',
        },
        ivory: '#F5F0E8',
        crimson: '#8B0000',
        text: {
          primary: '#F5F0E8',
          secondary: '#9A8F7E',
        },
        border: 'rgba(201,168,76,0.2)',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        'shimmer-sweep': 'shimmer-sweep 2.5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scroll-bounce': 'scrollBounce 2s infinite',
        'subtle-pulse': 'subtlePulse 4s ease-in-out infinite',
        'gold-glow': 'goldGlow 3s ease-in-out infinite',
      },
      keyframes: {
        'shimmer-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        subtlePulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        goldGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201, 168, 76, 0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(201, 168, 76, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
