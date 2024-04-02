import { equals } from "./index.ts";

test.each([
  [{ x: 1, y: 2 }, { x: 1, y: 2 }, true],
  [{ x: 1, y: 2 }, { y: 2, x: 1 }, true],
  [{}, {}, true],
  [{ x: 1 }, { y: 1 }, false],
  [{ x: 1 }, {}, false],
  [{}, { x: 1 }, false],
  [{ x: 1 }, { x: 1, y: 1 }, false],
  [{ x: 1, y: 2 }, { x: 1 }, false],
])("equals(%p, %p)", (param1, param2, expected) => {
  expect(equals(param1, param2)).toBe(expected);
});
