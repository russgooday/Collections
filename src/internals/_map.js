/**
 * mapArray - A function that maps an array to a new array.
 * @param {Array} arr - The array to map.
 * @param {Function} mappingFn - The mapping function.
 * @returns {Array} A new array of mapped results.
 * @example
 * const double = (n) => n * 2;
 * mapArray([1, 2, 3, 4], double); // returns [2, 4, 6, 8]
 */
export function mapArray(arr, mappingFn) {
    const length = arr.length;
    const mapped = Array(length);
    let i = 0;

    while (i < length)
        mapped[i] = mappingFn(arr[i], i++);
    return mapped;
}

/**
 * map - A function that maps an iterable collection to a new array.
 * @external Iterable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 * @param {Iterable} collection - The collection to map.
 * @param {Function} mappingFn - The mapping function.
 * @returns {Array} A new array of mapped results.
 */
export function map(collection, mappingFn) {
    // if an Array, use the faster mapArray
    if (Array.isArray(collection))
        return mapArray(collection, mappingFn);

    const mapped = [];
    let i = 0;

    for (const item of collection)
        mapped[i] = mappingFn(item, i++);

    return mapped;
}