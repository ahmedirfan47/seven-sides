import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /*
         * BRAND BACKGROUND — dark teal-tinted (not pure black).
         * This is the defining atmospheric color of the Seven Sides brand.
         * Their menu boards, interior shots, and Instagram content all live
         * in this dark warm-teal world, not cold black.
         */
        ss: {
          950: '#060E0D',
          900: '#0A1614',   /* ← main page background */
          800: '#0E1F1D',   /* ← section alt */
          700: '#132524',   /* ← card bg */
          600: '#192E2C',   /* ← card hover */
          500: '#243838',   /* ← borders */
          400: '#2E4543',   /* ← border hover */
          300: '#3D5E5C',   /* ← muted elements */
          200: '#6A9290',   /* ← secondary text */
          100: '#A5C8C5',   /* ← placeholder text */
          50:  '#D5E8E7',   /* ← lightest teal */
        },
        /* Brand amber/gold — logo circle, CTAs, prices, category headers */
        amber: {
          50:  '#FFF8E6', 100: '#FFEDB8', 200: '#FFDB7A', 300: '#FFC230',
          400: '#F5A800', 500: '#F0A820', 600: '#C67E00', 700: '#9A5800',
          800: '#6B3A00', 900: '#3D2000',
        },
        /* Brand teal — accents, badges, links */
        teal: {
          50:  '#E5F8F7', 100: '#B8EDEA', 200: '#79DEDB', 300: '#3BCECA',
          400: '#1CBEBA', 500: '#3BB5B0', 600: '#2A9491', 700: '#1A706D',
          800: '#0D4C4A', 900: '#063030',
        },
        /* Fire/heat — heat levels, fire indicators */
        fire: {
          DEFAULT: '#D63B2E', 400: '#FF5040', 600: '#A02820',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', '"Arial Black"', 'sans-serif'],
        sans:    ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'sm':         '0 1px 8px rgba(0,0,0,0.4)',
        'md':         '0 4px 16px rgba(0,0,0,0.5)',
        'lg':         '0 8px 32px rgba(0,0,0,0.6)',
        'amber-glow': '0 0 0 2px rgba(240,168,32,0.45)',
        'amber-sm':   '0 4px 20px rgba(240,168,32,0.2)',
        'teal-glow':  '0 0 0 2px rgba(59,181,176,0.35)',
      },
      keyframes: {
        marquee:   { from:{ transform:'translateX(0)' }, to:{ transform:'translateX(-50%)' } },
        fadeUp:    { from:{ opacity:'0', transform:'translateY(18px)' }, to:{ opacity:'1', transform:'none' } },
        fadeIn:    { from:{ opacity:'0' }, to:{ opacity:'1' } },
        scaleIn:   { from:{ opacity:'0', transform:'scale(0.94)' }, to:{ opacity:'1', transform:'none' } },
        slideDown: { from:{ opacity:'0', transform:'translateY(-10px)' }, to:{ opacity:'1', transform:'none' } },
        fire:      { '0%,100%':{ transform:'scale(1) rotate(-2deg)' }, '50%':{ transform:'scale(1.12) rotate(2deg)' } },
        bounce:    { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-6px)' } },
        pulse:     { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.5' } },
        spin:      { from:{ transform:'rotate(0deg)' }, to:{ transform:'rotate(360deg)' } },
      },
      animation: {
        'marquee':    'marquee 32s linear infinite',
        'fade-up':    'fadeUp 0.5s ease both',
        'fade-in':    'fadeIn 0.3s ease both',
        'scale-in':   'scaleIn 0.2s ease both',
        'slide-down': 'slideDown 0.2s ease both',
        'fire':       'fire 1.8s ease-in-out infinite',
        'bounce':     'bounce 0.9s ease-in-out',
        'pulse':      'pulse 2s ease-in-out infinite',
        'spin':       'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;