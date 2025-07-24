# Changes From Airbnb

Bearcnc is a rewrite of [airbnb/javascript](https://github.com/airbnb/javascript) to support changes especially [ESLint V9](https://eslint.org/blog/2024/04/eslint-v9.0.0-released/). It still follows the [Airbnb Guideline](https://airbnb.io/javascript/).

## Major Changes

- Supported ESLint version change. (Peer Dependency!)
  Above `7.32.0` or Above `8.2.0` → Above `8.57.0` or Above `9.0.0` 
  This is due to [Flat config system](https://eslint.org/blog/2022/08/new-config-system-part-2/) added in V9 later backported to V8.57
- Supported [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) version change. (Peer Dependency!)
  Above `2.25.0` → Above `2.31.0`
  This is due to versions prior to `2.31.0` not supporting ESLint V9.
- Supported Node version change.
  Above `10.12.0` or Later versions after `12.0.0` → Above `18.18.0` or Later versions after `20.0.0`
  This is due to ESLint V9 only supporting the latter versions.
  **Note:** Node only required for development environment. Your code can still target like ES5.
- Package rename.
  `javascript` → `bearcnc` (The mono-repo that contains all the package)
  `eslint-config-airbnb-base` → `eslint-config-bearcnc-base`
  `eslint-config-airbnb` → `eslint-config-bearcnc-react` (The naming makes more sense)

## Minor Changes

- Moved documentation regarding the rules to their respected package directory.

## Technical Changes (Things end-user won't be effected)

### Root Project

- Linting & Formatting.
  Uses ESLint to lint .md files. Added Prettier.

### Individual Project

#### Base

- Removed following code:
  ```js
  // don't know why this is necessary. looks like it was needed during eslint V2
  			'jsx': true,
        'generators': false,
        'objectLiteralDuplicateProperties': false
  ```

  [original commit](https://github.com/airbnb/javascript/commit/75807b9d5ead326be45f4719d81bda52d2bbb32a)

- Changes to rules inclusion in configs.
  - [`default-param-last`](https://eslint.org/docs/latest/rules/default-param-last): `es5`, `es6` → `es6`. Since default parameters don't exist in es5.

- Changed Rules due to deprecation:
  - [`no-new-object`](https://eslint.org/docs/latest/rules/no-new-object) → [`no-object-constructor`](https://eslint.org/docs/latest/rules/no-object-constructor)
  - [`quote-props`](https://eslint.org/docs/latest/rules/quote-props) → [`@stylistic/quote-props`](https://eslint.style/rules/quote-props)
  -  [`quotes`](https://eslint.org/docs/latest/rules/no-new-object) → [`@stylistic/quotes`](https://eslint.style/rules/quote-props)
  - [`template-curly-spacing`](https://eslint.org/docs/latest/rules/template-curly-spacing) → [`@stylistic/template-curly-spacing`](https://eslint.style/rules/template-curly-spacing)
-  [`wrap-iife`](https://eslint.org/docs/latest/rules/wrap-iife) → [`@stylistic/wrap-iife`](https://eslint.style/rules/wrap-iife)

- Changes to Rules due to new options:
  - [`no-inner-declarations`](https://eslint.org/docs/latest/rules/no-inner-declarations): considering the reasoning of the rule, it is set to: `no-inner-declarations: ["error", "functions", { blockScopedFunctions: "allow" }]`

- Typo(?)
  - On section 7.1, it was rule [`no-loop-func`](https://eslint.org/docs/latest/rules/no-loop-func) but [`no-inner-declarations`](https://eslint.org/docs/latest/rules/no-inner-declarations) makes more sense.
