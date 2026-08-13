/**
 * pluck - A function that plucks specified key values from an array of objects
 * @function
 * @param {object[]} collection The collection of objects to pluck values from.
 * @param {string} key The key to pluck values from.
 * @returns {any[]} An array of values plucked from the collection.
 * @example
 * const people = [{name: 'Fred', age: 42}, {name: 'Barney', age: 40}]
 * pluck(people, 'name') // ['Fred', 'Barney']
 */
export function pluck(collection, key) {
    const length = collection.length;
    const plucked = Array(length);
    let i = 0;

    while (i < length) {
        plucked[i] = collection[i][key];
        i++;
    }

    return plucked;
}
