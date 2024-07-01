import { instanceOf } from "./index.ts";

class SuperClass {
  private num;

  constructor(num: number) {
    this.num = num;
  }
}

class SubClass extends SuperClass {
  private str;

  constructor(num: number, str: string) {
    super(num);
    this.str = str;
  }
}

test("valid case", () => {
  const child = new SubClass(2, "hoge");
  expect(instanceOf(child, SuperClass)).toBe(child instanceof SuperClass);
});

test("invalid case", () => {
  const instance = new SuperClass(1);
  expect(instanceOf(instance, Array)).toBe(instance instanceof Array);
});
