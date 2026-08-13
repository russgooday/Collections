/**
 * @module reduce
 * @description - Optimized reduce functions for Arrays, Objects, and Maps.
 * On tests with large datasets these functions are considerably faster than
 * using dot chained Vanilla JS conversions and the built-in reduce method.
 */

import { isArrayLike, isObject, isMap, isSet } from './_types.js';

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
export function reduceArray(arr, reducer, ...args) {
    const numItems = arr.length;
    let accumulator;
    let i = 0;

    if (args.length) {
        accumulator = args[0];
    } else if (numItems) {
        accumulator = arr[i++];
    } else {
        throw new TypeError('reduceArray of empty array with no initial value');
    }

    while (i < numItems)
        accumulator = reducer(accumulator, arr[i], i++);

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
export function reduceEntries (entries, reducer, ...args) {
    let iter = entries[Symbol.iterator]();
    let item, accumulator;

    if (args.length) {
        accumulator = args[0];
    } else if (!(item = iter.next()).done) {
        accumulator = item.value[1];
    } else {
        throw new TypeError('reduceEntries of empty collection with no initial value');
    }

    while (!(item = iter.next()).done)
        accumulator = reducer(accumulator, item.value[1], item.value[0]);
    return accumulator;
};



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
export function reduceValues (values, reducer, ...args) {
    let iter = values[Symbol.iterator]();
    let accumulator, item;

    if (args.length) {
        accumulator = args[0];
    } else if (!(item = iter.next()).done) {
        accumulator = item.value;
    } else {
        throw new TypeError('reduceValues of empty collection with no initial value');
    }

    while (!(item = iter.next()).done)
        accumulator = reducer(accumulator, item.value, item.value);
    return accumulator;
};


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
export function reduceObject (obj, reducer, ...args) {
    return reduceEntries(Object.entries(obj), reducer, ...args);
}

const dispatchers = [
    [isArrayLike, reduceArray],
    [isObject,    reduceObject],
    [isMap,       reduceEntries],
    [isSet,       reduceValues]
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
export function reduce(collection, reducer, ...args) {
    for (const [check, fn] of dispatchers) {
        if (check(collection)) {
            console.log(check)
            return fn(collection, reducer, ...args);
        }
    }

    throw new TypeError(
        `reduce: unsupported collection type: ${{}.toString.call(collection)}`
    );
}