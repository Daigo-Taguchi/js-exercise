import { Obj } from "../ex06/index.ts";

test("ex 6.9", () => {
  const mock = jest.fn();

  const obj: Obj = {
    x: 0,
    y: 0,
    sum() {
      mock();
      return this.x + this.y;
    },
  };

  // ここに１行のコードを書く
  obj.toJSON = () => {
    return {
      x: obj.x,
      y: obj.y,
      sum: obj.sum(),
    };
  };

  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
