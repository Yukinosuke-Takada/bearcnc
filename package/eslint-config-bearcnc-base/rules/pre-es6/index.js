import { defineConfig } from 'eslint/config';
import arraysConfig from './arrays.js';
import objectsConfig from './objects.js';
import stringsConfig from './strings.js';

export default defineConfig([
  arraysConfig,
  objectsConfig,
  stringsConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
    },
  },
]);
