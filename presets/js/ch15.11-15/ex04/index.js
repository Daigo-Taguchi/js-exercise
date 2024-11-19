// localStorage の存在確認を行うことでエラーを回避する
// 本コードを localStorage で管理する方法に寄せてしまったのでほとんど動かなくなってしまうため
// 試すことができなかった

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // localStorage からタスクの一覧を JSON オブジェクトで取得する
  // {tasks: [{name: "hoge", status: "active"},{name: "fuga", status: "completed"}]}
  // {id: {name: "hoge", status: "completed"}} のように保存する
  Object.keys(localStorage).forEach((id) => {
    const task = JSON.parse(localStorage.getItem(id));

    // localStorage 内の value の構造が {name: "hoge", status: "active"} の形じゃなければ skip
    if (!task || !task.name || !task.status) {
      return;
    }

    const elem = document.createElement("li");
    elem.dataset.id = id;

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
      // ローカルストレージの更新
      localStorage.removeItem(id);
    });

    toggle.addEventListener("change", () => {
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
      const status = toggle.checked ? "completed" : "active";

      // localStorage 内のタスクの状態を更新する
      localStorage.setItem(id, JSON.stringify({ name: task.name, status }));
    });

    list.prepend(elem);
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const todo = input.value.trim();

  // 同一の名前のタスクを区別するために、UUID で id を振っている
  const id = crypto.randomUUID();
  // 新しいタスクを localStorage に保存
  localStorage.setItem(id, JSON.stringify({ name: todo, status: "active" }));

  // new-todo の中身は空にする
  input.value = "";

  const elem = document.createElement("li");
  elem.dataset.id = id;
  console.log(id);

  const label = document.createElement("label");
  label.textContent = todo;

  const toggle = document.createElement("input");
  toggle.type = "checkbox";

  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    const status = toggle.checked ? "completed" : "active";

    // ローカルストレージを更新
    localStorage.setItem(id, JSON.stringify({ name: todo, status }));
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  destroy.addEventListener("click", () => {
    elem.remove();

    // ローカルストレージを更新
    localStorage.removeItem(id);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  list.prepend(elem);
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
});

window.addEventListener("storage", (event) => {
  console.log("発火");

  // newValue が null の場合はタスクが削除された
  if (event.newValue === null) {
    // 削除されたタスクを画面からも削除
    console.log("削除" + event.key);
    const itemToDelete = list.querySelector(`li[data-id="${event.key}"]`);
    if (itemToDelete) {
      console.log("check");
      itemToDelete.remove();
    }
    return; // 削除時は以降の処理をスキップ
  }

  const newTask = JSON.parse(event.newValue);
  const existingTask = list.querySelector(`li[data-id="${event.key}"]`);

  // 既存のタスクの更新の場合
  if (existingTask) {
    const label = existingTask.querySelector("label");
    const toggle = existingTask.querySelector("input[type='checkbox']");

    label.textContent = newTask.name;
    toggle.checked = newTask.status === "completed";
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    return;
  }

  // 新規タスクの追加の場合
  const elem = document.createElement("li");
  elem.dataset.id = event.key;

  const label = document.createElement("label");

  label.textContent = newTask.name;

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = newTask.status === "completed";

  label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  destroy.addEventListener("click", () => {
    elem.remove();

    // ローカルストレージを更新
    localStorage.removeItem(event.key);
  });

  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    const status = toggle.checked ? "completed" : "active";

    // localStorage 内のタスクの状態を更新する
    localStorage.setItem(
      event.key,
      JSON.stringify({ name: newTask.name, status })
    );
  });

  list.prepend(elem);
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
});
