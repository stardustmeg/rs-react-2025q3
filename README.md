# Rick and Morty Search — React Class Components 🚀👾

A React app built with **class components** that lets you search Rick and Morty characters using [their public API](https://rickandmortyapi.com/documentation/).

✨ **Features:**

- Top section: Search input (prefilled from localStorage) + Search button
- Bottom section: Shows results (name + description)
- Loads characters on start (all or saved search term)
- Updates results and saves term on search
- Loading spinner while fetching
- Error boundary with fallback UI + test error button
- No hooks, Redux, or UI libs used

🛠️ **Tech stack:**

- React 19 (class components only)
- TypeScript
- Tailwind CSS
- Vite
- ESLint + Prettier + Husky
- Vitest + React Testing Library + jsdom (for unit testing)
- Playwright (for end-to-end testing)

⚙️ **Scripts:**

- `npm run dev` — start dev server
- `npm run build` — build app
- `npm run preview` — preview build
- `npm run lint` — run ESLint
- `npm run lint:fix` — fix lint issues
- `npm run format:fix` — run Prettier formatter
- `npm run test` — run tests
- `npm run test:watch` — run tests in watch mode
- `npm run test:coverage` — run tests and generate coverage report
- `npm run test:e2e` — run end-to-end tests
- `npm run test:e2e:headed` — run end-to-end tests in headed mode
- `npm run test:e2e:debug` — run end-to-end tests in debug mode
- `npm run prepare` — install husky

🧪 **Testing Setup:**

This project uses **Vitest** as the test runner with **React Testing Library** and `jsdom` for simulating the DOM.
Tests are located in `__tests__` folders.
Coverage is reported using `@vitest/coverage-v8`.
For end-to-end tests, **Playwright** is used.

📊 **Coverage Goals:**

- ≥80% statements
- ≥50% branches, functions, and lines
- Tests must validate **public behavior**, not internal class logic
- All external API calls are mocked
