import { bubbleSort } from "./index.ts";

test("bubbleSort", () => {
  const data = [5, 2, 5, 3, 1];

  expect(bubbleSort(data)).toStrictEqual([1, 2, 3, 5, 5]);
  expect(data).toStrictEqual([1, 2, 3, 5, 5]);
});

test("bubbleSort with string", () => {
  const data = ["apple", "banana", "cherry", "date"];

  expect(bubbleSort(data, (lhs, rhs) => lhs.length - rhs.length)).toStrictEqual(
    ["date", "apple", "banana", "cherry"]
  );
  expect(data).toStrictEqual(["date", "apple", "banana", "cherry"]);
});
