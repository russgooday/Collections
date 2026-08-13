// Type checking functions
export const toString = {}.toString;

export const hasOwn = {}.hasOwnProperty;

export const TYPES = {
    'Arguments': '[object Arguments]',
    'Array': '[object Array]',
    'AsyncFunction': '[object AsyncFunction]',
    'Boolean': '[object Boolean]',
    'Date': '[object Date]',
    'DOMException': '[object DOMException]',
    'Error': '[object Error]',
    'Function': '[object Function]',
    'GeneratorFunction': '[object GeneratorFunction]',
    'Map': '[object Map]',
    'Number': '[object Number]',
    'Null': '[object Null]',
    'Object': '[object Object]',
    'Promise': '[object Promise]',
    'Proxy': '[object Proxy]',
    'RegExp': '[object RegExp]',
    'Set': '[object Set]',
    'String': '[object String]',
    'Symbol': '[object Symbol]',
    'Undefined': '[object Undefined]',
    'WeakMap': '[object WeakMap]',
    'WeakSet': '[object WeakSet]'
};


/**
 * Checks if the given object is an Array.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is an Array, false otherwise.
 */
export function isArray (obj) {
    return toString.call(obj) === TYPES.Array;
}


/**
 * Checks if the given object is an Array, includes TypeArrays.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is an Array, false otherwise.
 */
export function isArrayType (obj) {
    return toString.call(obj).slice(-6,-1) === 'Array';
}


/**
 * Checks if the given object is Array-like, includes Strings.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is array-like, false otherwise.
 */
export function isArrayLike (obj) {
    return obj != null && typeof obj.length === 'number' && obj.length >= 0;
}


/**
 * Checks if the given object is an Object.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is an object, false otherwise.
 */
export function isObject (obj) {
    return toString.call(obj) === TYPES.Object;
}


/**
 * A soft check for enumerable objects
 * e.g. The object properties can be accessed by key/index
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is an object, false otherwise.
 */
export function isObjectLike (obj) {
    return obj != null && typeof obj == 'object';
}


/**
 * Checks if the given object is a Map or WeakMap.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is a Map or WeakMap, false otherwise.
 */
export function isMap (obj) {
    const type = toString.call(obj);
    return type === TYPES.Map || type === TYPES.WeakMap;
}


/**
 * Checks if the given object is a Set or WeakSet.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is a Set or WeakSet, false otherwise.
 */
export function isSet (obj) {
    const type = toString.call(obj);
    return type === TYPES.Set || type === TYPES.WeakSet;
}


/**
 * Checks if the given object is a Function.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is a Function, false otherwise.
 */
export function isFunction (obj) {
    const type = toString.call(obj);
    return type === TYPES.Function || type === TYPES.AsyncFunction;
}


/**
 * Checks if the given object is a String.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is a String, false otherwise.
 */
export function isString (obj) {
    return toString.call(obj) === TYPES.String;
}


/**
 * Checks if the given object is a Number.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is a Number, false otherwise.
 */
export function isNumber (obj) {
    return toString.call(obj) === TYPES.Number;
}


/**
 * Checks if the given object is undefined or null.
 * @param {any} obj - The object to check.
 * @returns {boolean} True if the object is undefined or null, false otherwise.
 */
export function isNil (obj) {
    return obj == null;
}


/**
 * isIterable - Tests if object is Iterable, excludes Strings
 * @param {any} obj the object to test
 * @returns {boolean} true if the object is iterable, false otherwise
 * @example
 * const myMap = new Map([['a', 1], ['b', 2]])
 * isIterable(myMap) // true
 */
export function isIterable (obj) {
    return !isNil(obj) && !isString(obj) && typeof obj[Symbol.iterator] === 'function';
}


/**
 * Returns the internal [[Class]] of an object.
 * @param {any} obj The object whose type is to be determined.
 * @returns {string} The type of the object as a string.
 * @example
 * type([1, 2, 3]) // 'Array'
 * type(new Map([['a', 1], ['b', 2]])) // 'Map'
 */
export function type (obj) {
    return toString.call(obj).slice(8, -1);
}