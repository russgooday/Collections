/**
 * findArray - A function that searches an array for the first item that satisfies a predicate.
 * @param {Array} arr - The array to search.
 * @param {Function} predicate - The predicate function.
 * @returns {any|undefined} The first item that satisfies the predicate, or undefined.
 * @example
 * const isEven = (n) => n % 2 === 0;
 * findArray([1, 2, 3, 4], isEven); // 2
 */
export function findArray(arr, predicate) {
    const length = arr.length;
    let i = 0;
    while (i < length) {
        const item = arr[i++];
        if (predicate(item))
            return item;
    }
    return undefined;
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
export function find(collection, predicate) {
    // if an Array, use the faster findArray
    if (Array.isArray(collection))
        return findArray(collection, predicate);

    for (const item of collection) {
        if (predicate(item)) return item;
    }
    return undefined;
}