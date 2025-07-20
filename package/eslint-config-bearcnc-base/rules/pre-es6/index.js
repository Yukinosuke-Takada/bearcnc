import { defineConfig } from "eslint/config";
import objectsConfig from './objects.js';

export default defineConfig([
  objectsConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
    },
  },
]);
