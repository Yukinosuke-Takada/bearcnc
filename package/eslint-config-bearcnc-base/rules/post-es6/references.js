import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // Enforce the use of let or const instead of var
    'no-var': 'error',
  
    // Enforce the use of const for variables that are never reassigned
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
    }],
  }
});
