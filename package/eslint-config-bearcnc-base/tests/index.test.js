import { fileURLToPath } from 'url';
import path from "path";
import { Linter } from './utils/linter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linter = new Linter(path.resolve(__dirname, "../index.js"), path.resolve(__dirname, "../doc/rules.md"), "es6");

describe("ES6 Rules", () => {
  it("should lint expectedly for 'prefer-const'", async () => {
    await linter.checkRule("prefer-const");
  });

  it("should lint expectedly for 'no-const-assign'", async () => {
    await linter.checkRule("no-const-assign");
  });

  it("should lint expectedly for 'no-var'", async () => {
    await linter.checkRule("no-var");
  });

  it("should lint expectedly for 'no-object-constructor'", async () => {
    await linter.checkRule("no-object-constructor");
  });

  it("should lint expectedly for 'object-shorthand'", async () => {
    await linter.checkRule("object-shorthand");
  });
});
