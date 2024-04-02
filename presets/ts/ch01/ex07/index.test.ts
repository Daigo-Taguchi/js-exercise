import { Point } from "./index.ts";

describe("Point", () => {
  it("valid case when (1,1) + (1,3)", () => {
    const point = new Point(1, 1);
    const point2 = new Point(1, 3);
    expect(point.add(point2)).toStrictEqual(new Point(2, 4));
  });
});
