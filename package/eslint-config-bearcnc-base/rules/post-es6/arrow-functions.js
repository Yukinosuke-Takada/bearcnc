import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // (8.4) Enforce consistent use of parentheses in arrow function parameters
    '@stylistic/arrow-parens': ['error', 'always'],

    // (8.1.1) Enforce consistent spacing before and after arrow function's arrow
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],

    // (8.6) Enforce consistent line breaks after the arrow in arrow functions
    '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

    // (8.5) Disallow arrow functions where they could be confused with comparisons
    '@stylistic/no-confusing-arrow': ['error', {
      allowParens: true,
    }],
    
    // (8.2) Enforce consistent style for arrow functions
    'arrow-body-style': ['error', 'as-needed', {
      requireReturnForObjectLiteral: false,
    }],
    
    // (8.1) Enforce arrow functions in callbacks if possible
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],
  },
});
