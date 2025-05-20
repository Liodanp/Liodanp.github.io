/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f6ff',
          100: '#e0eaff',
          200: '#c0d4ff',
          300: '#93b4ff',
          400: '#598bff',
          500: '#3366ff',
          600: '#0F52BA', // Primary blue
          700: '#0843eb',
          800: '#073ad3',
          900: '#0c31a6',
        },
        teal: {
          50: '#effcf9',
          100: '#d7f4ed',
          200: '#b1e7db',
          300: '#7fd3c2',
          400: '#4ab6a4',
          500: '#14B8A6', // Secondary teal
          600: '#0e827a',
          700: '#0f6863',
          800: '#115252',
          900: '#114445',
        },
        orange: {
          50: '#fff8f0',
          100: '#ffecd0',
          200: '#fed7a8',
          300: '#feba76',
          400: '#fd9440',
          500: '#F97316', // Accent orange
          600: '#e85212',
          700: '#c13c13',
          800: '#992f16',
          900: '#7c2816',
        },
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};