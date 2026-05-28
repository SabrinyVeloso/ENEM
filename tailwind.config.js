import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.24)',
        glass: '0 16px 50px rgba(0, 0, 0, 0.18)'
      },
      borderRadius: {
        '3xl': '1.75rem'
      }
    }
  },
  plugins: [forms]
};