import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    // (19.11) Disallow spacing in brackets
    '@stylistic/array-bracket-spacing': 'error',

    // (19.14) Enforce consistent spacing inside blocks
    '@stylistic/block-spacing': 'error',

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

    // (19.13) Enforce maximum line length
    '@stylistic/max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // (19.6) Enforce linebreaks on long chains of method calls
    '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

    // (19.9) Disallow multiple empty lines
    '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

    // (19.6.1) Disallow whitespace before properties
    '@stylistic/no-whitespace-before-property': 'error',

    // (19.12) Enforce spaces inside curly braces
    '@stylistic/object-curly-spacing': ['error', 'always'],

    // (19.8) Enforce consistent line breaks inside blocks
    '@stylistic/padded-blocks': [
      'error',
      {
        blocks: 'never',
        classes: 'never',
        switches: 'never',
      },
      {
        allowSingleLineBlocks: true,
      },
    ],

    // (19.7) Enforce line breaks between statements
    '@stylistic/padding-line-between-statements': 'off',

    // (19.2) Enforce consistent spacing before blocks
    '@stylistic/space-before-blocks': 'error',

    // (19.4) Enforce consistent spacing around infix operators
    '@stylistic/space-infix-ops': 'error',

    // (19.10) Disallow spaces in parentheses
    '@stylistic/space-in-parens': 'error',
  },
});
