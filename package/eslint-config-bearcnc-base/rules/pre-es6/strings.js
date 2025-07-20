import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    '@stylistic/quotes': ['error', 'single', {
      avoidEscape: true,
    }]
  }
});
