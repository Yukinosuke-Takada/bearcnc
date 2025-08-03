import { defineConfig } from 'eslint/config';
import arraysConfig from './arrays.js';
import functionsConfig from './functions.js';
import hoistingConfig from './hoisting.js';
import iteratorsGeneratorsConfig from './iterators-generators.js';
import objectsConfig from './objects.js';
import propertiesConfig from './properties.js';
import stringsConfig from './strings.js';
import variablesConfig from './variables.js';

export default defineConfig([
  arraysConfig,
  functionsConfig,
  hoistingConfig,
  iteratorsGeneratorsConfig,
  objectsConfig,
  propertiesConfig,
  stringsConfig,
  variablesConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
    },
  },
]);
