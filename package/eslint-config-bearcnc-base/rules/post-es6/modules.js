import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';


export default defineConfig({
  plugins: {
    import: importPlugin,
  },
  rules: {
    // (10.1.1) disallow using AMD require and define
    'import/no-amd': 'error',

    // (10.1) disallow importing modules using CommonJS exports
    'import/no-import-module-exports': 'error',
  },
});
