const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const MAX_RETRY_COUNT = 3;
const TIMEOUT = 3000;

const hostURL = "http://localhost:3001";

let isProcessing = false;

// タスクの入力欄、追加ボタン、削除ボタン、更新ボタンの
// 有効、無効を切り替える
function toggleInteraction(disabled) {
  form.querySelector("button").disabled = disabled;
  input.disabled = disabled;
  list.querySelectorAll("input, button").forEach((element) => {
    element.disabled = disabled;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  isProcessing = true;
  toggleInteraction(true);
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const url = new URL("/api/tasks", hostURL);
  retryWithExponentialBackoff(
    async () =>
      // デフォルトで CORS モードになる
      await fetchWithTimeout(url, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
        timeout: TIMEOUT,
      }),
    MAX_RETRY_COUNT,
    async (result) => {
      isProcessing = false;
      toggleInteraction(false);
      if (result.ok) {
        const tasks = await result.json();
        console.log("タスクの一覧取得成功", tasks);
        for (const item of tasks.items) {
          appendToDoItem(item);
        }
      } else {
        alert("タスクの一覧取得に失敗しました");
      }
    }
  );
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // submit イベントのデフォルトの動作では、ブラウザによってサーバーにフォームデータを送信して、
  // その後ページをリロードするというデフォルトの動作が行われる。
  // このイベントのキャンセルを行わないと、ブラウザがページをリロードしてしまい、入力されたデータ保持できなくなる
  e.preventDefault();
  if (isProcessing) return;

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  isProcessing = true;
  toggleInteraction(true);

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  const url = new URL("/api/tasks", hostURL);
  retryWithExponentialBackoff(
    async () =>
      await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify({ name: todo }),
        timeout: TIMEOUT,
      }),
    MAX_RETRY_COUNT,
    async (result) => {
      isProcessing = false;
      toggleInteraction(false);
      if (result.ok) {
        const task = await result.json();
        console.log("タスクの作成成功", task);
        appendToDoItem(task);
      } else {
        alert("タスクの作成に失敗しました");
      }
    }
  );
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;

  // checkbox
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";
  toggle.checked = task.status === "completed";

  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    if (isProcessing) return;

    isProcessing = true;
    toggleInteraction(true);

    const status = toggle.checked ? "completed" : "active";

    const url = new URL(`/api/tasks/${task.id}`, hostURL);
    retryWithExponentialBackoff(
      async () =>
        await fetchWithTimeout(url, {
          method: "PATCH",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          credentials: "include",
          body: JSON.stringify({ id: task.id, status }),
          timeout: TIMEOUT,
        }),
      MAX_RETRY_COUNT,
      async (result) => {
        isProcessing = false;
        toggleInteraction(false);

        if (result.ok) {
          const task = await result.json();
          console.log("タスクの更新に成功", task);
          label.style.textDecorationLine =
            task.status === "completed" ? "line-through" : "none";
        } else {
          alert("タスクの更新に失敗しました");
          toggle.checked = !toggle.checked;
        }
      },
      () => {
        toggle.checked = !toggle.checked;
      }
    );
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    if (isProcessing) return;

    isProcessing = true;
    toggleInteraction(true);

    const url = new URL(`/api/tasks/${task.id}`, hostURL);

    retryWithExponentialBackoff(
      async () =>
        fetchWithTimeout(url, {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          credentials: "include",
          timeout: TIMEOUT,
        }),
      MAX_RETRY_COUNT,
      async (result) => {
        isProcessing = false;
        toggleInteraction(false);
        if (result.ok) {
          console.log("タスクの削除成功");
          elem.remove();
        } else {
          alert("タスクの削除に失敗しました");
        }
      }
    );
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

// status code が 500 台の時にリトライを実施する関数
// リトライ中にタイムアウトが発生したら alert を出してリトライ処理を停止
async function retryWithExponentialBackoff(func, maxRetry, callback, onError) {
  let count = 0;

  const execute = async () => {
    try {
      const result = await func();

      // リトライ回数を満たしていたら無条件で終了
      if (count >= maxRetry) {
        callback(result);
        return;
      }
      // ステータスコードが 500 台じゃなければ終了
      if (!(500 <= result.status && result.status < 600)) {
        callback(result);
        return;
      }
      count++;

      const waitTime = Math.pow(2, count - 1) * 1000;
      setTimeout(execute, waitTime);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("リトライ中にタイムアウトが発生しました");
        alert("タイムアウトが発生しました");
        isProcessing = false;
        toggleInteraction(false);
      } else {
        console.error("リトライ中に予期せぬエラーが発生しました", error);
      }

      // タイムアウトが発生した場合に呼び出し元に通知
      // ここで通知することで、タイムアウトが発生して処理が中断した際の制御をできるようにする
      // (タイムアウトが発生したら、チェックボックスを元に戻すなど)
      if (onError) {
        onError(error);
      }
    }
  };
  execute();
}

function fetchWithTimeout(url, options = {}) {
  const { timeout, ...fetchOptions } = options;
  if (timeout) {
    const controller = new AbortController();
    setTimeout(() => {
      controller.abort();
    }, options.timeout);

    fetchOptions.signal = controller.signal;
  }

  return fetch(url, fetchOptions);
}
