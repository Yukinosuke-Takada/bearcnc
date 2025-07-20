# Legacy Rules

## Table of contents

- [Legacy Rules](#legacy-rules)
  - [Table of contents](#table-of-contents)
  - [See also](#see-also)
  - [Objects](#objects)
  - [Arrays](#arrays)

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
  
  var isObject = function(value) {
    return value === Object(value);
  };

  var createObject = function(ObjectConstructor) {
    return new ObjectConstructor();
  };
  ```

- 3.6 Only quote properties that are invalid identifiers. eslint: [`@stylistic/quote-props`](https://eslint.style/rules/quote-props)

  > Why? In general we consider it subjectively easier to read. It improves syntax highlighting, and is also more easily optimized by many JS engines.

  **Availability:** `es5`, `es6`

  **Note:** Originally it was eslint: [`quote-props`](https://eslint.org/docs/latest/rules/no-new-object) but was deprecated as of V8.53.0 so it was replaced.

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
      foo: function() {
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

- 4.1 Use the literal syntax for array creation. eslint: [`no-array-constructor`](https://eslint.style/rules/no-array-constructor)

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

  var createArray = function(Array) { return new Array(); };
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

- 4.6 Use return statements in array method callbacks. It’s ok to omit the return if the function body consists of a single statement returning an expression without side effects, following 8.2. eslint: [`array-callback-return`](https://eslint.style/rules/array-callback-return)

  **Availability:** `es5`, `es6`

  Bad:

  [//]: # (expectedErrors: 2)

  ```js
  var indexMap = myArray.reduce(function(memo, item, index) {
      memo[item] = index;
  }, {});

  var foo = Array.from(nodes, function(node) {
      if (node.tagName === "DIV") {
          return true;
      }
  });
  ```

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var indexMap = myArray.reduce(function(memo, item, index) {
      memo[item] = index;
      return memo;
  }, {});

  var foo = Array.from(nodes, function(node) {
      if (node.tagName === "DIV") {
          return true;
      }
      return false;
  });

  var bar = foo.map(function(node) {
    return node.getAttribute("id");
  });
  ```

  **allowImplicit**

  Good:

  [//]: # (expectedErrors: 0)

  ```js
  var undefAllTheThings = myArray.map(function(item) {
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

