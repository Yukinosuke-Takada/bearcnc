import { fileURLToPath } from 'url';
import path from "path";
import { Linter } from './utils/linter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linter = new Linter(path.resolve(__dirname, "../index.js"), "es6");

describe("ES6 Rules", () => {
  it("should have expected result for 'prefer-const'", async () => {
    await linter.checkRule("prefer-const");
  });

  it("should have expected result for 'no-const-assign'", async () => {
    await linter.checkRule("no-const-assign");
  });

  it("should have expected result for 'no-var'", async () => {
    await linter.checkRule("no-var");
  });

  it("should have expected result for 'no-object-constructor'", async () => {
    await linter.checkRule("no-object-constructor");
  });
});
