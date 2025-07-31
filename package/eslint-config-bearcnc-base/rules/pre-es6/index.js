import { defineConfig } from 'eslint/config';
import arraysConfig from './arrays.js';
import functionsConfig from './functions.js';
import iteratorsGeneratorsConfig from './iterators-generators.js';
import objectsConfig from './objects.js';
import propertiesConfig from './properties.js';
import stringsConfig from './strings.js';

export default defineConfig([
  arraysConfig,
  functionsConfig,
  iteratorsGeneratorsConfig,
  objectsConfig,
  propertiesConfig,
  stringsConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
    },
  },
]);
