const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    li.classList.toggle("completed", toggle.checked);
  });
  label.textContent = todo;

  destroy.addEventListener("click", () => {
    li.classList.add("freeze"); // れいとうビームのエフェクトを追加
    setTimeout(() => {
      li.remove(); // エフェクト後に項目を完全に削除
    }, 1000); // 1秒後に削除
  });

  list.prepend(li);
});
