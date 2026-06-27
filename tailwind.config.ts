import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* Brand teal — more vibrant than before, closer to logo */
        teal: {
          50:  '#EAF9F8', 100: '#C0EDEA', 200: '#7EDEDA', 300: '#3DCECA',
          400: '#1BBFBA', 500: '#3BB5B0', 600: '#2A9491', 700: '#1A6E6B',
          800: '#0D4A48', 900: '#062D2B',
        },
        /* Brand gold/amber — slightly warmer, brighter */
        gold: {
          50:  '#FFF8E6', 100: '#FFEDB8', 200: '#FFDB7A', 300: '#FFC230',
          400: '#F5A800', 500: '#F0A820', 600: '#C67E00', 700: '#9A5800',
          800: '#6B3A00', 900: '#3D2000',
        },
        /* Dark surfaces */
        ink: {
          950: '#070707', 900: '#0A0A0A', 800: '#111111',
          700: '#171717', 600: '#1E1E1E', 500: '#272727',
          400: '#333333', 300: '#444444', 200: '#666666',
          100: '#999999', 50:  '#CCCCCC',
        },
        /* Fire/heat */
        heat: {
          DEFAULT: '#D63B2E', 400: '#FF5040', 600: '#A02820',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', '"Arial Black"', 'sans-serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(5rem,14vw,9rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-xl':  ['clamp(3.5rem,9vw,6rem)',  { lineHeight: '1', letterSpacing: '0' }],
        'display-lg':  ['clamp(2.5rem,6vw,4.5rem)', { lineHeight: '1.05' }],
        'display-md':  ['clamp(1.75rem,4vw,3rem)',  { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem', '22': '5.5rem', '26': '6.5rem',
        '72': '18rem',  '80': '20rem',  '88': '22rem',
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.7)',
        'gold-glow':  '0 0 0 2px rgba(240,168,32,0.4)',
        'teal-glow':  '0 0 0 2px rgba(59,181,176,0.4)',
        'gold-sm':    '0 4px 20px rgba(240,168,32,0.2)',
        'teal-sm':    '0 4px 20px rgba(59,181,176,0.15)',
      },
      keyframes: {
        marquee:    { from: { transform:'translateX(0)' }, to: { transform:'translateX(-50%)' } },
        fadeUp:     { from: { opacity:'0', transform:'translateY(16px)' }, to: { opacity:'1', transform:'none' } },
        fadeIn:     { from: { opacity:'0' }, to: { opacity:'1' } },
        scaleIn:    { from: { opacity:'0', transform:'scale(0.95)' }, to: { opacity:'1', transform:'none' } },
        slideDown:  { from: { opacity:'0', transform:'translateY(-8px)' }, to: { opacity:'1', transform:'none' } },
        flame:      { '0%,100%': { transform:'scale(1)' }, '50%': { transform:'scale(1.1)' } },
        bounceDot:  { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-6px)' } },
        pulse:      { '0%,100%': { opacity:'1' }, '50%': { opacity:'.5' } },
      },
      animation: {
        'marquee':    'marquee 30s linear infinite',
        'fade-up':    'fadeUp 0.5s ease both',
        'fade-in':    'fadeIn 0.35s ease both',
        'scale-in':   'scaleIn 0.2s ease both',
        'slide-down': 'slideDown 0.2s ease both',
        'flame':      'flame 1.6s ease-in-out infinite',
        'bounce-dot': 'bounceDot 0.8s ease-in-out',
        'pulse':      'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      borderRadius: {
        '4xl': '2rem', '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;