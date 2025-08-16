import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginImport from 'eslint-plugin-import';
import eslint from '@eslint/js';
import eslintPluginNoRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import unusedImports from 'eslint-plugin-unused-imports';
import { myEslintRules } from './eslint-rules/my-eslint-rules.js';
import unicorn from 'eslint-plugin-unicorn';
import eslintPluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  { ignores: ['dist', '.next', '**/*.js', '**/*.d.ts', '**/*.config.[jt]s?(x)'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      perfectionist.configs['recommended-natural'],
      eslintPluginImport.flatConfigs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...tseslint.configs.stylisticTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      unicorn.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: { ecmaVersion: 'latest', globals: globals.browser },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      'no-relative-import-paths': eslintPluginNoRelativeImportPaths,
      '@next/next': eslintPluginNext,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,
      ...myEslintRules,
    },
    settings: { react: { version: 'detect' }, 'import/resolver': { typescript: { project: './tsconfig.json' } } },
  },
);
