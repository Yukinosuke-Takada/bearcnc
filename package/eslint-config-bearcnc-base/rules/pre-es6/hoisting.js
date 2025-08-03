import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (14.5) Disallow the use of variables before they are defined
    'no-use-before-define': ['error', { functions: true, classes: true, variables: true }],
  },
});
