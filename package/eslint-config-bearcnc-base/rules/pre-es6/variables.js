import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (13.5) disallow chained variable assignments
    'no-multi-assign': ['error'],

    // (13.6) disallow the use of unary operators, ++ and --
    'no-plusplus': 'error',

    // (13.1) disallow the use of undeclared variables
    'no-undef': 'error',

    // (13.8) disallow unused variables
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    // (13.2) disallow one variable declaration
    'one-var': ['error', 'never'],
  },
});
