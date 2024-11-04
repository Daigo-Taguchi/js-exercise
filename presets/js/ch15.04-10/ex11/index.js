const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

// hashchange イベントで、hash の切り替わりがイベントで通知される
// ALL が #
// Active が #/active
// completed が #/completed
// となっていて、ページ遷移するごとに hash が変更されるのでイベントが通知される
window.addEventListener("hashchange", () => {
  // ここを実装してね
  console.log(window.location.hash);
  const hash = window.location.hash;

  const actives = [];
  const completes = [];

  todos.forEach((todo) => {
    if (todo.completed) {
      completes.push(todo);
    } else {
      actives.push(todo);
    }
  });

  // ALL
  if (hash === "#/") {
    renderTodos(todos);
  }

  // Active
  if (hash === "#/active") {
    renderTodos(actives);
  }

  // Completed
  if (hash === "#/completed") {
    renderTodos(completes);
  }
});
