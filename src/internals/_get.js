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
export function getFromPath (obj, path, defaultValue = undefined) {

    if (typeof path === 'string')
        path = path.split('.')

    for (const part of path) {
        obj = obj[part]

        if (obj === undefined)
            return defaultValue
    }
    return obj;
}