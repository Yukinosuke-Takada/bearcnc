import { defineConfig } from "eslint/config";
import arraysConfig from './arrays.js';
import objectsConfig from './objects.js';

export default defineConfig([
  arraysConfig,
  objectsConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
    },
  },
]);
