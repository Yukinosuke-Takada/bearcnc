import { fileURLToPath } from 'url';
import path from 'path';
import Linter from './utils/linter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linter = new Linter({
  configFilePath: path.resolve(__dirname, '../legacy.js'),
  docPath: path.resolve(__dirname, '../doc/rules_legacy.md'),
  configType: 'es5',
  globalEslintConfig: [
    '@stylistic/quotes: "off"',
    'func-names: "off"',
  ]
});

describe('ES5 (legacy) Rules', () => {
  // Objects rules
  it("should lint expectedly for 'no-object-constructor'", async () => {
    await linter.checkRule('no-object-constructor');
  });

  it("should lint expectedly for '@stylistic/quote-props'", async () => {
    await linter.checkRule('@stylistic/quote-props');
  });

  it("should lint expectedly for 'no-prototype-builtins'", async () => {
    await linter.checkRule('no-prototype-builtins');
  });

  // Arrays rules
  it("should lint expectedly for 'no-array-constructor'", async () => {
    await linter.checkRule('no-array-constructor');
  });

  it("should lint expectedly for 'array-callback-return'", async () => {
    await linter.checkRule('array-callback-return');
  });

  // Strings rules
  it("should lint expectedly for '@stylistic/quotes'", async () => {
    await linter.checkRule('@stylistic/quotes', { ignoreGlobalConfig: true });
  });

  it("should lint expectedly for 'no-eval'", async () => {
    await linter.checkRule('no-eval');
  });

  it("should lint expectedly for 'no-useless-escape'", async () => {
    await linter.checkRule('no-useless-escape');
  });

  // Functions rules
  // it("should lint expectedly for 'func-style'", async () => {
  //   await linter.checkRule('func-style');
  // });

  it("should lint expectedly for 'func-names'", async () => {
    await linter.checkRule('func-names', { ignoreGlobalConfig: true });
  });

  it("should lint expectedly for '@stylistic/wrap-iife'", async () => {
    await linter.checkRule('@stylistic/wrap-iife');
  });

  it("should lint expectedly for 'no-inner-declarations'", async () => {
    await linter.checkRule('no-inner-declarations');
  });

  it("should lint expectedly for 'no-new-func'", async () => {
    await linter.checkRule('no-new-func');
  });

  it("should lint expectedly for '@stylistic/space-before-function-paren'", async () => {
    await linter.checkRule('@stylistic/space-before-function-paren');
  });

  it("should lint expectedly for '@stylistic/space-before-blocks'", async () => {
    await linter.checkRule('@stylistic/space-before-blocks');
  });

  it("should lint expectedly for 'no-param-reassign'", async () => {
    await linter.checkRule('no-param-reassign');
  });

  it("should lint expectedly for '@stylistic/function-paren-newline'", async () => {
    await linter.checkRule('@stylistic/function-paren-newline');
  });
});
