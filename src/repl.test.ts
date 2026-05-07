import { cleanInput } from "./repl.js";
import { Cache } from "./pokecache.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: " hello world  ",
        expected: ["hello", "world"],
    },
    {
        input: "   foo   bar   baz   ",
        expected: ["foo", "bar", "baz"],
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        expect(cleanInput(input)).toEqual(expected);

        expect(cleanInput(input)).toHaveLength(expected.length);
        for (const i in expected) {
            expect(cleanInput(input)[i]).toBe(expected[i]);
        }
    });
});

test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500,
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000,
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval * 2));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});