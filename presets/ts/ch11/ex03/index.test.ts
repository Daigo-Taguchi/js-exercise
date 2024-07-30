import { toBigEndian, toLittleEndian } from "./index.ts";

test("toBigEndian test", () => {
  const bytes = new Uint32Array([0x12345678]);
  const result = toBigEndian(bytes);
  expect(result).toStrictEqual(new Uint32Array([0x78563412]));
});

test("toLittleEndian test", () => {
  const bytes = new Uint32Array([0x78563412]);
  const result = toLittleEndian(bytes);
  expect(result).toStrictEqual(new Uint32Array([0x12345678]));
});
