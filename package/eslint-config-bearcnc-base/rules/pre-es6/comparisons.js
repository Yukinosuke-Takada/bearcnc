import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (15.5) disallowing case declarations in `switch` statements
    'no-case-declarations': 'error',

    // (15.1)` disallowing comparisons with `==` and `!=` operators
    'eqeqeq': ['error', 'always', { null: 'ignore' }],  
  }
});
