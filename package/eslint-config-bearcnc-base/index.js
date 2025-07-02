import { defineConfig  } from "eslint/config";
import postEs6 from "./rules/post-es6";

export default defineConfig([
  postEs6,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  },
]);
