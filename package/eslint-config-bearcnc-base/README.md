## Table of contents

- [Table of contents](#table-of-contents)
- [Rules](#rules)
  - [References](#references)
  - [Objects](#objects)

## Rules


### References

- 2.1 Use `const` for all of your references; avoid using `var`. eslint: [`prefer-const`](https://eslint.org/docs/latest/rules/prefer-const),
  **Availability:** `es6`

  > Why? This ensures that you can’t reassign your references, which can lead to bugs and difficult to comprehend code.

  Bad:

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

  ```js
  let {a, b} = obj;    /*error 'b' is never reassigned, use 'const' instead.*/
  a = a + 1;
  ```

  Good:

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

  ```js
  let timer;
  function initialize() {
      if (foo()) {
          clearInterval(timer);
      }
  }
  timer = setInterval(initialize, 100);
  ```

- 2.1.1 eslint: `no-const-assign`
  **Availability:** `es6`
  Bad:

  ```js
  const a = 0;
  a = 1;
  ```
  
  Bad:
  
  ```js
  const a = 0;
  a += 1;
  ```

  Bad:
  
  ```js
  const a = 0;
  ++a;
  ```
  
  Good:
  
  ```js
  const a = 0;
  console.log(a);
  ```
  
  Good:

  ```js
  for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
      console.log(a);
  }
  ```

  Good:

  ```js
  for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
      console.log(a);
  }
  ```
  
- 2.2 If you must reassign references, use `let` instead of `var`. eslint: [`no-var`](https://eslint.org/docs/latest/rules/no-var)
  **Availability:** `es6`, ("off" for `es5`)
  Bad:

  ```js
  var x = "y";
  var CONFIG = {};
  ```

  Good:
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

### Objects

- 3.1 Use the literal syntax for object creation. eslint: [`no-object-constructor`](https://eslint.org/docs/latest/rules/no-object-constructor)
  **Availability:** `es5`, `es6`
  **Note:** Originally it was eslint: [`no-new-object`](https://eslint.org/docs/latest/rules/no-new-object) but was deprecated as of V8.50.0 so it was replaced with this.
  Bad:

  ```js
  var myObject = new Object();
  
  new Object();
  
  var foo = new Object("foo");
  ```

  Good:

  ```js
  var myObject = new CustomObject();
  
  var myObject = {};
  
  var Object = function Object() {};
  new Object();
  
  var foo = Object("foo");
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

  ```js
  const foo = {
      w: function() {},
      x: function *() {},
      [y]: function() {},
      z: z
  };
  ```

  Good:

  ```js
  const foo = {
      w() {},
      *x() {},
      [y]() {},
      z
  };
  ```

  Good:

  ```js
  const foo = {
      x: (y) => y
  };
  ```

  **avoidQuotes**
  Bad:

  ```js
  const foo = {
      "bar-baz"() {}
  };
  ```

  Good:

  ```js
  const foo = {
      "bar-baz": function() {},
      "qux": qux
  };
  ```

  **ignoreConstructors**
  Bad:

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

  

