import { defineConfig } from "eslint/config";
import referencesConfig from "./references.js";

export default defineConfig({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    ...referencesConfig[0].rules,
  }
});
