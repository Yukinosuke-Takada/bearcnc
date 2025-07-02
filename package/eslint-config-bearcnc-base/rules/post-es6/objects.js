import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // Enforce consistent use of object literal shorthand syntax
    'object-shorthand': ['error', 'always', {
      ignoreConstructors: false,
      avoidQuotes: true,
    }],
  }
});
