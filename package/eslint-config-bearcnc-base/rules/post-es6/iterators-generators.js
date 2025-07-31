import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    // (11.3) Enforce consistent spacing for generator functions
    '@stylistic/generator-star-spacing': ['error', { before: false, after: true }],
  }
});
