import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: { open: true },
  plugins: [tsconfigPaths(), react()],
  test: {
    exclude: ['node_modules', 'dist', '**/e2e/**'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setupTests.ts'],
    maxConcurrency: 8,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/__tests__/**',
        'src/__mocks__/**',
        'src/main.tsx',
        'src/pages/App.tsx',
        'config/**/*',
        '**/*.d.ts',
        '**/types/**',
        '**/constants/**',
      ],
      extension: ['.ts', '.tsx'],
      reporter: ['text', 'lcov'],
    },
    slowTestThreshold: 500,
    testTimeout: 15000,
    silent: true,
  },
});
