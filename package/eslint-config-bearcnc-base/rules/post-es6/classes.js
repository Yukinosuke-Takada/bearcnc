import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (9.7) Enforce the use of static functions for class methods that do not use 'this'
    'class-methods-use-this': ['error'],

    // (9.6) Disallow duplicate class members
    'no-dupe-class-members': 'error',

    // (9.5) Disallow unnecessary constructors
    'no-useless-constructor': 'error',
  },
});
