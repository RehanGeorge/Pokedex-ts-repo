import { cleanInput } from "./repl.js";
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