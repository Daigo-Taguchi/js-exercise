import { convertEOL } from "./index.ts";

const input = "Hello\r\nworld\r\ntest\nstring\n";
const expectCRLF = "Hello\r\nworld\r\ntest\r\nstring\r\n";
const expectLF = "Hello\nworld\ntest\nstring\n";

it("convert to LF", () => {
  expect(convertEOL(input, "LF")).toBe(expectLF);
});

it("convert to CRLF", () => {
  expect(convertEOL(input, "CRLF")).toBe(expectCRLF);
});
