import { defineConfig } from "eslint/config";
import destructuring from "./destructuring.js";
import referencesConfig from "./references.js";
import objectsConfig from "./objects.js";

export default defineConfig([
  destructuring,
  referencesConfig,
  objectsConfig,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]);
