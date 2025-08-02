import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (13.1) disallow the use of undeclared variables
    'no-undef': 'error',
  },
});
