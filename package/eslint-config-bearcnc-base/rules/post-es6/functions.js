import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  // plugins: {
  //   '@stylistic': stylistic
  // },
  rules: {
    // (7.9) Enforce default parameters to be last
    'default-param-last': 'error',

    // (7.6) Enforce the use of rest parameters instead of arguments
    'prefer-rest-params': 'error',

    // (7.14) Enforce the use of spread syntax instead of .apply()
    'prefer-spread': 'error',
  }
});
