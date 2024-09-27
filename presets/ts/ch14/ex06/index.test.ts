import { createMethodTrackingProxy } from "./index.ts";
const mockDate = new Date(2024, 9, 20, 15, 30, 0);
jest.useFakeTimers();
jest.setSystemTime(mockDate);

describe("createMethodTrackingProxy test", () => {
  test("valid case", () => {
    const myObject = {
      year: 10,
      greet(name: string) {
        return `Hello, ${name}!`;
      },
    };
    const { proxy, callHistory } = createMethodTrackingProxy(myObject);
    const expectedDate = new Date("2024-10-20T06:30:00.000Z");

    expect(proxy.greet("Bob")).toStrictEqual("Hello, Bob!");
    expect(callHistory).toStrictEqual([
      { date: expectedDate, methodName: "greet", param: ["Bob"] },
    ]);
    expect(proxy.year).toStrictEqual(10);
  });
});
