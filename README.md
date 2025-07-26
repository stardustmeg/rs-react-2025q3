# Rick and Morty Search — React 🚀👾

A React app to search Rick and Morty characters using [their public API](https://rickandmortyapi.com/documentation/), now with routing, functional components, and pagination!

✨ **Features:**

- Top section: Search input (prefilled from localStorage) + Search button
- Bottom section: Shows results (name + description)
- Loads characters on start (all or saved search term)
- Updates results and saves term on search
- Pagination with URL synchronization
- Click a character to open **details panel** on the right (master-detail layout)
- Details and page number are reflected in the URL
- Loading spinners while fetching list or details
- Custom hooks for localStorage and shared logic
- 404 page and About page
- Error boundary with fallback UI
- Fully converted to **functional components** using **React hooks**
- No Redux or component libraries used

🧠 **Routing & Hooks Task:**

This project was created to:

- Use **functional components + React hooks**
- Add **React Router SPA** with master-detail layout
- Add **pagination** synced with the URL
- Add **About page** and 404 handling
- Replace all class components (except error boundary)
- Remove test error buttons

🛠️ **Tech stack:**

- React 19 (functional components + hooks)
- React Router DOM (SPA mode)
- TypeScript
- Tailwind CSS
- Vite
- ESLint + Prettier + Husky
- Vitest + React Testing Library + jsdom (unit testing)
- Playwright (end-to-end testing)

⚙️ **Scripts:**

- `npm run dev` — start dev server
- `npm run build` — build app
- `npm run preview` — preview build
- `npm run lint` — run ESLint
- `npm run lint:fix` — fix lint issues
- `npm run format:fix` — run Prettier formatter
- `npm run test` — run unit tests
- `npm run test:watch` — run tests in watch mode
- `npm run test:coverage` — run tests and generate coverage report
- `npm run test:e2e` — run end-to-end tests
- `npm run test:e2e:headed` — run end-to-end tests in headed mode
- `npm run test:e2e:debug` — run end-to-end tests in debug mode
- `npm run prepare` — install husky

📄 Note: Run `npx playwright install` before running e2e tests.

🧪 **Testing Setup:**

- **Vitest** test runner + **React Testing Library**
- `jsdom` for DOM simulation
- All tests in `__tests__` folders
- Coverage via `@vitest/coverage-v8`
- **Playwright** for end-to-end tests
- Focused on **public behavior**, not internal implementation

📊 **Coverage Goals:**

- ≥80% statements
- ≥50% branches, functions, and lines
- External API calls are **mocked**
- Tests cover new routing and pagination behavior
