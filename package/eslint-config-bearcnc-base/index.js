import { defineConfig  } from 'eslint/config';
import preEs6 from './rules/pre-es6/index.js';
import postEs6 from './rules/post-es6/index.js';

export default defineConfig([
  preEs6,
  postEs6,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  },
]);
