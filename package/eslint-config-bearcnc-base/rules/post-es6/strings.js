import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    // Enforce using template literals instead of string concatenation
    'prefer-template': 'error',

    // Enforce consistent spacing inside template literals
    '@stylistic/template-curly-spacing': 'error',
  }
});
