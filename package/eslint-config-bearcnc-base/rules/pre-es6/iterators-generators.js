import { defineConfig } from 'eslint/config';

export default defineConfig({
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'Avoid using `for...in`. use Object.keys/values/entries instead.',
      },
      {
        selector: 'ForOfStatement',
        message: 'Avoid using `for...of`. use array methods instead.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Avoid using labels. they make code hard to follow.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is not allowed in strict mode.',
      },
    ],
  },
});
