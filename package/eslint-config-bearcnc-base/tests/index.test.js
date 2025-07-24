import { fileURLToPath } from 'url';
import path from 'path';
import { Linter } from './utils/linter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linter = new Linter({
  configFilePath: path.resolve(__dirname, '../index.js'),
  docPath: path.resolve(__dirname, '../doc/rules.md'),
  configType: 'es6',
  globalEslintConfig: [
    'no-var: "off"',
    '@stylistic/quotes: "off"',
    'func-names: "off"',
  ]
});

describe('ES6 Rules', () => {
  // Reference rules
  it("should lint expectedly for 'prefer-const'", async () => {
    await linter.checkRule('prefer-const');
  });

  it("should lint expectedly for 'no-const-assign'", async () => {
    await linter.checkRule('no-const-assign');
  });

  it("should lint expectedly for 'no-var'", async () => {
    await linter.checkRule('no-var', { ignoreGlobalConfig: true });
  });

  // Objects rules
  it("should lint expectedly for 'no-object-constructor'", async () => {
    await linter.checkRule('no-object-constructor');
  });

  it("should lint expectedly for 'object-shorthand'", async () => {
    await linter.checkRule('object-shorthand');
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

  // Destructuring rules
  it("should lint expectedly for 'prefer-destructuring'", async () => {
    await linter.checkRule('prefer-destructuring');
  });

  // Strings rules
  it("should lint expectedly for '@stylistic/quotes'", async () => {
    await linter.checkRule('@stylistic/quotes', { ignoreGlobalConfig: true });
  });

  it("should lint expectedly for 'prefer-template'", async () => {
    await linter.checkRule('prefer-template');
  });

  it("should lint expectedly for '@stylistic/template-curly-spacing'", async () => {
    await linter.checkRule('@stylistic/template-curly-spacing');
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

  it("should lint expectedly for 'prefer-rest-params'", async () => {
    await linter.checkRule('prefer-rest-params');
  });

  it("should lint expectedly for 'default-param-last'", async () => {
    await linter.checkRule('default-param-last');
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

  it("should lint expectedly for 'prefer-spread'", async () => {
    await linter.checkRule('prefer-spread');
  });

  it("should lint expectedly for '@stylistic/function-paren-newline'", async () => {
    await linter.checkRule('@stylistic/function-paren-newline');
  });

  // Arrow Functions rules
  it("should lint expectedly for 'prefer-arrow-callback'", async () => {
    await linter.checkRule('prefer-arrow-callback');
  });

  it("should lint expectedly for '@stylistic/arrow-spacing'", async () => {
    await linter.checkRule('@stylistic/arrow-spacing');
  });
  
  it("should lint expectedly for 'arrow-body-style'", async () => {
    await linter.checkRule('arrow-body-style');
  });

  it("should lint expectedly for '@stylistic/arrow-parens'", async () => {
    await linter.checkRule('@stylistic/arrow-parens');
  });

  it("should lint expectedly for '@stylistic/no-confusing-arrow'", async () => {
    await linter.checkRule('@stylistic/no-confusing-arrow');
  });

  it("should lint expectedly for '@stylistic/implicit-arrow-linebreak'", async () => {
    await linter.checkRule('@stylistic/implicit-arrow-linebreak');
  });
});
