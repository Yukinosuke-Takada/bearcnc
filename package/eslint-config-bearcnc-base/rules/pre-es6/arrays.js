import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // Disallow the use of Array constructor
    'no-array-constructor': 'error',

    // Enforce the use of return statements in callbacks of array methods
    'array-callback-return': ['error', { allowImplicit: true }],
  }
});
