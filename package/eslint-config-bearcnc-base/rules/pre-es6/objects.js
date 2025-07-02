import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // Enforce the use of object literal instead of Object constructor
    'no-object-constructor': 'error',
  }
});
