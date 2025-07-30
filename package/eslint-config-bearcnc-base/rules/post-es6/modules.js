import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';


export default defineConfig({
  plugins: {
    import: importPlugin,
  },
  rules: {
    // (10.1.1) disallow using AMD require and define
    'import/no-amd': 'error',

    // (10.4) disallow importing the same module multiple times
    'import/no-duplicates': 'error',

    // (10.1) disallow importing modules using CommonJS exports
    'import/no-import-module-exports': 'error',

    // (10.2) disallow using namespace imports (i.e. '*')
    'import/no-namespace': 'off',

    // disallow duplicate imports
    // replaced by `import/no-duplicates`
    'no-duplicate-imports': 'off',
  },
});
