# Legacy Rules

## Table of contents

- [Legacy Rules](#legacy-rules)
  - [Table of contents](#table-of-contents)
  - [See also](#see-also)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Strings](#strings)
  - [Functions](#functions)
  - [Iterators and Generators](#iterators-and-generators)
  - [Properties](#properties)

## See also

This doc was created by referencing the following material:

- Structure, Explanation: [Airbnb JS style guide](https://airbnb.io/javascript/#the-javascript-style-guide-guide), [Airbnb JS style guide (github)](https://github.com/airbnb/javascript)
- Sample Code (ESLint): [ESLint docs](https://eslint.org/docs/latest/rules)
- Sample Code (ESLint Stylistic): [ESLint Stylistic docs](https://eslint.style/rules)

## Objects

- 3.1 Use the literal syntax for object creation. eslint: [`no-object-constructor`](https://eslint.org/docs/latest/rules/no-object-constructor)

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`no-new-object`](https://eslint.org/docs/latest/rules/no-new-object) but was deprecated as of V8.50.0 so it was replaced with this.

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
  
  var obj = { a: 1, b: 2 };
  
  var isObject = function (value) {
    return value === Object(value);
  };

  var createObject = function (ObjectConstructor) {
    return new ObjectConstructor();
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
      foo: function () {
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
  var hasBarProperty = foo.hasOwnProperty("bar");

  var isPrototypeOfBar = foo.isPrototypeOf(bar);

  var barIsEnumerable = foo.propertyIsEnumerable("bar");
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var hasBarProperty = Object.prototype.hasOwnProperty.call(foo, "bar");

  var isPrototypeOfBar = Object.prototype.isPrototypeOf.call(foo, bar);

  var barIsEnumerable = {}.propertyIsEnumerable.call(foo, "bar");
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

  [//]: # (expectedErrors: 3)

  ```js
  Array();

  Array(0, 1, 2);

  new Array(0, 1, 2);
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  Array(500);

  new Array(someOtherArray.length);

  [0, 1, 2];

  var createArray = function (Array) { return new Array(); };
  ```

- 4.2 Use [Array#push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) instead of direct assignment to add items to an array.

  Bad:

  ```js
  var someStack = [];

  someStack[someStack.length] = 'abracadabra';
  ```

  Good:

  ```js
  var someStack = [];

  someStack.push('abracadabra');
  ```

- 4.6 Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following 8.2. eslint: [`array-callback-return`](https://eslint.org/docs/latest/rules/array-callback-return)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 2, eslint: 'no-param-reassign: "off"')

  ```js
  var indexMap = myArray.reduce(function (memo, item, index) {
      memo[item] = index;
  }, {});

  var foo = Array.from(nodes, function (node) {
      if (node.tagName === "DIV") {
          return true;
      }
  });
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-param-reassign: "off"')

  ```js
  var indexMap = myArray.reduce(function (memo, item, index) {
      memo[item] = index;
      return memo;
  }, {});

  var foo = Array.from(nodes, function (node) {
      if (node.tagName === "DIV") {
          return true;
      }
      return false;
  });

  var bar = foo.map(function (node) {
    return node.getAttribute("id");
  });
  ```

  **allowImplicit**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var undefAllTheThings = myArray.map(function (item) {
      return;
  });
  ```

- 4.7 Use line breaks after open and before close array brackets if an array has multiple lines

  Bad:

  ```js
  var arr = [
    [0, 1], [2, 3], [4, 5],
  ];

  var objectInArray = [{
    id: 1,
  }, {
    id: 2,
  }];

  var numberInArray = [
    1, 2,
  ];
  ```

  Good:

  ```js
  var arr = [[0, 1], [2, 3], [4, 5]];

  var objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  var numberInArray = [
    1,
    2,
  ];
  ```

## Strings

- 6.1 Use single quotes '' for strings. eslint: [`@stylistic/quotes`](https://eslint.style/rules/quotes)

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`quotes`](https://eslint.org/docs/latest/rules/quotes) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  var double = "double";
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var single = 'single';
  ```

  **avoidEscape**

  Good:

  [//]: # (expectedErrors: 0)

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

- 6.4 Never use eval() on a string, it opens too many vulnerabilities. eslint: [`no-eval`](https://eslint.org/docs/latest/rules/no-eval)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 4, eslint: 'prefer-template: "off"')

  ```js
  var obj = { x: "foo" },
      key = "x",
      value = eval("obj." + key);

  (0, eval)("var a = 0");

  var foo = eval;
  foo("var a = 0");

  // This `this` is the global object.
  this.eval("var a = 0");
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

  [//]: # (expectedErrors: 0)

  ```js
  var obj = { x: "foo" },
      key = "x",
      value = obj[key];

  function A() {}

  A.prototype.foo = function () {
      // This is a user-defined method.
      this.eval("const a = 0");
  };

  A.prototype.eval = function () {
  };

  A.eval = function () {};
  ```

- 6.5 Do not unnecessarily escape characters in strings. eslint: [`no-useless-escape`](https://eslint.org/docs/latest/rules/no-useless-escape)

  > Why? Backslashes harm readability, thus they should only be present when necessary.

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 8)

  ```js
  "\'";
  '\"';
  "\#";
  "\e";
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
  "\371";
  "xs\u2111";
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
  var short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
  };
  ```

- 7.1.1 eslint: [`func-names`](https://eslint.org/docs/latest/rules/func-names)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 4, eslint: 'object-shorthand: "off"')

  ```js
  Foo.prototype.bar = function () {};

  var cat = {
    meow: function () {}
  }

  (function () {
      // ...
  }())

  module.exports = function () {};
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  Foo.prototype.bar = function bar() {};

  var cat = {
      meow: function meow() {}
  };

  (function bar() {
      // ...
  }())

  module.exports = function foo() {};
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

  Bad:

  [//]: # (expectedErrors: 3)

  ```js
  if (test) {
      function doSomething() { }
  }

  function doSomethingElse() {
      if (test) {
          function doAnotherThing() { }
      }
  }

  if (foo) function f() {}
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  function doSomething() { }

  function doSomethingElse() {
      function doAnotherThing() { }
  }

  function C() {}

  C.doSomething = function () {};

  if (test) {
      asyncCall(id, function (err, data) { });
  }

  var fn;
  if (test) {
      fn = function fnExpression() { };
  }

  if (foo) var a;
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

- 7.10 Never use the Function constructor to create a new function. eslint: [`no-new-func`](https://eslint.org/docs/latest/rules/no-new-func)

  > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 6)

  ```js
  var a = new Function("a", "b", "return a + b");
  var b = Function("a", "b", "return a + b");
  var c = Function.call(null, "a", "b", "return a + b");
  var d = Function.apply(null, ["a", "b", "return a + b"]);
  var x = Function.bind(null, "a", "b", "return a + b")();
  var y = Function.bind(null, "a", "b", "return a + b"); // assuming that the result of Function.bind(...) will be eventually called.
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var x = function (a, b) {
      return a + b;
  };
  ```

- 7.11 Spacing in a function signature. eslint: [`@stylistic/space-before-function-paren`](https://eslint.style/rules/space-before-function-paren)

  > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`space-before-function-paren`](https://eslint.org/docs/latest/rules/space-before-function-paren) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 3)

  ```js
  function foo () {
      // ...
  }

  var bar = function() {
      // ...
  };

  try {
      // ...
  } catch(e) {
      // ...
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  function foo() {
      // ...
  }

  var bar = function () {
      // ...
  };

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

  [//]: # (expectedErrors: 4)

  ```js
  if (a){
      b();
  }

  function a(){}

  for (;;){
      b();
  }

  try {} catch (a){}
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

  [//]: # (expectedErrors: 3, eslint: 'no-restricted-syntax: "off"')

  ```js
  var foo = function (bar) {
      bar = 13;
  }

  var foo1 = function (bar) {
      bar++;
  }

  var foo2 = function (bar) {
      for (bar in baz) {}
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var foo = function (bar) {
      var baz = bar;
  }
  ```

  **props**

  Bad:

  [//]: # (expectedErrors: 4, eslint: 'no-restricted-syntax: "off"')

  ```js
  var foo = function (bar) {
      bar.prop = "value";
  }

  var foo1 = function (bar) {
      delete bar.aaa;
  }

  var foo2 = function (bar) {
      bar.aaa++;
  }

  var foo3 = function (bar) {
      for (bar.aaa in baz) {}
  }
  ```

  **ignorePropertyModificationsFor**

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-restricted-syntax: "off"')

  ```js
  // Allowed properties are: 'acc', 'accumulator', 'e', 'ctx', 'context', 'req', 'request', 'res', 'response', '$scope', 'staticContext'.

  var foo = function (e) {
      e.prop = "value";
  }

  var foo1 = function (e) {
      delete e.aaa;
  }

  var foo2 = function (e) {
      e.aaa++;
  }

  var foo3 = function (e) {
      for (e.aaa in baz) {}
  }
  ```

- 7.15 Functions with multiline signatures, or invocations, should be indented just like every other multiline list in this guide: with each item on a line by itself, with a trailing comma on the last item. eslint: [`@stylistic/function-paren-newline`](https://eslint.style/rules/function-paren-newline)

  > Why? Consistency is good, and you shouldn’t have to add or remove a space when adding or removing a name.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`function-paren-newline`](https://eslint.org/docs/latest/rules/function-paren-newline) but was deprecated as of V8.53.0 so it was replaced.

  Bad:

  [//]: # (expectedErrors: 4)

  ```js
  function foo(bar,
    baz
  ) {}

  var foobar = function (bar,
    baz
  ) {};

  foo(
    bar,
    baz);

  foo(
      bar, qux,
    baz
  );
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  function foo(
    bar,
    baz
  ) {}

  var qux = function (bar, baz) {};

  foo(
    function () {
      return baz;
    }
  );
  ```

## Iterators and Generators

- 11.1 Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops like for-in or for-of. eslint: [`no-restricted-syntax`](https://eslint.org/docs/latest/rules/no-restricted-syntax)

  > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects. Use map() / every() / filter() / find() / findIndex() / reduce() / some() / ... to iterate over arrays, and Object.keys() / Object.values() / Object.entries() to produce arrays so you can iterate over objects.

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  for (var key in object) {
    result += key + ': ' + object[key] + ', ';
  }
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  Object.keys(object).forEach(function (key) {
    result += key + ': ' + object[key] + ', ';
  });
  ```

- 11.1.1

  Bad:

  ```js
  for (let i = 0; i < numbers.length; i++) {
    increasedByOne.push(numbers[i] + 1);
  }
  ```

  Good:

  ```js
  numbers.forEach(function (num) {
    increasedByOne.push(num + 1);
  });
  ```

  Best:

  ```js
  var increasedByOne = numbers.map(function (num) {
    return num + 1;
  });
  ```

## Properties

- 12.1 Use dot notation when accessing properties. eslint: [`dot-notation`](https://eslint.org/docs/latest/rules/dot-notation)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  var x = foo["bar"];
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var x = foo.bar;

  var y = foo[bar];    // Property name is a variable, square-bracket notation required
  ```

- 12.2 Use bracket notation [] when accessing properties with a variable.

  Good:

  ```js
    var luke = {
    jedi: true,
    age: 28
  };

  function getProp(prop) {
    return luke[prop];
  }

  var isJedi = getProp('jedi');
  ```
