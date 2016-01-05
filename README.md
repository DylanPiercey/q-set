# Q-Set

Set query string style fields on an object.

# Installation

#### Npm
```console
npm install q-set
```

#### Bower
```console
bower install q-set
```

# Example

```javascript
var set = require('q-set');

// Set a key.
set({}, "a", 1); //-> { a: 1 }

// Set a nested path.
set({}, "a[b]", 1); //-> { a: { b: 1 } }

// Implicit array creation (keys used multiple times).
var obj = {};
set(obj, "a", 1); //-> { a: 1 }
set(obj, "a", 2); //-> { a: [1, 2] }

// Explicit array creation.
var obj = {};
set(obj, "a[]", 1); //-> { a: [1] }
set(obj, "a[]", 2); //-> { a: [1, 2] }

// Will also automatically start "0" keys as an array.
var obj = {};
set(obj, "a[0]", 1); //-> { a: [1] }
set(obj, "a[1]", 2); //-> { a: [1, 2] }

// Nested array creation.
var obj = {};
set(obj, "a[][b]", 1); //-> { a: [{ b: 1 }] }
set(obj, "a[][b]", 2); //-> { a: [{ b: 1 }, { b: 2 }] }
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
