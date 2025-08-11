import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // (18.3) Enforce consistent spacing on comments
    '@stylistic/spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          // space here to support sprockets directives, slash for TS /// comments
          markers: ['=', '!', '/'],
        },
        block: {
          exceptions: ['-', '+'],
          // space here to support sprockets directives and flow comment types
          markers: ['=', '!', ':', '::'],
          balanced: true,
        },
      },
    ],
  },
});
