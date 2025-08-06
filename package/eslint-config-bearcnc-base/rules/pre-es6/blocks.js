import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    // (16.2) Enforce consistent brace style for blocks
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // (16.3) Disallow unnecessary else blocks
    'no-else-return': ['error', { allowElseIf: false }],

    // (16.1) Enforce the consistent location of single-line statements
    '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
  }
});
