import { hasOwn } from './_types.js';
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
export function prop(key, defaultVal=undefined) {
    return function (obj) {
        if (hasOwn.call(obj, key))
            return obj[key];
        return defaultVal;
    };
}