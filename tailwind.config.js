/** @type {import('tailwindcss').Config} */
export const content = ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'];
export const darkMode = 'class';
export const theme = {
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

      'dark-bg': '#1a1a1a',
      'dark-card': '#2d2d2d',
      'dark-border': '#404040',
      'dark-text': '#e5e5e5',
      'dark-header': '#1f2937',
    },
    scale: {
      101: '1.01',
    },
  },
};
export const plugins = [];
