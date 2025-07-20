import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    // Enforce the use of single quotes for strings
    '@stylistic/quotes': ['error', 'single', {
      avoidEscape: true,
    }],

    // Disallow the use of eval()
    'no-eval': 'error',

    // Disallow unnecessary escape characters
    'no-useless-escape': 'error',
  }
});
