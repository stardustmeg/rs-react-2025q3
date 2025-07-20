/** @type {import("prettier").Config} */
const config = {
  "printWidth": 120,
  "singleQuote": true,
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/styles/main.css"
}

export default config;
