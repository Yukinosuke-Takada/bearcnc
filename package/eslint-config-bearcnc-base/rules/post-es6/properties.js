import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    // (12.3) prefer exponentiation operator instead of Math.pow
    'prefer-exponentiation-operator': 'error',
  },
});
