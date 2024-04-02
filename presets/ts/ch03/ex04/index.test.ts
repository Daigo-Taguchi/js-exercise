it("Hundred Points Symbol's length", () => {
  expect("💯".length).toBe(2);
});

it("Hundred Points Symbol's code point test", () => {
  expect(`\uD83D\uDCAF` === `\u{0001F4AF}`).toBe(true);
});
