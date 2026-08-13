// Description: Tests for flatMap function.
import { expect, describe, test } from 'vitest';
import { flatMap } from '../src/collections.js';

describe(
    'Tests for flatMap function',
    () => {
        test(
            'if type of collection is not an Array, Object, Map or Set throws an error',
            () => {
                expect(() => flatMap(1, () => {})).toThrowError(
                    'flatMap: unsupported collection type: [object Number]'
                );
            }
        );

        test(
            'if supplied an empty collection returns an empty array',
            () => {
                const identity = (x) => x;
                const collections = [[], {}, new Map(), new Set()];

                for (const collection of collections) {
                    expect(flatMap(collection, identity)).toEqual([]);
                }
            }
        );

        test(
            'if supplied a collection with one element returns the expected result of the mapping function',
            () => {
                const identity = (x) => x;
                const collections = [[1], { a: 1 }, new Map([[0, 1]]), new Set([1])];

                for (const collection of collections) {
                    expect(flatMap(collection, identity)).toEqual([1]);
                }
            }
        );

        test(
            'if supplied a collection with multiple elements returns the expected result of the mapping function',
            () => {
                const swap = (value, key) => [value, key];
                const collections = [
                    [[1, 2, 3], [1, 0, 2, 1, 3, 2]],
                    [{ a: 1, b: 2, c: 3 }, [1, 'a', 2, 'b', 3, 'c']],
                    [new Map([[0, 1], [1, 2], [2, 3]]), [1, 0, 2, 1, 3, 2]],
                    [new Set([1, 2, 3]), [1, 1, 2, 2, 3, 3]]
                ];

                for (const [collection, expected] of collections) {
                    expect(flatMap(collection, swap)).toEqual(expected);
                }
            }
        );

        test(
            'flattens the result of the mapping function',
            () => {
                const double = (x) => [x, x];
                const collections = [
                    [1, 2, 3],
                    { a: 1, b: 2, c: 3 },
                    new Map([[0, 1], [1, 2], [2, 3]]),
                    new Set([1, 2, 3])
                ];

                for (const collection of collections) {
                    expect(flatMap(collection, double)).toEqual([1, 1, 2, 2, 3, 3]);
                }
            }
        );
    }
);
