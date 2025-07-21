import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    // Enforce the consistency of function style
    'func-style': ['off', 'expression'],

    // (7.1.1) Enforce named function expressions instead of function declarations
    'func-names': 'warn',

    // Enforce the consistent wrapping of immediately invoked function expressions (IIFEs)
    '@stylistic/wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],
  
    // Disallow declaring functions in nested blocks on non-strict mode. (Pre-ES6)
    'no-inner-declarations': ['error', 'functions', { blockScopedFunctions: 'allow' }],
  }
});
