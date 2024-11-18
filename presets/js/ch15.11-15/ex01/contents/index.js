const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

console.log(document.cookie);
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const getTasksResult = await fetch("/api/tasks", {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  if (!getTasksResult.ok) {
    alert("タスク一覧の取得に失敗しました");
  }
  const result = await getTasksResult.json();
  console.log("タスクの一覧取得成功", result);
  for (const item of result.items) {
    appendToDoItem(item);
  }
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // submit イベントのデフォルトの動作では、ブラウザによってサーバーにフォームデータを送信して、
  // その後ページをリロードするというデフォルトの動作が行われる。
  // このイベントのキャンセルを行わないと、ブラウザがページをリロードしてしまい、入力されたデータ保持できなくなる

  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const createTaskResult = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ name: todo }),
  });
  if (!createTaskResult.ok) {
    alert("タスクの作成に失敗しました");
  }
  const result = await createTaskResult.json();
  console.log("タスクの作成成功", result);
  appendToDoItem(result);
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  let status = "";
  toggle.addEventListener("change", async () => {
    if (toggle.checked) {
      status = "completed";
    } else {
      status = "active";
    }
    const updateResult = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ id: task.id, status }),
    });
    if (!updateResult.ok) {
      alert("タスクの更新に失敗しました");
    }
    console.log("タスクの更新成功", await updateResult.json());

    // トグルの状態を変更するために、サーバーからタスクの状態を取得する
    // フロント側でタスクの状態を保持したくないので、更新をしたらサーバーから状態を毎回取得する
    const getTaskResult = await fetch(`/api/tasks/${task.id}`, {
      method: "GET",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!getTaskResult.ok) {
      alert("タスクの取得に失敗しました");
    }
    const result = await getTaskResult.json();
    console.log("タスクの取得成功", result);

    if (result.status === "completed") {
      label.style.textDecorationLine = "line-through";
    } else {
      label.style.textDecorationLine = "none";
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    const deleteTaskResult = await fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!deleteTaskResult.ok) {
      alert("タスクの削除に失敗しました");
    }
    console.log("タスクの削除成功");
    elem.remove();
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle);
  elem.append(label);
  elem.append(destroy);

  list.prepend(elem);
}
