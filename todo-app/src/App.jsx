import React, { useState } from 'react';
import './App.css';
import Oka from './assets/oka.png';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (input.trim() === '') return;
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? { ...todo, text: input, time: new Date().toLocaleString() }
            : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          time: new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Tashkent',
          }),
        },
      ]);
    }
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todo = todos.find((t) => t.id === id);
    setInput(todo.text);
    setEditId(id);
  };

  return (
    <div className="app">
      <h1>TODO LIST</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="To do yozing boling"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>{editId ? 'Yangilash' : 'Qoshish'}</button>
      </div>

      {todos.length === 0 ? (
        <div className="empty">
          <img src="oka" alt="empty" />
          <p>to do list yoq...</p>
        </div>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div>
                <strong>{todo.text}</strong>
                <small>{todo.time}</small>
              </div>
              <div className="btns">
                <button onClick={() => handleEdit(todo.id)}>✏️</button>
                <button onClick={() => handleDelete(todo.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
