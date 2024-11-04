import "./index.js";

describe("inline-circle", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <inline-circle box-shadow="3px 1px 1px red"></inline-circle>
    `;
  });

  test("inline circle に box-shadow 要素が追加されていること", () => {
    const inlineCircle = screen.getByTagName("inline-circle");
    const boxShadow = window.getComputedStyle(inlineCircle).boxShadow;

    expect(boxShadow).toBe("3px 1px 1px red");
  });
});

// jest の中でどうって customElement を定義したらいいのか分からなかった
