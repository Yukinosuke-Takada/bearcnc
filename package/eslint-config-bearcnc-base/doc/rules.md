# Rules

## Table of contents

- [Rules](#rules)
  - [Table of contents](#table-of-contents)
  - [See also](#see-also)
  - [References](#references)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Destructuring](#destructuring)
  - [Strings](#strings)
  - [Functions](#functions)
  - [Arrow Functions](#arrow-functions)
  - [Classes \& Constructors](#classes--constructors)
  - [Modules](#modules)

## See also

This doc was created by referencing the following material:

- Structure, Explanation: [Airbnb JS style guide](https://airbnb.io/javascript/#the-javascript-style-guide-guide), [Airbnb JS style guide (github)](https://github.com/airbnb/javascript)
- Sample Code (ESLint): [ESLint docs](https://eslint.org/docs/latest/rules)
- Sample Code (ESLint Stylistic): [ESLint Stylistic docs](https://eslint.style/rules)
- Sample Code (eslint-plugin-import): [eslint-plugin-import (github)](https://github.com/import-js/eslint-plugin-import/tree/main)

## References

- 2.1 Use `const` for all of your references; avoid using `var`. eslint: [`prefer-const`](https://eslint.org/docs/latest/rules/prefer-const)

  **Availability:** `es6`

  > Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.

  Bad:

  [//]: # (expectedErrors: 5)

  ```js
  // it's initialized and never reassigned.
  let a = 3;
  console.log(a);
  
  let b;
  b = 0;
  console.log(b);
  
  class C {
      static {
          let a;
          a = 0;
          console.log(a);
      }
  }
  
  // `i` is redefined (not reassigned) on each loop step.
  for (let i in [1, 2, 3]) {
      console.log(i);
  }
  
  // `a` is redefined (not reassigned) on each loop step.
  for (let a of [1, 2, 3]) {
      console.log(a);
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // using const.
  const a = 0;
  
  // it's never initialized.
  let b;
  console.log(b);
  
  // it's reassigned after initialized.
  let c;
  c = 0;
  c = 1;
  console.log(c);
  
  // it's initialized in a different block from the declaration.
  let d;
  if (true) {
      d = 0;
  }
  console.log(d);
  
  // it's initialized in a different scope.
  let e;
  class C {
      #x;
      static {
          e = (obj) => obj.#x;
      }
  }
  
  // it's initialized at a place that we cannot write a variable declaration.
  let f;
  if (true) f = 0;
  console.log(f);
  
  // `i` gets a new binding each iteration
  for (const i in [1, 2, 3]) {
    console.log(i);
  }
  
  // `a` gets a new binding each iteration
  for (const a of [1, 2, 3]) {
    console.log(a);
  }
  
  // `end` is never reassigned, but we cannot separate the declarations without modifying the scope.
  for (let i = 0, end = 10; i < end; ++i) {
      console.log(i);
  }
  
  // `predicate` is only assigned once but cannot be separately declared as `const`
  let predicate;
  [object.type, predicate] = foo();
  
  // `g` is only assigned once but cannot be separately declared as `const`
  let g;
  const h = {};
  ({ g, c: h.c } = func());
  
  // suggest to use `no-var` rule.
  var i = 3;
  console.log(i);
  ```

  **destructuring**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
  a = a + 1;
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // using const.
  const {a: a0, b} = obj;
  const a = a0 + 1;
  
  // all variables are reassigned.
  let {c, d} = obj;
  c = c + 1;
  d = d + 1;
  ```

  **ignoreReadBeforeAssign**
  Good:

  [//]: # (expectedErrors: 0)

  ```js
  let timer;
  function initialize() {
      if (foo()) {
          clearInterval(timer);
      }
  }
  timer = setInterval(initialize, 100);
  ```

- 2.1.1 eslint: [`no-const-assign`](https://eslint.org/docs/latest/rules/no-const-assign)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const a = 0;
  a = 1;
  ```
  
  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const a = 0;
  a += 1;
  ```

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const a = 0;
  ++a;
  ```
  
  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  if (foo) {
    using a = getSomething();
    a = somethingElse;
  }
  
  if (bar) {
    await using a = getSomething();
    a = somethingElse;
  }
  ```
  
  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const a = 0;
  console.log(a);
  ```
  
  Good:

  [//]: # (expectedErrors: 0)

  ```js
  if (foo) {
    using a = getSomething();
    a.execute();
  }
  
  if (bar) {
    await using a = getSomething();
    a.execute();
  }
  ```
  
  Good:

  [//]: # (expectedErrors: 0)

  ```js
  for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
      console.log(a);
  }
  ```
  
  Good:

  [//]: # (expectedErrors: 0)

  ```js
  for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
      console.log(a);
  }
  ```
  
- 2.2 If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](https://eslint.org/docs/latest/rules/no-var)

  **Availability:** `es6`, ("off" for `es5`)

  Bad:

  [//]: # (expectedErrors: 2, eslint: '@stylistic/quotes: "off"')

  ```js
  var x = "y";
  var CONFIG = {};
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'prefer-const: "off", @stylistic/quotes: "off"')

  ```js
  let x = "y";
  const CONFIG = {};
  ```

- 2.3 Note that both `let` and `const` are block-scoped.

  ```js
  // const and let only exist in the blocks they are defined in.
  {
    let a = 1;
    const b = 1;
  }
  console.log(a); // ReferenceError
  console.log(b); // ReferenceError
  ```

## Objects

- 3.1 Use the literal syntax for object creation. eslint: [`no-object-constructor`](https://eslint.org/docs/latest/rules/no-object-constructor)

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`no-new-object`](https://eslint.org/docs/latest/rules/no-new-object) but was deprecated as of V8.50.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  Object();
  
  new Object();
  ```
  
  Good:

  [//]: # (expectedErrors: 0)

  ```js
  Object("foo");
  
  const obj = { a: 1, b: 2 };
  
  const isObject = (value) => value === Object(value);
  
  const createObject = (Object) => new Object();
  ```

- 3.2 Use computed property names when creating objects with dynamic property names.

  > Why? They allow you to define all the properties of an object in one place.

  Bad:

  ```js
  function getKey(k) {
    return `a key named ${k}`;
  }
  
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;
  ```

  Good:

  ```js
  function getKey(k) {
    return `a key named ${k}`;
  }
  
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
  };
  ```

- 3.3, 3.4 Use object property, method shorthand. eslint: [`object-shorthand`](https://eslint.org/docs/latest/rules/object-shorthand)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 5)

  ```js
  // properties
  const foo = {
      x: x,
      y: y,
      z: z,
  };
  
  // methods
  const bar = {
      a: function () {},
      b: function () {}
  };
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // properties
  const foo = {x, y, z};
  
  // methods
  const bar = {
      a() {},
      b() {}
  };
  ```

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  const foo = {
      w: function () {},
      x: function *() {},
      [y]: function () {},
      z: z
  };
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const foo = {
      w() {},
      *x() {},
      [y]() {},
      z
  };
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const foo = {
      x: (y) => y
  };
  ```

  **avoidQuotes**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const foo = {
      "bar-baz"() {}
  };
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: '@stylistic/quote-props: "off"')

  ```js
  const foo = {
      "bar-baz": function () {},
      "qux": qux
  };
  ```

  **ignoreConstructors**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const foo = {
      ConstructorFunction: function () {}
  };
  ```

- 3.5 Group your shorthand properties at the beginning of your object declaration.

  > Why? It’s easier to tell which properties are using the shorthand.

  Bad:

  ```js
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';
  
  const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
  };
  ```

  Good:

  ```js
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';
  
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

- 3.6 Only quote properties that are invalid identifiers. eslint: [`@stylistic/quote-props`](https://eslint.style/rules/quote-props)

  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`quote-props`](https://eslint.org/docs/latest/rules/quote-props) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  var object = {
      "a": 0,
      "0": 0,
      "true": 0,
      "null": 0
  };
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var object1 = {
      "a-b": 0,
      "0x0": 0,
      "1e2": 0
  };

  var object2 = {
      foo: 'bar',
      baz: 42,
      true: 0,
      0: 0,
      'qux-lorem': true
  };

  var object3 = {
      foo() {
          return;
      }
  };
  ```

  **keywords**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var x = {
      while: 1,
      volatile: "foo"
  };
  ```

  **numbers**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var x = {
    100: 1
  }
  ```

- 3.7 Do not call Object.prototype methods directly, such as hasOwnProperty, propertyIsEnumerable, and isPrototypeOf. eslint: [`no-prototype-builtins`](https://eslint.org/docs/latest/rules/no-prototype-builtins)

  > Why? These methods may be shadowed by properties on the object in question - consider { hasOwnProperty: false } - or, the object may be a null object (Object.create(null)).

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 3)

  ```js
  const hasBarProperty = foo.hasOwnProperty("bar");

  const isPrototypeOfBar = foo.isPrototypeOf(bar);

  const barIsEnumerable = foo.propertyIsEnumerable("bar");
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

  const isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

  const barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
  ```

- 3.8 Prefer the object spread operator over Object.assign to shallow-copy objects. Use the object rest operator to get a new object with certain properties omitted.

  Bad:

  ```js
  const original = { a: 1, b: 2 };
  const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
  delete copy.a; // so does this
  ```

  Bad:

  ```js
  const original = { a: 1, b: 2 };
  const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
  ```

  Good:

  ```js
  const original = { a: 1, b: 2 };
  const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
  
  const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

## Arrays

- 4.1 Use the literal syntax for array creation. eslint: [`no-array-constructor`](https://eslint.org/docs/latest/rules/no-array-constructor)

  > Why?

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  Array();

  Array(0, 1, 2);

  new Array(0, 1, 2);

  Array(...args);
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  Array(500);

  new Array(someOtherArray.length);

  [0, 1, 2];

  const createArray = (Array) => new Array();
  ```

- 4.2 Use [Array#push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

  Bad:

  ```js
  const someStack = [];
  
  someStack[someStack.length] = 'abracadabra';
  ```

  Good:

  ```js
  const someStack = [];
  
  someStack.push('abracadabra');
  ```



- 4.3 Use array spreads ... to copy arrays.

  Bad:

  ```js
  const len = items.length;
  const itemsCopy = [];

  let i;

  for (i = 0; i < len; i+= 1) {
    itemsCopy[i] = items[i];
  }
  ```

  Good:

  ```js
  const itemsCopy = [...items];
  ```

- 4.4 To convert an array-like object to an array, use spreads ... instead of [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

  Good:

  ```js
  const foo = document.querySelectorAll('.foo');

  const nodes = Array.from(foo);
  ```

  Good:

  ```js
  const foo = document.querySelectorAll('.foo');

  const nodes = [...foo];
  ```

- 4.5 Use [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) instead of spread ... for mapping over iterables, because it avoids creating an intermediate array.

  Bad:

  ```js
  const baz = [...foo].map(bar);
  ```

  Good:

  ```js
  const baz = Array.from(foo, bar);
  ```

- 4.6 Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following 8.2. eslint: [`array-callback-return`](https://eslint.org/docs/latest/rules/array-callback-return)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 2, eslint: 'no-param-reassign: "off", prefer-arrow-callback: "off"')

  ```js
  const indexMap = myArray.reduce(function (memo, item, index) {
      memo[item] = index;
  }, {});

  const foo = Array.from(nodes, function (node) {
      if (node.tagName === "DIV") {
          return true;
      }
  });
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-param-reassign: "off", prefer-arrow-callback: "off"')

  ```js
  const indexMap = myArray.reduce(function (memo, item, index) {
      memo[item] = index;
      return memo;
  }, {});

  const foo = Array.from(nodes, function (node) {
      if (node.tagName === "DIV") {
          return true;
      }
      return false;
  });

  const bar = foo.map((node) => node.getAttribute("id"));
  ```

  **allowImplicit**

  Good:

  [//]: # (expectedErrors: 0, eslint: 'prefer-arrow-callback: "off"')

  ```js
  const undefAllTheThings = myArray.map(function (item) {
      return;
  });
  ```

- 4.7 Use line breaks after open and before close array brackets if an array has multiple lines

  Bad:

  ```js
  const arr = [
    [0, 1], [2, 3], [4, 5],
  ];
  
  const objectInArray = [{
    id: 1,
  }, {
    id: 2,
  }];
  
  const numberInArray = [
    1, 2,
  ];
  ```

  Good:

  ```js
  const arr = [[0, 1], [2, 3], [4, 5]];
  
  const objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];
  
  const numberInArray = [
    1,
    2,
  ];
  ```


## Destructuring

- 5.1, 5.2 Use object destructuring when accessing and using multiple properties of an object. eslint: [`prefer-destructuring`](https://eslint.org/docs/latest/rules/prefer-destructuring)

  > Why? Destructuring saves you from creating temporary references for those properties.

  **Availability:** `es6`

  **VariableDeclarator**

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  // Objects
  const qux = object.qux;
  const quux = object['quux'];
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // Arrays
  const foo = array[0];
  const arr = array[someIndex];

  const [ foo2 ] = array;

  // Objects
  const { baz } = object;

  const obj = object.bar;
  ```

  **AssignmentExpression**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  // Arrays
  bar.baz = array[0];
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'prefer-const: "off"')

  ```js
  // Arrays
  [foo.baz] = array;

  // Objects
  let bar;
  ({ bar } = object);

  let baz;
  baz = object.bar
  ```

  **enforceForRenamedProperties**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const foo = object.bar;

  const { bar: baz } = object;
  ```

- 5.3 Use object destructuring for multiple return values, not array destructuring.

  > Why? You can add new properties over time or change the order of things without breaking call sites.

  Bad:

  ```js
  function processInput(input) {
    // then a miracle occurs
    return [left, right, top, bottom];
  }
  
  // the caller needs to think about the order of return data
  const [left, __, top] = processInput(input);
  ```

  Good:
  ```js
  function processInput(input) {
    // then a miracle occurs
    return { left, right, top, bottom };
  }
  
  // the caller selects only the data they need
  const { left, top } = processInput(input);
  ```

## Strings

- 6.1 Use single quotes '' for strings. eslint: [`@stylistic/quotes`](https://eslint.style/rules/quotes)

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`quotes`](https://eslint.org/docs/latest/rules/quotes) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 2, eslint: 'no-var: "off"')

  ```js
  var double = "double";
  var backtick = `backtick`;
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-var: "off"')

  ```js
  var single = 'single';
  var backtick = `back${x}tick`; // backticks are allowed due to substitution
  ```

  **avoidEscape**

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-var: "off"')

  ```js
  var double = "a string containing 'single' quotes";
  ```

- 6.2 Strings that cause the line to go over 100 characters should not be written across multiple lines using string concatenation.

  > Why? Broken strings are painful to work with and make code less searchable.

  Bad:

  ```js
  const errorMessage = 'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.';

  const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';
  ```

  Good:

  ```js
  const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
  ```

- 6.3 When programmatically building up strings, use template strings instead of concatenation. eslint: [`prefer-template`](https://eslint.org/docs/latest/rules/prefer-template)

  > Why?

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  const str = "Hello, " + name + "!";
  const str1 = "Time: " + (12 * 60 * 60 * 1000);
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const str = "Hello World!";
  const str1 = `Hello, ${name}!`;
  const str2 = `Time: ${12 * 60 * 60 * 1000}`;

  // This is reported by `no-useless-concat`.
  const str4 = "Hello, " + "World!";
  ```

- 6.3.1 eslint: [`@stylistic/template-curly-spacing`](https://eslint.style/rules/template-curly-spacing)

  **Availability:** `es6`

  **Note:** Originally it was eslint: [`template-curly-spacing`](https://eslint.org/docs/latest/rules/template-curly-spacing) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  `hello, ${ people.name}!`;
  `hello, ${people.name }!`;
  
  `hello, ${ people.name }!`;
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  `hello, ${people.name}!`;
  
  `hello, ${
      people.name
  }!`;
  ```


- 6.4 Never use eval() on a string, it opens too many vulnerabilities. eslint: [`no-eval`](https://eslint.org/docs/latest/rules/no-eval)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 3, eslint: 'prefer-template: "off"')

  ```js
  const obj = { x: "foo" },
      key = "x",
      value = eval("obj." + key);
  
  (0, eval)("const a = 0");
  
  const foo = eval;
  foo("const a = 0");
  
  // This `this` is the global object.
  this.eval("const a = 0");
  ```

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  /*global window*/
  
  window.eval("const a = 0");
  ```

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  /*global global*/
  
  global.eval("const a = 0");
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'class-methods-use-this: "off"')

  ```js
  const obj = { x: "foo" },
      key = "x",
      value = obj[key];
  
  class A {
      foo() {
          // This is a user-defined method.
          this.eval("const a = 0");
      }
  
      eval() {
      }
  
      static {
          // This is a user-defined static method.
          this.eval("const a = 0");
      }
  
      static eval() {
      }
  }
  ```


- 6.5 Do not unnecessarily escape characters in strings. eslint: [`no-useless-escape`](https://eslint.org/docs/latest/rules/no-useless-escape)

  > Why? Backslashes harm readability, thus they should only be present when necessary.

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 12)

  ```js
  "\'";
  '\"';
  "\#";
  "\e";
  `\"`;
  `\"${foo}\"`;
  `\#{foo}`;
  /\!/;
  /\@/;
  /[\[]/;
  /[a-z\-]/;
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  "\"";
  '\'';
  "\x12";
  "\u00a9";
  "xs\u2111";
  `\``;
  `\${${foo}}`;
  `$\{${foo}}`;
  /\\/g;
  /\t/g;
  /\w\$\*\^\./;
  /[[]/;
  /[\]]/;
  /[a-z-]/;
  ```

## Functions

- 7.1 Use named function expressions instead of function declarations. eslint: [`func-style`](https://eslint.org/docs/latest/rules/func-style)

  > Why? Function declarations are hoisted, which means that it’s easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function’s definition is large or complex enough that it is interfering with understanding the rest of the file, then perhaps it’s time to extract it to its own module! Don’t forget to explicitly name the expression, regardless of whether or not the name is inferred from the containing variable (which is often the case in modern browsers or when using compilers such as Babel). This eliminates any assumptions made about the Error’s call stack. ([Discussion](https://github.com/airbnb/javascript/issues/794))

  **Availability:** `es5`, `es6`

  **Note:** The rule is currently disabled.

  Bad:

  ```js
  function foo() {
    // ...
  }

  const foo = function () {
    // ...
  };
  ```

  Good:

  ```js
  const short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
  };
  ```

- 7.1.1 eslint: [`func-names`](https://eslint.org/docs/latest/rules/func-names)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 4, eslint: 'object-shorthand: "off"')

  ```js
  Foo.prototype.bar = function () {};

  const cat = {
    meow: function () {}
  }

  (function () {
      // ...
  }())

  export default function () {}
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  Foo.prototype.bar = function bar() {};

  const cat = {
    meow() {}
  }

  (function bar() {
      // ...
  }())

  export default function foo() {}
  ```

- 7.2 Wrap immediately invoked function expressions in parentheses. eslint: [`@stylistic/wrap-iife`](https://eslint.style/rules/wrap-iife)

  > Why? An immediately invoked function expression is a single unit - wrapping both it, and its invocation parens, in parens, cleanly expresses this. Note that in a world with modules everywhere, you almost never need an IIFE.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`wrap-iife`](https://eslint.org/docs/latest/rules/wrap-iife) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  var x = function () { return { y: 1 };}(); // unwrapped
  var x = (function () { return { y: 1 };})(); // wrapped function expression
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var x = (function () { return { y: 1 };}()); // wrapped call expression
  ```

- 7.3 Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears. eslint: [`no-inner-declarations`](https://eslint.org/docs/latest/rules/no-inner-declarations)

  **Availability:** `es5`, `es6`

  **Note1** ESLint v9 provided new option [doc](https://eslint.org/docs/latest/use/migrate-to-9.0.0#-no-inner-declarations-has-a-new-default-behavior-with-a-new-option). On migrating, it should be `/*eslint no-inner-declarations: ["error", "functions", { blockScopedFunctions: "disallow" }]*/` However, based on the reasoning of the rule (above), `/*eslint no-inner-declarations: ["error", "functions", { blockScopedFunctions: "allow" }]*/` is appropriate.

  **Note2** Due to the reasons mentioned in Note 1, linting behaves differently for ES5 and ES6+. Please check the documentation for other related rules as well.

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  if (test) {
      function doSomething() { }
  }

  function doSomethingElse() {
      if (test) {
          function doAnotherThing() { }
      }
  }

  class Some {
      static {
          if (test) {
              function doSomething() { }
          }
      }
  }

  const C = class {
      static {
          if (test) {
              function doSomething() { }
          }
      }
  }
  ```

- 7.4 Note: ECMA-262 defines a block as a list of statements. A function declaration is not a statement.

  Bad:

  ```js
  if (currentUser) {
    function test() {
      console.log('Nope.');
    }
  }
  ```

  Good:

  ```js
  let test;
  if (currentUser) {
    test = () => {
      console.log('Yup.');
    };
  }
  ```

- 7.5 Never name a parameter arguments. This will take precedence over the arguments object that is given to every function scope.

  Bad:

  [//]: # (expectedErrors: 0)

  ```js
  function foo(name, options, arguments) {
    // ...
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  function foo(name, options, args) {
    // ...
  }
  ```

- 7.6 Never use arguments, opt to use rest syntax ... instead.  eslint: [`prefer-rest-params`](https://eslint.org/docs/latest/rules/prefer-rest-params)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 3, eslint: 'prefer-spread: "off"')

  ```js
  function foo() {
      console.log(arguments);
  }

  function bar(action) {
      const args = Array.prototype.slice.call(arguments, 1);
      action.apply(null, args);
  }

  function baz(action) {
      const args = [].slice.call(arguments, 1);
      action.apply(null, args);
  }
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'prefer-spread: "off"')

  ```js
  function foo(...args) {
      console.log(args);
  }

  function bar(action, ...args) {
      action.apply(null, args); // or `action(...args)`, related to the `prefer-spread` rule.
  }
  ```

- 7.7 Use default parameter syntax rather than mutating function arguments.

  Very Bad:

  ```js
  function handleThings(opts) {
    // No! We shouldn’t mutate function arguments.
    // Double bad: if opts is falsy it'll be set to an object which may
    // be what you want but it can introduce subtle bugs.
    opts = opts || {};
    // ...
  }
  ```

  Bad:

  ```js
  function handleThings(opts) {
    if (opts === void 0) {
      opts = {};
    }
    // ...
  }
  ```

  Good:

  ```js
  function handleThings(opts = {}) {
    // ...
  }
  ```

- 7.8 Avoid side effects with default parameters.

  > Why? They are confusing to reason about.

  Bad:

  ```js
  var b = 1;
  function count(a = b++) {
    console.log(a);
  }
  count();  // 1
  count();  // 2
  count(3); // 3
  count();  // 3
  ```

- 7.9 Always put default parameters last. eslint: [`default-param-last`](https://eslint.org/docs/latest/rules/default-param-last)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  function f(a = 0, b) {}

  function g(a, b = 0, c) {}
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  function f(a, b = 0) {}

  function g(a, b = 0, c = 0) {}
  ```

- 7.10 Never use the Function constructor to create a new function. eslint: [`no-new-func`](https://eslint.org/docs/latest/rules/no-new-func)

  > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 6)

  ```js
  const a = new Function("a", "b", "return a + b");
  const b = Function("a", "b", "return a + b");
  const c = Function.call(null, "a", "b", "return a + b");
  const d = Function.apply(null, ["a", "b", "return a + b"]);
  const x = Function.bind(null, "a", "b", "return a + b")();
  const y = Function.bind(null, "a", "b", "return a + b"); // assuming that the result of Function.bind(...) will be eventually called.
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const x = function (a, b) {
      return a + b;
  };
  ```

- 7.11 Spacing in a function signature. eslint: [`@stylistic/space-before-function-paren`](https://eslint.style/rules/space-before-function-paren)

  > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`space-before-function-paren`](https://eslint.org/docs/latest/rules/space-before-function-paren) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 6, eslint: 'no-useless-constructor: "off"')

  ```js
  function foo () {
      // ...
  }

  var bar = function() {
      // ...
  };

  class Foo {
      constructor () {
          // ...
      }
  }

  var baz = {
      bar () {
          // ...
      }
  };

  var baz = async(a) => await a

  try {
      // ...
  } catch(e) {
      // ...
  }
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-useless-constructor: "off"')

  ```js
  function foo() {
      // ...
  }

  var bar = function () {
      // ...
  };

  class Foo {
      constructor() {
          // ...
      }
  }

  var baz = {
      bar() {
          // ...
      }
  };

  var baz = async (a) => await a

  try {
      // ...
  } catch (e) {
      // ...
  }
  ```

- 7.11.1 eslint: [`@stylistic/space-before-blocks`](https://eslint.style/rules/space-before-blocks)

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`space-before-blocks`](https://eslint.org/docs/latest/rules/space-before-blocks) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 6, eslint: 'no-useless-constructor: "off"')

  ```js
  if (a){
      b();
  }
  
  function a(){}
  
  for (;;){
      b();
  }
  
  try {} catch (a){}
  
  class Foo{
    constructor(){}
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  if (a) {
      b();
  }
  
  if (a) {
      b();
  } else{ /*no error. this is checked by `keyword-spacing` rule.*/
      c();
  }
  
  class C {
      static{} /*no error. this is checked by `keyword-spacing` rule.*/
  }
  
  function a() {}
  
  for (;;) {
      b();
  }
  
  try {} catch (a) {}
  ```


- 7.12, 7.13 Never mutate parameters. eslint: [`no-param-reassign`](https://eslint.org/docs/latest/rules/no-param-reassign)

  > Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.

  > Why? Reassigning parameters can lead to unexpected behavior, especially when accessing the arguments object. It can also cause optimization issues, especially in V8.

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  const foo = function (bar) {
      bar = 13;
  }

  const foo1 = function (bar) {
      bar++;
  }

  const foo2 = function (bar) {
      for (bar in baz) {}
  }

  const foo3 = function (bar) {
      for (bar of baz) {}
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const foo = function (bar) {
      const baz = bar;
  }
  ```

  **props**

  Bad:

  [//]: # (expectedErrors: 5)

  ```js
  const foo = function (bar) {
      bar.prop = "value";
  }

  const foo1 = function (bar) {
      delete bar.aaa;
  }

  const foo2 = function (bar) {
      bar.aaa++;
  }

  const foo3 = function (bar) {
      for (bar.aaa in baz) {}
  }

  const foo4 = function (bar) {
      for (bar.aaa of baz) {}
  }
  ```

  **ignorePropertyModificationsFor**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // Allowed properties are: 'acc', 'accumulator', 'e', 'ctx', 'context', 'req', 'request', 'res', 'response', '$scope', 'staticContext'.

  const foo = function (e) {
      e.prop = "value";
  }

  const foo1 = function (e) {
      delete e.aaa;
  }

  const foo2 = function (e) {
      e.aaa++;
  }

  const foo3 = function (e) {
      for (e.aaa in baz) {}
  }

  const foo4 = function (e) {
      for (e.aaa of baz) {}
  }
  ```

- 7.14 Prefer the use of the spread syntax ... to call variadic functions. eslint: [`prefer-spread`](https://eslint.org/docs/latest/rules/prefer-spread)

  > Why? It’s cleaner, you don’t need to supply a context, and you can not easily compose new with apply.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 3)

  ```js
  foo.apply(undefined, args);
  foo.apply(null, args);
  obj.foo.apply(obj, args);
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // Using spread syntax
  foo(...args);
  obj.foo(...args);

  // The `this` binding is different.
  foo.apply(obj, args);
  obj.foo.apply(null, args);
  obj.foo.apply(otherObj, args);

  // The argument list is not variadic.
  // Those are warned by the `no-useless-call` rule.
  foo.apply(undefined, [1, 2, 3]);
  foo.apply(null, [1, 2, 3]);
  obj.foo.apply(obj, [1, 2, 3]);
  ```

- 7.15 Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item. eslint: [`@stylistic/function-paren-newline`](https://eslint.style/rules/function-paren-newline)

  > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`function-paren-newline`](https://eslint.org/docs/latest/rules/function-paren-newline) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 5)

  ```js
  function foo(bar,
    baz
  ) {}
  
  var foobar = function (bar,
    baz
  ) {};
  
  var foobar = (
    bar,
    baz) => {};
  
  foo(
    bar,
    baz);
  
  foo(
      bar, qux,
    baz
  );
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'prefer-arrow-callback: "off"')

  ```js
  function foo(
    bar,
    baz
  ) {}
  
  var qux = function (bar, baz) {};
  
  var qux = (
    bar
  ) => {};
  
  foo(
    function () {
      return baz;
    }
  );
  ```

## Arrow Functions

- 8.1 When you must use an anonymous function (as when passing an inline callback), use arrow function notation. eslint: [`prefer-arrow-callback`](https://eslint.org/docs/latest/rules/prefer-arrow-callback)

  > Why? It creates a version of the function that executes in the context of this, which is usually what you want, and is a more concise syntax.

  > Why not? If you have a fairly complicated function, you might move that logic out into its own named function expression.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  foo(function (a) { return a; }); // ERROR
  // prefer: foo(a => a)

  foo(function () { return this.a; }.bind(this)); // ERROR
  // prefer: foo(() => this.a)
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // arrow function callback
  foo((a) => a); // OK

  // generator as callback
  foo(function*() { yield; }); // OK

  // function expression not used as callback or function argument
  const foo = function foo(a) { return a; }; // OK

  // unbound function expression callback
  foo(function () { return this.a; }); // OK

  // recursive named function callback
  foo(function bar(n) { return n && n + bar(n - 1); }); // OK
  ```

  **allowNamedFunctions**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  foo(function bar() {});
  ```

  **allowUnboundThis**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  foo(function () { this.a; });

  foo(function () { (() => this); });

  someArray.map(function (item) { return this.doSomething(item); }, someObject);
  ```

- 8.1.1 eslint: [`@stylistic/arrow-spacing`](https://eslint.style/rules/arrow-spacing)

  **Availability:** `es6`

  **Note:** Originally it was eslint: [`arrow-spacing`](https://eslint.org/docs/latest/rules/arrow-spacing) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 8, eslint: '@stylistic/arrow-parens: "off"')

  ```js
  ()=> {};
  () =>{};
  (a)=> {};
  (a) =>{};
  a =>a;
  a=> a;
  ()=> {'\n'};
  () =>{'\n'};
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: '@stylistic/arrow-parens: "off"')

  ```js
  () => {};
  (a) => {};
  a => a;
  () => {'\n'};
  ```

- 8.2 If the function body consists of a single statement returning an expression without side effects, omit the braces and use the implicit return. Otherwise, keep the braces and use a return statement. eslint: [`arrow-body-style`](https://eslint.org/docs/latest/rules/arrow-body-style)

  > Why? Syntactic sugar. It reads well when multiple functions are chained together.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  const foo = () => {
      return 0;
  };

  const bar = () => {
      return {
        bar: {
              foo: 1,
              bar: 2,
          }
      };
  };
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-param-reassign: "off"')

  ```js
  const foo1 = () => 0;

  const foo2 = (retv, name) => {
      retv[name] = true;
      return retv;
  };

  const foo3 = () => ({
      bar: {
          foo: 1,
          bar: 2,
      }
  });

  const foo4 = () => { bar(); };
  const foo5 = () => {};
  const foo6 = () => { /* do nothing */ };

  const foo7 = () => {
      // do nothing.
  };

  const foo8 = () => ({ bar: 0 });
  ```

  **requireReturnForObjectLiteral**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const bar = () => { return { bar: 0 }; };
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const foo = () => {};

  const foo2 = () => ({});

  const bar = () => ({ bar: 0 });
  ```


- 8.3 In case the expression spans over multiple lines, wrap it in parentheses for better readability.

  > Why? It shows clearly where the function starts and ends.

  Bad:

  ```js
  ['get', 'post', 'put'].map((httpMethod) => Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod,
    )
  );
  ```

  Good:

  ```js
  ['get', 'post', 'put'].map((httpMethod) => (
    Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod,
    )
  ));
  ```

- 8.4 eslint: [`@stylistic/arrow-parens`](https://eslint.style/rules/arrow-parens)

  **Availability:** `es6`

  **Note:** Originally it was eslint: [`arrow-parens`](https://eslint.org/docs/latest/rules/arrow-parens) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 6)

  ```js
  a => {};
  a => a;
  a => {'\n'};
  a.then(foo => {});
  a.then(foo => a);
  a(foo => { if (true) {} });
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  () => {};
  (a) => {};
  (a) => a;
  (a) => {'\n'}
  a.then((foo) => {});
  a.then((foo) => { if (true) {} });
  ```

  **If Statements**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  var a = 1;
  var b = 2;
  // ...
  if (a => b) {
  console.log('bigger');
  } else {
  console.log('smaller');
  }
  // outputs 'bigger', not smaller as expected
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var a = 1;
  var b = 0;
  // ...
  if ((a) => b) {
  console.log('truthy value returned');
  } else {
  console.log('falsy value returned');
  }
  // outputs 'truthy value returned'
  ```

- 8.5 Avoid confusing arrow function syntax (=>) with comparison operators (<=, >=). eslint: [`@stylistic/no-confusing-arrow`](https://eslint.style/rules/no-confusing-arrow)

  **Availability:** `es6`

  **Note:** Originally it was eslint: [`no-confusing-arrow`](https://eslint.org/docs/latest/rules/no-confusing-arrow) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 2, eslint: '@stylistic/arrow-parens: "off"')

  ```js
  var x = a => 1 ? 2 : 3;
  var x = (a) => 1 ? 2 : 3;
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: '@stylistic/arrow-parens: "off", arrow-body-style: "off"')

  ```js
  var x = a => (1 ? 2 : 3);
  var x = (a) => (1 ? 2 : 3);
  var x = (a) => {
      return 1 ? 2 : 3;
  };
  var x = a => { return 1 ? 2 : 3; };
  ```

  **allowParens**

  Good:

  [//]: # (expectedErrors: 0, eslint: '@stylistic/arrow-parens: "off", arrow-body-style: "off"')

  ```js
  var x = a => (1 ? 2 : 3);
  var x = (a) => (1 ? 2 : 3);
  ```

  **onlyOneSimpleParam**

  Bad:

  [//]: # (expectedErrors: 6, eslint: '@stylistic/arrow-parens: "off"')

  ```js
  () => 1 ? 2 : 3;
  (a, b) => 1 ? 2 : 3;
  (a = b) => 1 ? 2 : 3;
  ({ a }) => 1 ? 2 : 3;
  ([a]) => 1 ? 2 : 3;
  (...a) => 1 ? 2 : 3;
  ```


- 8.6 Enforce the location of arrow function bodies with implicit returns. eslint: [`@stylistic/implicit-arrow-linebreak`](https://eslint.style/rules/implicit-arrow-linebreak)

  **Availability:** `es6`

  **Note:** Originally it was eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/latest/rules/implicit-arrow-linebreak) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 5, eslint: '@stylistic/arrow-parens: "off"')

  ```js
  (foo) =>
      bar;

  (foo) =>
      (bar);

  (foo) =>
      bar =>
          baz;

  (foo) =>
  (
    bar()
  );
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: '@stylistic/arrow-parens: "off", arrow-body-style: "off"')

  ```js
  (foo) => bar;

  (foo) => (bar);

  (foo) => bar => baz;

  (foo) => (
    bar()
  );

  // functions with block bodies allowed with this rule using any style
  // to enforce a consistent location for this case, see the rule: `brace-style`
  (foo) => {
    return bar();
  }

  (foo) =>
  {
    return bar();
  }
  ```

## Classes & Constructors

- 9.1 Always use class. Avoid manipulating prototype directly.

  > Why? class syntax is more concise and easier to reason about.

  Bad:

  ```js
  function Queue(contents = []) {
    this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  };
  ```

  Good:

  ```js
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```

- 9.2 Use extends for inheritance.

  > Why? It is a built-in way to inherit prototype functionality without breaking instanceof.

  Bad:

  ```js
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this.queue[0];
  };
  ```

  Good:

  ```js
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
  ```

- 9.3 Methods can return this to help with method chaining.

  Bad:

  ```js
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };

  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };

  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined
  ```

  Good:

  ```js
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }

    setHeight(height) {
      this.height = height;
      return this;
    }
  }

  const luke = new Jedi();

  luke.jump()
    .setHeight(20);
  ```

- 9.4 It’s okay to write a custom toString() method, just make sure it works successfully and causes no side effects.

  Good:

  ```js
    class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name';
    }

    getName() {
      return this.name;
    }

    toString() {
      return `Jedi - ${this.getName()}`;
    }
  }
  ```

- 9.5 Classes have a default constructor if one is not specified. An empty constructor function or one that just delegates to a parent class is unnecessary. eslint: [`no-useless-constructor`](https://eslint.org/docs/latest/rules/no-useless-constructor)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  class A {
      constructor() {
      }
  }

  class B extends A {
      constructor(...args) {
        super(...args);
      }
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  class A { }

  class B {
      constructor() {
          doSomething();
      }
  }

  class C extends A {
      constructor() {
          super('foo');
      }
  }

  class D extends A {
      constructor() {
          super();
          doSomething();
      }
  }
  ```

- 9.6 Avoid duplicate class members. eslint: [`no-dupe-class-members`](https://eslint.org/docs/latest/rules/no-dupe-class-members)

  > Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 5, eslint: 'class-methods-use-this: "off"')

  ```js
  class A {
    bar() { }
    bar() { }
  }

  class B {
    bar() { }
    get bar() { }
  }

  class C {
    bar;
    bar;
  }

  class D {
    bar;
    bar() { }
  }

  class E {
    static bar() { }
    static bar() { }
  }
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'class-methods-use-this: "off"')

  ```js
  class A {
    bar() { }
    qux() { }
  }

  class B {
    get bar() { }
    set bar(value) { }
  }

  class C {
    bar;
    qux;
  }

  class D {
    bar;
    qux() { }
  }

  class E {
    static bar() { }
    bar() { }
  }
  ```


- 9.7 Class methods should use this or be made into a static method unless an external library or framework requires using specific non-static methods. Being an instance method should indicate that it behaves differently based on properties of the receiver. eslint: [`class-methods-use-this`](https://eslint.org/docs/latest/rules/class-methods-use-this)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  class A {
      foo() {
          console.log("Hello World");     /*error Expected 'this' to be used by class method 'foo'.*/
      }
  }
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-useless-constructor: "off"')

  ```js
  class A {
      foo() {
          this.bar = "Hello World"; // OK, this is used
      }
  }

  class B {
      constructor() {
          // OK. constructor is exempt
      }
  }

  class C {
      static foo() {
          // OK. static methods aren't expected to use this.
      }

      static {
          // OK. static blocks are exempt.
      }
  }
  ```

  **enforceForClassFields**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  class A {
      foo = () => {}
  }
  ```

## Modules

- 10.1 Always use modules (import/export) over a non-standard module system. You can always transpile to your preferred module system. eslint: [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md)

  > Why? Modules are the future, let’s start using the future now.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  import { stuff } from 'starwars'
  module.exports = thing
  ```

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  import * as allThings from 'starwars'
  exports.bar = thing
  ```

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  import thing from 'other-thing'
  exports.foo = bar
  ```

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  import thing from 'starwars'
  const baz = module.exports = thing
  console.log(baz)
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  import thing from 'other-thing'
  export default thing
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const thing = require('thing')
  module.exports = thing
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const thing = require('thing')
  exports.foo = bar
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  import thing from 'otherthing'
  console.log(thing.module.exports)
  ```

- 10.1.1 eslint: [`import/no-amd`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md)

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  define(["a", "b"], (a, b) => { /* ... */ })

  require(["c", "e"], (c, e) => { /* ... */ })
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'import/first: "off"')

  ```js
  import a from "a";
  import b from "b";
  export default (/* ... */) => {
  }

  // For the require block (import and use)
  import c from "c";
  import e from "e";
  ```

- 10.2 Do not use wildcard imports. eslint: [`import/no-namespace`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md)

  > Why? This makes sure you have a single default export.

  **Availability:** `es6`

  **Note:** The rule is currently disabled.

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  import * as AirbnbStyleGuide from './AirbnbStyleGuide';
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  ```

- 10.3 And do not export directly from an import.

  > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 0)

  ```js
  export { es6 as default } from './AirbnbStyleGuide';
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
  ```

- 10.4 Only import from a path in one place. eslint: [`import/no-duplicates`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md)

  > Why? Having multiple lines that import from the same path can make code harder to maintain.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 2, eslint: 'import/extensions: "off"')

  ```js
  import SomeDefaultClass from './mod'

  // oops, some other import separated these lines
  import foo from './some-other-mod'

  import { something } from './mod'

  // will catch this too, assuming it is the same target module
  import { something2 } from './mod.js'
  ```

  Good:

  [//]: # (expectedErrors: 0 eslint: 'import/extensions: "off"')

  ```js
  import SomeDefaultClass, { something, something2 } from './mod'

  import foo from './some-other-mod'
  ```

- 10.5 Do not export mutable bindings. eslint: [`import/no-mutable-exports`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md)

  > Why? Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 3, eslint: 'prefer-const: "off"')

  ```js
  export let count = 2
  export var count2 = 3

  let count3 = 4
  export { count3 } // reported here
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  export const count = 1
  export function getCount() {}
  export class Counter {}
  ```


- 10.6 In modules with a single export, prefer default export over named export. eslint: [`import/prefer-default-export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md)

  > Why? To encourage more files that only ever export one thing, which is better for readability and maintainability.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  export const foo = 'foo';
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // There is a default export.
  export const foo = 'foo';
  const bar = 'bar';
  export default bar;
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // There is more than one named export in the module.
  export const foo = 'foo';
  export const bar = 'bar';
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // There is more than one named export in the module
  const foo = 'foo';
  const bar = 'bar';
  export { foo, bar }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // There is a default export.
  const foo = 'foo';
  export { foo as default }
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'import/extensions: "off"')

  ```js
  // Any batch export will disable this rule. The remote module is not inspected.
  export * from './other-module'
  ```

- 10.7 Put all imports above non-import statements. eslint: [`import/first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md)

  > Why? Since imports are hoisted, keeping them all at the top prevents surprising behavior.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 1, eslint: 'import/extensions: "off"')

  ```js
  import foo from './foo'

  // some module-level initializer
  initWith(foo)

  import bar from './bar' // <- reported
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'import/extensions: "off"')

  ```js
  import foo from './foo'
  import bar from './bar'

  // some module-level initializer
  initWith(foo)
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  'use super-mega-strict'

  import { suchFoo } from 'lame-fake-module-name'  // no report here
  ```

- 10.8 Multiline imports should be indented just like multiline array and object literals. eslint: [`@stylistic/object-curly-newline`](https://eslint.style/rules/object-curly-newline)

  > Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas.

  **Availability:** `es6`

  **Note:** This rule also applies to other curly brace block linting.

  **Note:** Originally it was eslint: [`object-curly-newline`](https://eslint.org/docs/latest/rules/object-curly-newline) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 4, eslint: 'import/extensions: "off"')

  ```js
  import { qux1, qux2, qux3, qux4 } from './qux'

  export { qux1, qux2, qux3, qux4 }
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'import/extensions: "off"')

  ```js
  // Indent is optional for 3 elements or less
  import { foo } from './foo'
  import { bar1, bar2 } from './bar'
  import { baz1, baz2, baz3 } from './baz'
  // Must indent after 4 elements
  import {
    qux1,
    qux2,
    qux3,
    qux4
  } from './qux'

  // Indent is optional for 3 elements or less
  export { foo }
  export { bar1, bar2 }
  export { baz1, baz2, baz3 }
  // Must indent after 4 elements
  export {
    qux1,
    qux2,
    qux3,
    qux4
  }
  ```

- 10.9 Disallow Webpack loader syntax in module import statements. eslint: [`import/no-webpack-loader-syntax`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md)

  > Why? Since using Webpack syntax in the imports couples the code to a module bundler. Prefer using the loader syntax in webpack.config.js.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  import myModule from 'my-loader!my-module';
  import theme from 'style!css!./theme.css';

  var myModule2 = require('my-loader!./my-module');
  var theme2 = require('style!css!./theme.css');
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  import myModule from 'my-module';
  import theme from './theme.css';

  var myModule2 = require('my-module');
  var theme2 = require('./theme.css');
  ```

- 10.10 Do not include JavaScript filename extensions. eslint: [`import/extensions`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md)

  > Why? Including extensions inhibits refactoring, and inappropriately hardcodes implementation details of the module you're importing in every consumer.

  **Availability:** `es6`

  Bad:

  [//]: # (expectedErrors: 3)

  ```js
  // .js, .mjs, .jsx is disallowed
  import foo from './foo.js';

  import Component from './Component.jsx';

  import express from 'express/index.js';
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  // other extension than .js, .mjs, .jsx is allowed
  import bar from './bar.json';

  import express from 'express';
  ```
