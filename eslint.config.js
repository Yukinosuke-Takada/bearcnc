import { defineConfig } from "eslint/config";
import markdown from "@eslint/markdown";

export default defineConfig([
  {
    plugins: {
      markdown,
    },
    extends: ["markdown/recommended"],
    rules: {
      "markdown/no-html": "error",
      "markdown/no-duplicate-headings": "error",
      "markdown/no-bare-urls": "error",
      "markdown/no-empty-definitions": ["error", { allowDefinitions: ["//"] }], // Allow comments
    },
  },
]);
