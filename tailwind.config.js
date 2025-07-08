/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-beige': '#f9efce',
        'custom-blue': '#b2daed',
        'custom-light-gray': '#e3dede',
        'custom-gray': '#bbbbbb',
        'custom-dark-gray': '#aaaaaa',
        'custom-coal': '#303032',
        'custom-pistachio': '#c2e0bc',
        'custom-yellow': '#f0e14a',
        'custom-chocolate': '#44281d',
        'custom-green': '#97ce4c',
        'custom-pink': '#e89ac7',
        'custom-dark-night': '#0f091e',
        'custom-red': '#ec0000',
      },
    },
  },
  plugins: [],
};

export default config;
