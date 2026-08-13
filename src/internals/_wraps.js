/**
 * wraps - Updates a wrapper function with properties from the wrapped function.
 * @param {Function} fn - The function to wrap.
 * @returns {Function} A wrapped function with its own properties.
 */
function wraps(fn) {
    return function(wrapper) {
        return Object.defineProperties(
            wrapper, {
                name: Object.getOwnPropertyDescriptor(fn, 'name'),
                toString: {
                    value: fn.toString.bind(fn)
                }
            }
        );
    };
}

export { wraps };