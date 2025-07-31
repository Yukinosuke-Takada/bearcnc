import { defineConfig } from 'eslint/config';
import arrowFunctionsConfig from './arrow-functions.js';
import classesConfig from './classes.js';
import destructuring from './destructuring.js';
import functionsConfig from './functions.js';
import iteratorsGeneratorsConfig from './iterators-generators.js';
import modulesConfig from './modules.js';
import referencesConfig from './references.js';
import objectsConfig from './objects.js';
import stringsConfig from './strings.js';

export default defineConfig([
  arrowFunctionsConfig,
  classesConfig,
  destructuring,
  functionsConfig,
  iteratorsGeneratorsConfig,
  modulesConfig,
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
