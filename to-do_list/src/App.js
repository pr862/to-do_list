import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [category, setCategory] = useState('General');
  const [emoji, setEmoji] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
          category: category,
          emoji: emoji
        }
      ]);
      setInput('');
      setEmoji('');
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      <div className="input-container" style={{ position: 'relative' }}>
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

        {/* Emoji Picker Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            marginLeft: '10px',
            padding: '6px 10px',
            fontSize: '18px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {emoji || '😀'}
        </button>

        {showEmojiPicker && (
          <div style={{ position: 'absolute', top: '100%', zIndex: 999 }}>
            <EmojiPicker
              onEmojiClick={(e) => {
                setEmoji(e.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}

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

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '14px 18px',
          fontSize: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%',
          animation: 'gradientBG 10s ease infinite',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
          zIndex: 1000
        }}
        title="Scroll to Top"
      >
        ⬆
      </button>
    </div>
  );
};

export default App;
