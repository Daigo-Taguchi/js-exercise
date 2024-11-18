const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const tasks = [];

document.addEventListener("DOMContentLoaded", async () => {
  // localStorage からタスクの一覧を JSON オブジェクトで取得する
  // {tasks: [{name: "hoge", status: "active"},{name: "fuga", status: "completed"}]}
  // という構造で保存する
  const taskObj = JSON.parse(localStorage.getItem("tasks"));
  console.log(taskObj);
  if (taskObj && taskObj.tasks) {
    taskObj.tasks.forEach((task) => {
      tasks.push(task);

      const elem = document.createElement("li");

      const label = document.createElement("label");
      label.textContent = task.name;

      const toggle = document.createElement("input");
      toggle.type = "checkbox";
      toggle.checked = task.status === "completed";

      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

      const destroy = document.createElement("button");
      destroy.textContent = "❌";

      destroy.addEventListener("click", () => {
        elem.remove();

        // 削除したタスクを tasks 配列から削除
        const index = tasks.findIndex((t) => t.name === task.name);
        if (index > -1) {
          tasks.splice(index, 1);
        }
        // ローカルストレージの更新
        localStorage.setItem("tasks", JSON.stringify({ tasks }));
      });

      toggle.addEventListener("change", () => {
        label.style.textDecorationLine = toggle.checked
          ? "line-through"
          : "none";
      });

      list.prepend(elem);
      elem.appendChild(toggle);
      elem.appendChild(label);
      elem.appendChild(destroy);
    });
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const todo = input.value.trim();
  tasks.push({ name: todo, status: "active" });

  // 新しいタスクを localStorage に保存
  localStorage.setItem("tasks", JSON.stringify({ tasks }));

  // new-todo の中身は空にする
  input.value = "";

  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo;

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    const index = tasks.findIndex((t) => t.name === todo);
    if (index > -1) {
      tasks[index].status = toggle.checked ? "completed" : "active";
    }
    // ローカルストレージを更新
    localStorage.setItem("tasks", JSON.stringify({ tasks }));
    console.log("change::" + localStorage.getItem("tasks"));
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.addEventListener("click", () => {
    elem.remove();
    // 削除したタスクを tasks 配列から削除
    const index = tasks.findIndex((t) => t.name === todo);
    if (index > -1) {
      tasks.splice(index, 1);
    }
    // ローカルストレージを更新
    localStorage.setItem("tasks", JSON.stringify({ tasks }));
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
});
