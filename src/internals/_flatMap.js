import { hasOwn, isArrayType, isArrayLike, isObject, isMap, isSet } from './_types.js';
/** @module flatMap */

/**
 * Pushes values into an array. If the values are iterable, each element is pushed individually.
 * Otherwise, the value itself is pushed.
 * @param {Array} array - The array to push values into.
 * @param {*} values - The values to be pushed into the array. Can be an iterable or a single value.
 * @returns {Array} The array with the new values pushed.
 */
function _push (array, values) {
    // ...spreading arguments is limited by the maximum call stack size
    if (isArrayType(values)) {
        const length = values.length;
        let i = 0;
        while (i < length)
            array.push(values[i++]);
    } else {
        array.push(values);
    }
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
export function flatMapArray(arr, mappingFn) {
    const length = arr.length;
    const flattened = [];
    let i = 0;

    while (i < length)
        _push(flattened, mappingFn(arr[i], i++));

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
export function flatMapObject(obj, mappingFn) {
    const flattened = [];

    for (const key in obj)
        if (hasOwn.call(obj, key))
            _push(flattened, mappingFn(obj[key], key));

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
export function flatMapEntries(iterable, mappingFn) {
    const flattened = [];

    for (const [key, value] of iterable)
        _push(flattened, mappingFn(value, key));

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
export function flatMapValues(set, mappingFn) {
    const flattened = [];

    for (const value of set)
        _push(flattened, mappingFn(value, value));

    return flattened;
}

const dispatchers = [
    [isArrayLike, flatMapArray],
    [isObject,    flatMapObject],
    [isMap,       flatMapEntries],
    [isSet,       flatMapValues]
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
export function flatMap (collection, mappingFn) {
    for (const [check, fn] of dispatchers) {
        if (check(collection))
            return fn(collection, mappingFn);
    }

    throw new TypeError(
        `flatMap: unsupported collection type: ${{}.toString.call(collection)}`
    );
}