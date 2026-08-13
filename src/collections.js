/**
 * @module collections
 * @description - A collection of optimized functions for working with collections of data.
 * These functions are optimized for performance and are considerably faster than using
 * dot chained Vanilla JS conversions and the built-in methods.
 */

export { prop, props } from './internals/_prop.js';
export { getFromPath as get } from './internals/_get.js';
export { find, findArray } from './internals/_find.js';
export { map, mapArray } from './internals/_map.js';
export { flatMap, flatMapObject, flatMapArray } from './internals/_flatMap.js';
export { reduce, reduceArray, reduceObject } from './internals/_reduce.js';
export { pluck } from './internals/_pluck.js';
export { pickSome } from './internals/_pickSome.js';
export { wraps } from './internals/_wraps.js';