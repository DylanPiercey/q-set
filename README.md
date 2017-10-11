<h1 align="center">
  <!-- Logo -->
  <br/>
  Q-Set
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg" alt="API Stability"/>
  </a>
  <!-- TypeScript -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/q-set">
    <img src="https://img.shields.io/npm/v/q-set.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/q-set">
    <img src="https://img.shields.io/npm/dm/q-set.svg" alt="Downloads"/>
  </a>
  <!-- Size -->
  <a href="https://npmjs.org/package/q-set">
    <img src="https://img.shields.io/badge/size-669b-green.svg" alt="Browser Bundle Size"/>
  </a>
</h1>

Set query string style fields on an object.

# Installation

```console
npm install q-set
```

```javascript
import { deep, shallow } from 'q-set';
```

# API

### qset.deep(obj: any, path: string, val: any): any

* Sets nested paths such as `a[b][c]`.
* Concats duplicated properties on an object as an array.
* Supports `[]` as array push and will be appended to an existing array or create a new one.

```javascript
import { deep as set } from 'q-set'

// Set a key.
set({}, "a", 1); //-> { a: 1 }

// Set a nested path.
set({}, "a[b]", 1); //-> { a: { b: 1 } }

// Implicit array creation (keys used multiple times).
const obj = {};
set(obj, "a", 1); //-> { a: 1 }
set(obj, "a", 2); //-> { a: [1, 2] }

// Explicit array creation.
const obj = {};
set(obj, "a[]", 1); //-> { a: [1] }
set(obj, "a[]", 2); //-> { a: [1, 2] }

// Will also automatically create an array when the a key is a positive integer.
const obj = {};
set(obj, "a[0]", 1); //-> { a: [1] }
set(obj, "a[1]", 2); //-> { a: [1, 2] }
set({}, "b[2]", 3); //-> { b: [,,3] }

// Nested array creation.
const obj = {};
set(obj, "a[][b]", 1); //-> { a: [{ b: 1 }] }
set(obj, "a[][b]", 2); //-> { a: [{ b: 1 }, { b: 2 }] }
```

### qset.shallow(obj: any, path: string, val: any): any

* Concats duplicated properties on an object as an array.
* Will not follow nested query strings.
* If `[]` is used it will be converted to an explicit index and flattened.


```javascript
import { shallow as set } from 'q-set'

// Doesn't unflatten qs syntax but does append to arrays.
const obj = {};
set(obj, "a[1]", 1); //-> { "a[1]": 1 }
set(obj, "a[1]", 2); //-> { "a[1]": [1, 2] }

// Automatically converts array push "[]" to indexes.
const obj = {};
set(obj, "a[]", 1); //-> { "a[0]": 1 }
set(obj, "a[]", 2); //-> { "a[0]": 1, "a[1]": 2 }
```

### Contributions

* Use `npm test` to build and run tests.

Please feel free to create a PR!
