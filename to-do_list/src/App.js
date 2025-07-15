import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [category, setCategory] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const categoryColors = {
    General: '#888',
    Work: '#00bcd4',
    Personal: '#ff9800',
    Urgent: '#e53935'
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          completed: false,
          category: category
        }
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setTodos(activeTodos);
  };

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id) => {
    if (editText.trim() === '') return;
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(updated);
    setEditingId(null);
    setEditText('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>My Creative Todo ✨</h1>

      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          marginBottom: '15px',
          fontSize: '16px',
          border: '2px solid #ccc'
        }}
      />

      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Add a task..."
          onChange={(e) => setInput(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            borderRadius: '10px',
            padding: '12px',
            fontWeight: '600'
          }}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <button onClick={addTodo}>Add</button>
      </div>

      {todos.some((todo) => todo.completed) && (
        <button onClick={clearCompleted} className="clear-btn">
          🧹 Clear Completed
        </button>
      )}

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        categoryColors={categoryColors}
        setTodos={setTodos}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
        onEditStart={handleEditStart}
        onEditCancel={handleEditCancel}
        onEditSave={handleEditSave}
      />
    </div>
  );
};

export default App;
