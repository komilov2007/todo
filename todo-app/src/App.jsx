import React, { useState } from 'react';
import './App.css';
import oka from './assets/oka.png';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const getTashkentTime = () => {
    return new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Tashkent',
    });
  };

  const handleAdd = () => {
    if (input.trim() === '') return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? { ...todo, text: input, time: getTashkentTime() }
            : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, time: getTashkentTime() },
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
          placeholder="Enter note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>{editId ? 'Update' : 'Add'}</button>
      </div>

      {todos.length === 0 ? (
        <div className="empty">
          <img src={oka} alt="empty" />
          <p>Empty...</p>
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
