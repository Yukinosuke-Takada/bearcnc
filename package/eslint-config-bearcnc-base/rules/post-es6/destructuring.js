import { defineConfig } from "eslint/config";

export default defineConfig({
  rules: {
    // Prefer destructuring over accessing properties
    'prefer-destructuring': ['error', {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: true,
        object: false,
      },
    }, {
      enforceForRenamedProperties: false,
    }],
  }
});
