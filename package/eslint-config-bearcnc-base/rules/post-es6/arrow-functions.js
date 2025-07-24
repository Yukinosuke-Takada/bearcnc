import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // (8.2) Enforce consistent spacing before and after arrow function's arrow
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
    
    // (8.1) Enforce arrow functions in callbacks if possible
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],
  },
});
