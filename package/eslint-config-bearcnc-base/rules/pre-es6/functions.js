import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // (7.1) Enforce the consistency of function style
    'func-style': ['off', 'expression'],

    // (7.1.1) Enforce named function expressions instead of function declarations
    'func-names': 'warn',

    // (7.15) Enforce consistent line breaks inside function parentheses
    '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],

    // (7.11.1) Enforce consistent spacing before blocks
    '@stylistic/space-before-blocks': 'error',

    // (7.11) Enforce consistent spacing before function parentheses
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
        catch: 'always',
      },
    ],

    // (7.2) Enforce the consistent wrapping of immediately invoked function expressions (IIFEs)
    '@stylistic/wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],

    // (7.3) Disallow declaring functions in nested blocks on non-strict mode. (Pre-ES6)
    'no-inner-declarations': ['error', 'functions', { blockScopedFunctions: 'allow' }],

    // (7.10) Disallow the use of the Function constructor
    'no-new-func': 'error',

    // (7.12, 7.13) Disallow reassigning function parameters
    // Copied config from https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'context', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
        ],
      },
    ],
  },
});
