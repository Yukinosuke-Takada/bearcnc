import { defineConfig } from 'eslint/config';
import arrowFunctionsConfig from './arrow-functions.js';
import destructuring from './destructuring.js';
import functionsConfig from './functions.js';
import referencesConfig from './references.js';
import objectsConfig from './objects.js';
import stringsConfig from './strings.js';

export default defineConfig([
  arrowFunctionsConfig,
  destructuring,
  functionsConfig,
  referencesConfig,
  objectsConfig,
  stringsConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]);
