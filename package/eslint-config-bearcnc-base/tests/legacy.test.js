import { fileURLToPath } from 'url';
import path from "path";
import { Linter } from './utils/linter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linter = new Linter(path.resolve(__dirname, "../legacy.js"), path.resolve(__dirname, "../doc/rules_legacy.md"),"es5");

describe("ES5 (legacy) Rules", () => {
  // Objects rules
  it("should lint expectedly for 'no-object-constructor'", async () => {
    await linter.checkRule("no-object-constructor");
  });

  it("should lint expectedly for '@stylistic/quote-props'", async () => {
    await linter.checkRule("@stylistic/quote-props");
  });

  it("should lint expectedly for 'no-prototype-builtins'", async () => {
    await linter.checkRule("no-prototype-builtins");
  });

  // Arrays rules
  it("should lint expectedly for 'no-array-constructor'", async () => {
    await linter.checkRule("no-array-constructor");
  });

  it("should lint expectedly for 'array-callback-return'", async () => {
    await linter.checkRule("array-callback-return");
  });
});
