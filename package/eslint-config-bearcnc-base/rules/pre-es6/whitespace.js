import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // (19.5) Enforce newline at the end of files
    '@stylistic/eol-last': 'error',

    // (19.1) Enforce consistent indentation
    '@stylistic/indent': [
      'error',
      2,
      {
        // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        flatTernaryExpressions: false,
      },
    ],

    // (19.3) Enforce consistent spacing before and after keywords
    '@stylistic/keyword-spacing': 'error',

    // (19.2) Enforce consistent spacing before blocks
    '@stylistic/space-before-blocks': 'error',

    // (19.4) Enforce consistent spacing around infix operators
    '@stylistic/space-infix-ops': 'error',
  },
});
