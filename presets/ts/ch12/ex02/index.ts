export function fibonacciSequence(): IterableIterator<number> {
  let x = 0;
  let y = 1;
  return {
    [Symbol.iterator](): IterableIterator<number> {
      return this;
    },
    next(): IteratorResult<number> {
      [x, y] = [y, x + y];
      return { value: x, done: false };
    },
  };
}
