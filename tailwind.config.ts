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
        cream: {
          50: '#FDFAF5',
          100: '#FAF4EB',
          200: '#F5EBD9',
          300: '#EDE0C8',
          400: '#E0CFB0',
        },
        charcoal: {
          DEFAULT: '#2C2420',
          light: '#4A403A',
          muted: '#6B5E56',
          soft: '#8A7B72',
        },
        terracotta: {
          DEFAULT: '#C45C26',
          light: '#E07A3D',
          dark: '#A3481A',
          soft: '#F0A574',
          muted: '#F5D4C0',
        },
        sage: {
          DEFAULT: '#5C7A5E',
          light: '#7A9A7C',
          dark: '#3F5641',
          muted: '#C5D4C6',
          soft: '#E8F0E9',
        },
        beige: {
          DEFAULT: '#F3EBE0',
          dark: '#E8DCCB',
          light: '#F9F4EC',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(44, 36, 32, 0.08)',
        card: '0 8px 30px -8px rgba(44, 36, 32, 0.12)',
        lift: '0 16px 40px -12px rgba(44, 36, 32, 0.18)',
        nav: '0 2px 16px -2px rgba(44, 36, 32, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        'blob-warm':
          'radial-gradient(ellipse at 30% 50%, rgba(196, 92, 38, 0.08) 0%, transparent 60%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 1s infinite',
        'draw-in': 'drawIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        wiggle: 'wiggle 0.4s ease-in-out',
        heartbeat: 'heartbeat 0.45s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drawIn: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(6deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.25)' },
          '50%': { transform: 'scale(0.95)' },
          '75%': { transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
