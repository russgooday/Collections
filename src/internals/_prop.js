import { hasOwn, isArray } from './_types.js';
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
        if (obj == null)
            return defaultVal;

        if (hasOwn.call(obj, key))
            return obj[key];

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
export function props(keys, defaultVal=undefined) {
    return function (obj) {
        const values = [];

        if (obj != null && isArray(keys)) {

            const length = keys.length;
            let key, i = 0;

            while (i < length) {
                key = keys[i];
                values[i] = (hasOwn.call(obj, key))
                    ? obj[key]
                    : defaultVal;
                i++;
            }

        }

        return values;
    };

}