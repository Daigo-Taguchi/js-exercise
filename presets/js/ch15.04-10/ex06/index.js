const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.todoList = this.shadowRoot.querySelector("#todo-list");
    // TODO: 残りを実装
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      // 入力欄から文字列を取得
      const newTodoText = this.input.value.trim();

      // 新規の todo 項目を作成
      const newTodoItem = document.createElement("li");

      // 新規の項目のチェックボックスを作成
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // チェックボックスのイベントリスナー
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          newTodoItem.classList.add("completed");
        } else {
          newTodoItem.classList.remove("completed");
        }
      });

      const destroy = document.createElement("button");
      destroy.textContent = "❌";

      destroy.addEventListener("click", () => {
        newTodoItem.remove();
      });

      newTodoItem.textContent = newTodoText;
      newTodoItem.prepend(checkbox);
      newTodoItem.appendChild(destroy);
      this.todoList.appendChild(newTodoItem);

      // 項目を追加したら入力欄を空に戻す
      this.input.value = "";
    });
  }
}

customElements.define("todo-app", TodoApp);
