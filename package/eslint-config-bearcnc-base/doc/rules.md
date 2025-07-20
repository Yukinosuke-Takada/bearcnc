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

## See also

This doc was created by referencing the following material:

- Structure, Explanation: [Airbnb JS style guide](https://airbnb.io/javascript/#the-javascript-style-guide-guide), [Airbnb JS style guide (github)](https://github.com/airbnb/javascript)
- Sample Code (ESLint): [ESLint docs](https://eslint.org/docs/latest/rules)
- Sample Code (ESLint Stylistic): [ESLint Stylistic docs](https://eslint.style/rules)

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

  [//]: # (expectedErrors: 0, eslint: 'no-var: "off"')

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
          e = obj => obj.#x;
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

  [//]: # (expectedErrors: 2)

  ```js
  var x = "y";
  var CONFIG = {};
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'prefer-const: "off"')

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
  
  const isObject = value => value === Object(value);
  
  const createObject = Object => new Object();
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
      a: function() {},
      b: function() {}
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
      w: function() {},
      x: function *() {},
      [y]: function() {},
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
      "bar-baz": function() {},
      "qux": qux
  };
  ```

  **ignoreConstructors**

  Bad:

  [//]: # (expectedErrors: 1)

  ```js
  const foo = {
      ConstructorFunction: function() {}
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

  [//]: # (expectedErrors: 4, eslint: 'no-var: "off"')

  ```js
  var object = {
      "a": 0,
      "0": 0,
      "true": 0,
      "null": 0
  };
  ```

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-var: "off"')

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

  [//]: # (expectedErrors: 0, eslint: 'no-var: "off"')

  ```js
  var x = {
      while: 1,
      volatile: "foo"
  };
  ```

  **numbers**

  Good:

  [//]: # (expectedErrors: 0, eslint: 'no-var: "off"')

  ```js
  var x = {
    100: 1
  }
  ```

- 3.7 Do not call Object.prototype methods directly, such as hasOwnProperty, propertyIsEnumerable, and isPrototypeOf. eslint: [`no-prototype-builtins`](https://eslint.style/rules/no-prototype-builtins)

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

- 4.1 Use the literal syntax for array creation. eslint: [`no-array-constructor`](https://eslint.style/rules/no-array-constructor)

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

  const createArray = Array => new Array();
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

- 4.6 Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following 8.2. eslint: [`array-callback-return`](https://eslint.style/rules/array-callback-return)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  const indexMap = myArray.reduce(function(memo, item, index) {
      memo[item] = index;
  }, {});

  const foo = Array.from(nodes, function(node) {
      if (node.tagName === "DIV") {
          return true;
      }
  });
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const indexMap = myArray.reduce(function(memo, item, index) {
      memo[item] = index;
      return memo;
  }, {});

  const foo = Array.from(nodes, function(node) {
      if (node.tagName === "DIV") {
          return true;
      }
      return false;
  });

  const bar = foo.map(node => node.getAttribute("id"));
  ```

  **allowImplicit**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  const undefAllTheThings = myArray.map(function(item) {
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

- 5.1, 5.2 Use object destructuring when accessing and using multiple properties of an object. eslint: [`prefer-destructuring`](https://eslint.style/rules/prefer-destructuring)

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

