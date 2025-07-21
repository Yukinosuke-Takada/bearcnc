import { defineConfig } from 'eslint/config';
import arraysConfig from './arrays.js';
import functionsConfig from './functions.js';
import objectsConfig from './objects.js';
import stringsConfig from './strings.js';

export default defineConfig([
  arraysConfig,
  functionsConfig,
  objectsConfig,
  stringsConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
    },
  },
]);
