import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin'


export default defineConfig({
  plugins: {
    import: importPlugin,
    '@stylistic': stylistic,
  },
  rules: {
    // (10.8) enforce consistent object curly newlines
    '@stylistic/object-curly-newline': [
      'error',
      {
        ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
        ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      },
    ],

    // (10.10) disallow extensions in import paths
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      },
    ],

    // (10.7) enforce that all imports are at the top of the file
    'import/first': 'error',

    // (10.1.1) disallow using AMD require and define
    'import/no-amd': 'error',

    // (10.4) disallow importing the same module multiple times
    'import/no-duplicates': 'error',

    // (10.1) disallow importing modules using CommonJS exports
    'import/no-import-module-exports': 'error',

    // (10.5) disallow mutable exports
    'import/no-mutable-exports': 'error',

    // (10.2) disallow using namespace imports (i.e. '*')
    'import/no-namespace': 'off',

    // (10.9) disallow webpack loader syntax in imports
    'import/no-webpack-loader-syntax': 'error',

    // (10.6) enforce a default export if there is only one export
    'import/prefer-default-export': 'error',

    // disallow duplicate imports
    // replaced by `import/no-duplicates`
    'no-duplicate-imports': 'off',
  },
});
