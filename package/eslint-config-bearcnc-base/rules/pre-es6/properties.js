import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (12.1) Prefer dot notation over bracket notation
    'dot-notation': ['error', { allowKeywords: true }],
  },
});
