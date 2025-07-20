import { defineConfig } from "eslint/config";
import referencesConfig from "./references.js";
import objectsConfig from "./objects.js";

export default defineConfig([
  referencesConfig,
  objectsConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]);
