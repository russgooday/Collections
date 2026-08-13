# Collections

### A library of functions for working with collections in Javascript

The is a library of standard utility functions I created. The functions are designed to work with numerous data structures, including arrays, objects, and maps. Time has been put into making the functions as efficient as possible, and they are designed to be easy to use.

For example reducing an object to a single value:

```javascript
import { reduce } from 'collections';

const obj = { a: 1, b: 2, c: 3 };
const add = (a, b) => a + b;

const result = reduce(obj, add, 0); // result = 6
```