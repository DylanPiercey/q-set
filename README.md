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

set({}, "a", 1); //-> { a: 1 }

set({}, "a[b]", 1); //-> { a: { b: 1 } }

set({}, "a", 1); //-> { a: 1 }
set({}, "a", 2); //-> { a: [1, 2] }
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
