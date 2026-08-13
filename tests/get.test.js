import { expect, describe, test } from 'vitest';
import { get } from '../src/collections.js';

describe('get',

    () => {

        describe('string path',
            () => {
                test('retrieves a top-level property', () => {
                    expect(get({ a: 1 }, 'a')).toBe(1);
                });

                test('retrieves a nested property via dot notation', () => {
                    expect(get({ a: { b: 2 } }, 'a.b')).toBe(2);
                });

                test('retrieves a deeply nested property', () => {
                    expect(get({ a: { b: { c: { d: 4 } } } }, 'a.b.c.d')).toBe(4);
                });

                test('returns undefined when path does not exist', () => {
                    expect(get({ a: 1 }, 'b')).toBeUndefined();
                });

                test('returns undefined when intermediate segment does not exist', () => {
                    expect(get({ a: 1 }, 'a.b.c')).toBeUndefined();
                });

                test('returns the defaultValue when path does not exist', () => {
                    expect(get({ a: 1 }, 'b', 'fallback')).toBe('fallback');
                });

                test('returns the defaultValue when an intermediate segment is missing', () => {
                    expect(get({ a: 1 }, 'a.b', 'fallback')).toBe('fallback');
                });

                test('does not return defaultValue for falsy values (0)', () => {
                    expect(get({ a: 0 }, 'a', 99)).toBe(0);
                });

                test('does not return defaultValue for falsy values (false)', () => {
                    expect(get({ a: false }, 'a', 'fallback')).toBe(false);
                });

                test('does not return defaultValue for falsy values (empty string)', () => {
                    expect(get({ a: '' }, 'a', 'fallback')).toBe('');
                });

                test('does not return defaultValue for null', () => {
                    expect(get({ a: null }, 'a', 'fallback')).toBeNull();
                });
            }
        );

        describe('array path',
            () => {
                test('retrieves a top-level property', () => {
                    expect(get({ a: 1 }, ['a'])).toBe(1);
                });

                test('retrieves a nested property', () => {
                    expect(get({ a: { b: 2 } }, ['a', 'b'])).toBe(2);
                });

                test('retrieves an array element by numeric index', () => {
                    expect(get({ a: ['x', 'y', 'z'] }, ['a', 1])).toBe('y');
                });

                test('retrieves a deeply nested property', () => {
                    expect(get({ a: { b: { c: 3 } } }, ['a', 'b', 'c'])).toBe(3);
                });

                test('returns undefined when path does not exist', () => {
                    expect(get({ a: 1 }, ['b'])).toBeUndefined();
                });

                test('returns the defaultValue when path does not exist', () => {
                    expect(get({}, ['a', 'b'], 'default')).toBe('default');
                });
            }
        );
    }
);