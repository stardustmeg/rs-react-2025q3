import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { globalIgnores } from 'eslint/config';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginImport from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import { myEslintRules } from './eslint-rules/my-eslint-rules.js';
import eslintPluginNoRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default tseslint.config([
  globalIgnores(['dist', '**/*.js', '**/*.d.ts', '**/*.config.[jt]s?(x)']),
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      perfectionist.configs['recommended-natural'],
      eslintPluginImport.flatConfigs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...tseslint.configs.stylisticTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      unicorn.configs.recommended,
      eslintPluginPrettier,
    ],
    languageOptions: { ecmaVersion: 'latest', globals: globals.browser },
    plugins: {
      react,
      'unused-imports': unusedImports,
      'no-relative-import-paths': eslintPluginNoRelativeImportPaths,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...myEslintRules,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/*.spec.[jt]s?(x)'],
    plugins: { 'jest-dom': jestDom, 'testing-library': testingLibrary },
    rules: {
      ...jestDom.configs.recommended.rules,
      ...testingLibrary.configs.react.rules,
      'unicorn/no-useless-undefined': 'off',
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },
]);
