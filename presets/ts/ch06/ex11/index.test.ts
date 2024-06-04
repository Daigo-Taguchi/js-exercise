import { obj } from "./index.ts";

test("ex 6.11", () => {
  expect(obj.r).toStrictEqual(2);
  expect(obj.theta).toStrictEqual(Math.PI / 4);
  expect(obj.accessorProp).toStrictEqual({
    x: Math.cos(obj.theta),
    y: Math.sin(obj.theta),
  });

  obj.accessorProp = { x: 3, y: 4 };
  expect(obj.r).toStrictEqual(Math.hypot(3, 4));
  expect(obj.theta).toStrictEqual(Math.atan2(3, 4));
  expect(obj.accessorProp).toStrictEqual({
    x: Math.cos(obj.theta),
    y: Math.sin(obj.theta),
  });
});
