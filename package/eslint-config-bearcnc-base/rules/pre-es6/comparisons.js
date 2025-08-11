import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (15.5) disallowing case declarations in `switch` statements
    'no-case-declarations': 'error',

    // (15.8) disallow mixed operators
    'no-mixed-operators': [
      'error',
      {
        // the list of arithmetic groups disallows mixing `%` and `**`
        // with other arithmetic operators.
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['/', '*'],
          ['&', '|', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!=='],
          ['&&', '||'],
        ],
        allowSamePrecedence: false,
      },
    ],

    // (15.6) disallow nested ternary expressions
    'no-nested-ternary': 'error',

    // (15.7) disallowing unnecessary ternary expressions
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // (15.1)` disallowing comparisons with `==` and `!=` operators
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },
});
