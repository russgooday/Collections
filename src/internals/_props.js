import { hasOwn } from './_types.js';

/**
 * Props - A higher order function which gets the value of an object's key.
 * If multiple keys are supplied, an array of values is returned.
 * @function
 * @param {...(string|number)} keys The key(s) to retrieve values for.
 * @returns {(obj: object | any[]) => any | any[]}
 * A function that takes an object or array and returns the value of the specified key(s).
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const getC = prop('c');
 * getC(obj); // returns 3
 *
 * const getAB = prop('a', 'b');
 * getAB(obj); // returns [1, 2]
 */
export function props(...keys) {
    const length = keys.length;
    
    if (length) {
        return function (obj) {
            const values = [];
            let i = -1;

            while (++i < length) {
                const key = keys[i];
                if (hasOwn.call(obj, key))
                    values[i] = (obj[key]);
            }

            return values;
        };
    }
}