import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  build: { minify: true, target: 'esnext' },
  css: { modules: { localsConvention: 'camelCaseOnly' } },
  plugins: [react(), tsconfigPaths()],
});
