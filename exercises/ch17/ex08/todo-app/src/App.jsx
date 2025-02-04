// import './App.css';

import { useState } from 'react';

function App() {
  return (
    <>
      <TodoForm />
    </>
  );
}

export default App;

function TodoForm() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo.trim(), completed: false },
    ]);
    setNewTodo(''); // 入力欄をクリア
  }

  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <form id='new-todo-form' onSubmit={handleSubmit}>
        <input
          type='text'
          id='new-todo'
          placeholder='What needs to be done?'
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          value={newTodo}
        />
        <button type='submit'>Add</button>
      </form>
      <ul id='todo-list'>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <label
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </label>
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
