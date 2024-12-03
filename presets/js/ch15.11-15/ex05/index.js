const INDEX_DB_VER = 1;

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  withDB((db) => {
    // トランザクションオブジェクトを作成
    // 読み出し専用
    const transaction = db.transaction("taskStore");

    // オブジェクトストアを作成
    const tasksObjectStore = transaction.objectStore("taskStore");
    const request = tasksObjectStore.getAll();

    request.onsuccess = (event) => {
      const tasks = event.target.result;

      tasks.forEach((task) => {
        if (!task || !task.name || !task.status) {
          return;
        }
        renderTask(task);
      });
    };
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }

  const taskName = input.value.trim();
  addTaskToDB(taskName);

  // new-todo の中身は空にする
  input.value = "";
});

// データベースオブジェクトを取得する
// 必要であれば DB を作成して初期化する
function withDB(callback) {
  const request = indexedDB.open("todoAppDB", INDEX_DB_VER);

  request.onerror = console.error;

  request.onsuccess = () => {
    const db = request.result;
    callback(db);
  };

  // 指定したデータベースのバージョンが存在しない場合はこのイベントハンドラが起動する
  request.onupgradeneeded = () => {
    request.result.createObjectStore("taskStore", {
      keyPath: "id",
      autoIncrement: true,
    });
  };
}

// タスクの削除
function deleteTask(db, id, elem) {
  // 読み書きのトランザクションを取得
  const transaction = db.transaction("taskStore", "readwrite");
  const store = transaction.objectStore("taskStore");
  const request = store.delete(id);

  request.onsuccess = () => {
    elem.remove();
  };
}

function updateTaskStatus(db, id, status) {
  const transaction = db.transaction("taskStore", "readwrite");
  const store = transaction.objectStore("taskStore");
  const request = store.get(id);

  request.onsuccess = () => {
    const task = request.result;
    if (task) {
      task.status = status;
      // db の task の内容を更新する
      store.put(task);
    }
  };
}

function addTaskToDB(name) {
  withDB((db) => {
    const transaction = db.transaction("taskStore", "readwrite");
    const store = transaction.objectStore("taskStore");

    const newTask = { name, status: "active" };

    const request = store.add(newTask);

    request.onsuccess = () => {
      console.log("成功");
      const id = request.result;
      console.log({ id, ...newTask });
      renderTask({ id, ...newTask });
    };
  });
}

function renderTask(task) {
  const elem = document.createElement("li");
  elem.dataset.id = task.id;

  const label = document.createElement("label");
  label.textContent = task.name;

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

  const destroy = document.createElement("button");
  destroy.textContent = "❌";

  destroy.addEventListener("click", () => {
    withDB((db) => {
      deleteTask(db, task.id, elem);
    });
  });

  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    const status = toggle.checked ? "completed" : "active";

    withDB((db) => {
      updateTaskStatus(db, task.id, status);
    });
  });

  list.prepend(elem);
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
}
