/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/globals.css',
};

export default config;
