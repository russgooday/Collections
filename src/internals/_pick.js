/**
 * Pick - A higher order function which returns a new object with only the specified keys.
 * @function
 * @param {...(string|number|symbol)} keys The key(s) to keep in the new object.
 * @returns {(obj: object) => object}
 * A function that takes an object and returns a new object with only the specified key(s).
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * const pickAB = pick('a', 'b');
 * pickAB(obj); // returns { a: 1, b: 2 }
 */
export function pick(...keys) {
    return function (obj) {
        const newObj = {};

        for (const key of keys) {
            if (({}).hasOwnProperty.call(obj, key)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    };
}