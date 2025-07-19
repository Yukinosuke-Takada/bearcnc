import { defineConfig } from "eslint/config";
import objects from "./objects.js";

export default defineConfig({
  languageOptions: {
    ecmaVersion: 5,
  },
  rules: {
    ...objects[0].rules,
  }
});
