import bearcncBase from "./package/eslint-config-bearcnc-base/index.js";
import { defineConfig } from "eslint/config";
import markdown from "@eslint/markdown";

export default defineConfig([
  bearcncBase,
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
