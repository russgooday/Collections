Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/internals/_types.js
const toString = {}.toString;
const hasOwn = {}.hasOwnProperty;
const TYPES = {
	"Arguments": "[object Arguments]",
	"Array": "[object Array]",
	"AsyncFunction": "[object AsyncFunction]",
	"Boolean": "[object Boolean]",
	"Date": "[object Date]",
	"DOMException": "[object DOMException]",
	"Error": "[object Error]",
	"Function": "[object Function]",
	"GeneratorFunction": "[object GeneratorFunction]",
	"Map": "[object Map]",
	"Number": "[object Number]",
	"Null": "[object Null]",
	"Object": "[object Object]",
	"Promise": "[object Promise]",
	"Proxy": "[object Proxy]",
	"RegExp": "[object RegExp]",
	"Set": "[object Set]",
	"String": "[object String]",
	"Symbol": "[object Symbol]",
	"Undefined": "[object Undefined]",
	"WeakMap": "[object WeakMap]",
	"WeakSet": "[object WeakSet]"
};
/**
* Checks if the given object is an Array.
* @param {any} obj - The object to check.
* @returns {boolean} True if the object is an Array, false otherwise.
*/
function isArray(obj) {
	return toString.call(obj) === TYPES.Array;
}
/**
* Checks if the given object is an Array, includes TypeArrays.
* @param {any} obj - The object to check.
* @returns {boolean} True if the object is an Array, false otherwise.
*/
function isArrayType(obj) {
	return toString.call(obj).slice(-6, -1) === "Array";
}
/**
* Checks if the given object is Array-like, includes Strings.
* @param {any} obj - The object to check.
* @returns {boolean} True if the object is array-like, false otherwise.
*/
function isArrayLike(obj) {
	return obj != null && typeof obj.length === "number" && obj.length >= 0;
}
/**
* Checks if the given object is an Object.
* @param {any} obj - The object to check.
* @returns {boolean} True if the object is an object, false otherwise.
*/
function isObject(obj) {
	return toString.call(obj) === TYPES.Object;
}
/**
* Checks if the given object is a Map or WeakMap.
* @param {any} obj - The object to check.
* @returns {boolean} True if the object is a Map or WeakMap, false otherwise.
*/
function isMap(obj) {
	const type = toString.call(obj);
	return type === TYPES.Map || type === TYPES.WeakMap;
}
/**
* Checks if the given object is a Set or WeakSet.
* @param {any} obj - The object to check.
* @returns {boolean} True if the object is a Set or WeakSet, false otherwise.
*/
function isSet(obj) {
	const type = toString.call(obj);
	return type === TYPES.Set || type === TYPES.WeakSet;
}
//#endregion
//#region src/internals/_prop.js
/**
* Prop - A higher order function which gets the value of an object's key.
* @param {string|number} key The key to retrieve the value for.
* @param {any} defaultVal The default value to return if the key is not found.
* @returns {(obj: object) => any} A function that takes an object and returns the value of the specified key.
* @example
* const obj = { a: 1, b: 2, c: 3 };
* const getC = prop('c');
* getC(obj); // returns 3
*/
function prop(key, defaultVal = void 0) {
	return function(obj) {
		if (obj == null) return defaultVal;
		if (hasOwn.call(obj, key)) return obj[key];
		return defaultVal;
	};
}
/**
* Props - A higher order function which gets the value of an object's key.
* If multiple keys are supplied, an array of values is returned.
* @function
* @param {(string|number)[]} keys The key(s) to retrieve values for.
* @param {any} defaultVal The default value to return if a key is not found.
* @returns {(obj: object | any[]) => any | any[]}
* A function that takes an object or array and returns the value of the specified key(s).
* @example
* const obj = { a: 1, b: 2, c: 3 };
*
* const getC = props(['c']);
* getC(obj); // returns 3
*
* const getAB = props(['a', 'b']);
* getAB(obj); // returns [1, 2]
*/
function props(keys, defaultVal = void 0) {
	return function(obj) {
		const values = [];
		if (obj != null && isArray(keys)) {
			const length = keys.length;
			let key, i = 0;
			while (i < length) {
				key = keys[i];
				values[i] = hasOwn.call(obj, key) ? obj[key] : defaultVal;
				i++;
			}
		}
		return values;
	};
}
//#endregion
//#region src/internals/_get.js
/**
* getFromPath
* Gets the value at the given path of an object.
* @param {object} obj - The object to query.
* @param {string|(string|number)[]} path - The path of the property to get.
* @param {any} [defaultValue = undefined] The value returned if the resolved value is undefined.
* @returns {any} The resolved value.
*
* @example
* get({ a: { b: 2 } }, 'a.b'); // returns 2
* get({ a: ['b', 'c'] }, ['a', 1]); // returns 'c'
*/
function getFromPath(obj, path, defaultValue = void 0) {
	if (typeof path === "string") path = path.split(".");
	for (const part of path) {
		obj = obj[part];
		if (obj === void 0) return defaultValue;
	}
	return obj;
}
//#endregion
//#region src/internals/_find.js
/**
* findArray - A function that searches an array for the first item that satisfies a predicate.
* @param {Array} arr - The array to search.
* @param {Function} predicate - The predicate function.
* @returns {any|undefined} The first item that satisfies the predicate, or undefined.
* @example
* const isEven = (n) => n % 2 === 0;
* findArray([1, 2, 3, 4], isEven); // 2
*/
function findArray(arr, predicate) {
	const length = arr.length;
	let i = 0;
	while (i < length) {
		const item = arr[i++];
		if (predicate(item)) return item;
	}
}
/**
* find - A function that searches a collection for the first item that satisfies a predicate.
* @external Iterable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
* @param {Iterable} collection - The collection to search.
* @param {Function} predicate - The predicate function.
* @returns {any|undefined} The first item that satisfies the predicate, or undefined.
* @example
* const isEven = (n) => n % 2 === 0;
* const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
* find(map, ([key, val]) => isEven(val)); // ['b', 2]
*/
function find(collection, predicate) {
	if (Array.isArray(collection)) return findArray(collection, predicate);
	for (const item of collection) if (predicate(item)) return item;
}
//#endregion
//#region src/internals/_map.js
/**
* mapArray - A function that maps an array to a new array.
* @param {Array} arr - The array to map.
* @param {Function} mappingFn - The mapping function.
* @returns {Array} A new array of mapped results.
* @example
* const double = (n) => n * 2;
* mapArray([1, 2, 3, 4], double); // returns [2, 4, 6, 8]
*/
function mapArray(arr, mappingFn) {
	const length = arr.length;
	const mapped = Array(length);
	let i = 0;
	while (i < length) mapped[i] = mappingFn(arr[i], i++);
	return mapped;
}
/**
* map - A function that maps an iterable collection to a new array.
* @external Iterable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
* @param {Iterable} collection - The collection to map.
* @param {Function} mappingFn - The mapping function.
* @returns {Array} A new array of mapped results.
*/
function map(collection, mappingFn) {
	if (Array.isArray(collection)) return mapArray(collection, mappingFn);
	const mapped = [];
	let i = 0;
	for (const item of collection) mapped[i] = mappingFn(item, i++);
	return mapped;
}
//#endregion
//#region src/internals/_flatMap.js
/** @module flatMap */
/**
* Pushes values into an array. If the values are iterable, each element is pushed individually.
* Otherwise, the value itself is pushed.
* @param {Array} array - The array to push values into.
* @param {*} values - The values to be pushed into the array. Can be an iterable or a single value.
* @returns {Array} The array with the new values pushed.
*/
function _push(array, values) {
	if (isArrayType(values)) {
		const length = values.length;
		let i = 0;
		while (i < length) array.push(values[i++]);
	} else array.push(values);
	return array;
}
/**
* flatMapArray - A function that applies a given mapping function to each element of an array,
* then flattens the result into a new array.
* @template T, MappedT
* @param {Array} arr The Array to be mapped and flattened.
* @param {(item: T, i: number) => MappedT} mappingFn The function to apply to each value and key of the Array.
* @returns {MappedT[]} Array containing flattened results of the mapping function.
* @example
* const swap = (val, i) => [val, i];
* flatMapArray(swap, ['a', 'b']); // returns ['a', 0, 'b', 1]
*/
function flatMapArray(arr, mappingFn) {
	const length = arr.length;
	const flattened = [];
	let i = 0;
	while (i < length) _push(flattened, mappingFn(arr[i], i++));
	return flattened;
}
/**
* Applies a mapping function to each value of an object and flattens the result into a single array.
* @template T, MappedT
* @param {object} obj - The Object to be mapped and flattened.
* @param {(value: T, key: number | string) => MappedT} mappingFn - The function to apply to each value and key of the object.
* @returns {MappedT[]} - Array containing flattened results of the mapping function.
* @example
* const swap = (val, key) => [val, key];
* flatMapObject(swap, {a: 1, b: 2}); // returns [1, 'a', 2, 'b']
*/
function flatMapObject(obj, mappingFn) {
	const flattened = [];
	for (const key in obj) if (hasOwn.call(obj, key)) _push(flattened, mappingFn(obj[key], key));
	return flattened;
}
/**
* Applies a mapping function to Iterables with key-value pairs, flattening the results into an array.
* @template T, MappedT
* @param {Iterable} iterable - The Iterable to be mapped and flattened.
* @param {(value: T, key: *) => MappedT} mappingFn - The function to apply to each value and key of the object.
* @returns {MappedT[]} - Array containing flattened results of the mapping function.
* @example
* const swap = (val, key) => [val, key];
* flatMapEntries(swap, new Map([['a', 1],['b', 2]])); // returns [1, 'a', 2, 'b']
*/
function flatMapEntries(iterable, mappingFn) {
	const flattened = [];
	for (const [key, value] of iterable) _push(flattened, mappingFn(value, key));
	return flattened;
}
/**
* Applies a mapping function to each value of a Set and flattens the result into a single array.
* @template T, MappedT
* @param {Set} set - The Set to be mapped and flattened.
* @param {(value: T, value: T) => MappedT} mappingFn - The function to apply to each value of the Set.
* Note: The mapping function receives the value as both the first and second argument to maintain consistency
* with the official spec for Set.prototype.keys() and Set.prototype.values().
* @returns {MappedT[]} - Array containing flattened results of the mapping function.
* @example
* const double = (val) => [val, val];
* flatMapValues(double, new Set(['a', 'b'])); // returns ['a', 'a', 'b', 'b']
*/
function flatMapValues(set, mappingFn) {
	const flattened = [];
	for (const value of set) _push(flattened, mappingFn(value, value));
	return flattened;
}
const dispatchers$1 = [
	[isArrayLike, flatMapArray],
	[isObject, flatMapObject],
	[isMap, flatMapEntries],
	[isSet, flatMapValues]
];
/**
* flatMap - A function that applies a given mapping function to each element of a collection,
* then flattens the result into a new array.
* @function
* @external Iterable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
* @param { Iterable } collection The iterable collection to map over.
* @param { Function } mappingFn A function to be applied to each element.
* @returns { Array } A flattened array of mapped results.
* @example
* const swap = (val, key) => [val, key];
* flatMap(swap, new Map([['a', 1], ['b', 2]])); // returns [1, 'a', 2, 'b']
* flatMap(swap, ['a', 'b']); // returns ['a', 0, 'b', 1]
*
* const double = (val) => [val, val];
* flatMap(double, new Set(['a', 'b'])); // returns ['a', 'a', 'b', 'b']
*/
function flatMap(collection, mappingFn) {
	for (const [check, fn] of dispatchers$1) if (check(collection)) return fn(collection, mappingFn);
	throw new TypeError(`flatMap: unsupported collection type: ${{}.toString.call(collection)}`);
}
//#endregion
//#region src/internals/_reduce.js
/**
* @module reduce
* @description - Optimized reduce functions for Arrays, Objects, and Maps.
* On tests with large datasets these functions are considerably faster than
* using dot chained Vanilla JS conversions and the built-in reduce method.
*/
/**
* reduceArray - A function that reduces an array to a single value.
* @param {Array} arr - The array to reduce.
* @param {Function} reducer - The reducer function.
* @param {...any} args - The accumulator will be taken from the first element of the args array,
* if not provided the first value in the collection will be used. This is a solid alternative
* to checking arguments.length and allows for undefined to be used as an initial value.
* @returns {any} The final accumulator value.
* @example
* const sum = (a, b) => a + b;
* reduceArray([1, 2, 3, 4], sum); // returns 10
*/
function reduceArray(arr, reducer, ...args) {
	const numItems = arr.length;
	let accumulator;
	let i = 0;
	if (args.length) accumulator = args[0];
	else if (numItems) accumulator = arr[i++];
	else throw new TypeError("reduceArray of empty array with no initial value");
	while (i < numItems) accumulator = reducer(accumulator, arr[i], i++);
	return accumulator;
}
/**
* Reduces an array of key-value pairs to a single value using a reducer function.
* @param {Map|Array} entries - The iterable collection of key-value pairs to reduce.
* @param {Function} reducer - The reducer function that takes the accumulator, current value, and current key.
* @param {...any} args - The accumulator will be taken from the first element of the args array,
* if not provided the first value in the collection will be used. This is a solid alternative
* to checking arguments.length and allows for undefined to be used as an initial value.
* @returns {*} The reduced value.
* @example
* reduceMap(
*   new Map([['a', 1], ['b', 3], ['c', 2]]), (acc, val, key) => acc + key.repeat(val), ''
* ) // returns 'abbbcc'
*/
function reduceEntries(entries, reducer, ...args) {
	let iter = entries[Symbol.iterator]();
	let item, accumulator;
	if (args.length) accumulator = args[0];
	else if (!(item = iter.next()).done) accumulator = item.value[1];
	else throw new TypeError("reduceEntries of empty collection with no initial value");
	while (!(item = iter.next()).done) accumulator = reducer(accumulator, item.value[1], item.value[0]);
	return accumulator;
}
/**
* Reduces an iterable collection of values to a single value using a reducer function.
* @param {Set} values - The iterable collection of values to reduce.
* @param {Function} reducer - The reducer function that takes the accumulator and current value.
* @param {...any} args - The accumulator will be taken from the first element of the args array,
* if not provided the first value in the collection will be used.
* @returns {*} The reduced value.
* @example
* reduceValues(new Set([1, 2, 3, 4]), (a, b) => a + b); // returns 10
*/
function reduceValues(values, reducer, ...args) {
	let iter = values[Symbol.iterator]();
	let accumulator, item;
	if (args.length) accumulator = args[0];
	else if (!(item = iter.next()).done) accumulator = item.value;
	else throw new TypeError("reduceValues of empty collection with no initial value");
	while (!(item = iter.next()).done) accumulator = reducer(accumulator, item.value, item.value);
	return accumulator;
}
/**
*
* @param {object} obj - The object to reduce.
* @param {Function} reducer - The reducer function.
* @param {...any} args - The accumulator will be taken from the first element of the args array,
* if not provided the first value in the collection will be used.
* @returns {*} The reduced value.
* @example
* reduceObject({ a: 1, b: 2, c: 3 }, (a, b) => a + b); // returns 6
*/
function reduceObject(obj, reducer, ...args) {
	return reduceEntries(Object.entries(obj), reducer, ...args);
}
const dispatchers = [
	[isArrayLike, reduceArray],
	[isObject, reduceObject],
	[isMap, reduceEntries],
	[isSet, reduceValues]
];
/**
* reduce - A function that reduces an iterable collection to a single value.
* @param {Array|object|Map|WeakMap} collection - The collection to reduce.
* @param {Function} reducer - The reducer function.
* @param {...any} args - The accumulator will be taken from the first element of the args array,
* if not provided the first value in the collection will be used.
* @returns {*} The final accumulator value.
* @example
* reduce([1, 2, 3, 4], (a, b) => a + b); // returns 10
* reduce(
*   new Map([['a', 1], ['b', 3], ['c', 2]]),
*   (acc, val, key) => acc + key.repeat(val),
*   ''
* ) // returns 'abbbcc'
*/
function reduce(collection, reducer, ...args) {
	for (const [check, fn] of dispatchers) if (check(collection)) {
		console.log(check);
		return fn(collection, reducer, ...args);
	}
	throw new TypeError(`reduce: unsupported collection type: ${{}.toString.call(collection)}`);
}
//#endregion
//#region src/internals/_pluck.js
/**
* pluck - A function that plucks specified key values from an array of objects
* @function
* @param {object[]} collection The collection of objects to pluck values from.
* @param {string} key The key to pluck values from.
* @returns {any[]} An array of values plucked from the collection.
* @example
* const people = [{name: 'Fred', age: 42}, {name: 'Barney', age: 40}]
* pluck(people, 'name') // ['Fred', 'Barney']
*/
function pluck(collection, key) {
	const length = collection.length;
	const plucked = Array(length);
	let i = 0;
	while (i < length) {
		plucked[i] = collection[i][key];
		i++;
	}
	return plucked;
}
//#endregion
//#region src/internals/_pickSome.js
/**
* pickSome randomly picks items from an array
* @param {Array} arr - array to map over
* @returns {Array} returns an array of randomly picked items
*/
function pickSome(arr) {
	const length = arr.length;
	const picked = [];
	for (let i = 0; i < length; i++) if (Math.random() < .5) picked.push(arr[i]);
	return picked;
}
//#endregion
//#region src/internals/_wraps.js
/**
* wraps - Updates a wrapper function with properties from the wrapped function.
* @param {Function} fn - The function to wrap.
* @returns {Function} A wrapped function with its own properties.
*/
function wraps(fn) {
	return function(wrapper) {
		return Object.defineProperties(wrapper, {
			name: Object.getOwnPropertyDescriptor(fn, "name"),
			toString: { value: fn.toString.bind(fn) }
		});
	};
}
//#endregion
exports.find = find;
exports.findArray = findArray;
exports.flatMap = flatMap;
exports.flatMapArray = flatMapArray;
exports.flatMapObject = flatMapObject;
exports.get = getFromPath;
exports.map = map;
exports.mapArray = mapArray;
exports.pickSome = pickSome;
exports.pluck = pluck;
exports.prop = prop;
exports.props = props;
exports.reduce = reduce;
exports.reduceArray = reduceArray;
exports.reduceObject = reduceObject;
exports.wraps = wraps;
