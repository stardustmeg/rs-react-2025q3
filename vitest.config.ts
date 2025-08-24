import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: { open: true },
  plugins: [tsconfigPaths(), react()],
  test: {
    exclude: ['node_modules', 'dist'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    maxConcurrency: 8,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/__tests__/**', 'src/__tests__/__mocks__/**', 'config/**/*', '**/*.d.ts', '**/types/**'],
      extension: ['.ts', '.tsx'],
      reporter: ['text', 'lcov'],
    },
    slowTestThreshold: 500,
    silent: true,
  },
});
