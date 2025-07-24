import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  // plugins: {
  //   '@stylistic': stylistic
  // },
  rules: {
    // (7.6) Enforce the use of rest parameters instead of arguments
    'prefer-rest-params': 'error',
  }
});
