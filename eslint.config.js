import bearcncBase from './package/eslint-config-bearcnc-base/index.js';
import { defineConfig } from 'eslint/config';
import markdown from '@eslint/markdown';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  bearcncBase,
  {
    files: ['**/*.js'],
    rules: {
      'import/extensions': 'off',
    },
  },
  {
    files: ['**/tests/**/*.js'],
    languageOptions: {
      env: { mocha: true },
    },
  },
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    extends: ['markdown/recommended'],
    rules: {
      'markdown/no-html': 'error',
      'markdown/no-duplicate-headings': 'error',
      'markdown/no-bare-urls': 'error',
      'markdown/no-empty-definitions': ['error', { allowDefinitions: ['//'] }], // Allow comments
    },
  },
  eslintConfigPrettier,
]);
