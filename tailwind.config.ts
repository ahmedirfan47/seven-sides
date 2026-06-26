import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFF8E7',
          100: '#FFEDC4',
          200: '#FFD77A',
          300: '#FFBD2A',
          400: '#F5A800',
          500: '#E8A020',
          600: '#C47C00',
          700: '#9A5D00',
          800: '#6B4000',
          900: '#3D2400',
        },
        teal: {
          50:  '#E6F5F7',
          100: '#C0E5EA',
          200: '#86C9D2',
          300: '#4BABB9',
          400: '#2A9BAD',
          500: '#4B9DA8',
          600: '#357E8C',
          700: '#235F6B',
          800: '#154248',
          900: '#082528',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          50:      '#F5F5F5',
          100:     '#E0E0E0',
          200:     '#3A3A3A',
          300:     '#2A2A2A',
          400:     '#1C1C1C',
          500:     '#141414',
          600:     '#0A0A0A',
          700:     '#050505',
        },
        heat: '#D63B2E',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', '"Arial Black"', 'sans-serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        'card-dark':  '0 2px 16px rgba(0,0,0,0.4)',
        'hover-dark': '0 8px 32px rgba(0,0,0,0.6)',
        'gold':       '0 4px 24px rgba(232,160,32,0.25)',
        'teal':       '0 4px 24px rgba(75,157,168,0.20)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        flamePulse: {
          '0%,100%': { transform: 'scale(1)' },
          '50%':     { transform: 'scale(1.08)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'none' },
        },
        bounceSm: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-4px)' },
        },
        pulse: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '.5' },
        },
      },
      animation: {
        'fade-up':     'fadeUp 0.5s ease-out both',
        'fade-in':     'fadeIn 0.35s ease-out both',
        'flame-pulse': 'flamePulse 1.4s ease-in-out infinite',
        'slide-down':  'slideDown 0.2s ease-out both',
        'scale-in':    'scaleIn 0.15s ease-out both',
        'bounce-sm':   'bounceSm 0.6s ease-in-out',
        'pulse':       'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;