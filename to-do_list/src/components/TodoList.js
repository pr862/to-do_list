import React, { useState } from 'react';
import TodoItem from './TodoItem';
import Lottie from 'lottie-react';
import emptyAnim from '../animations/empty.json';
import completeAnim from '../animations/celebration.json';

const TodoList = ({ todos, toggleTodo, deleteTodo, categoryColors, setTodos }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleEditSave = (id) => {
    if (editText.trim() === '') return;
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(updated);
    setEditingId(null);
  };

  if (total === 0) {
    return (
      <div className="animation-box">
        <Lottie animationData={emptyAnim} loop={true} style={{ height: 250 }} />
        <p className="status-text">No tasks yet. Add one above! 📝</p>
      </div>
    );
  }

  if (completed === total) {
    return (
      <div className="animation-box">
        <Lottie animationData={completeAnim} loop={false} style={{ height: 250 }} />
        <p className="status-text">🎉 All tasks completed!</p>
      </div>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggle={() => toggleTodo(todo.id)}
          remove={() => deleteTodo(todo.id)}
          categoryColors={categoryColors}
          isEditing={editingId === todo.id}
          editText={editText}
          setEditText={setEditText}
          onEditStart={() => handleEditStart(todo)}
          onEditCancel={handleEditCancel}
          onEditSave={() => handleEditSave(todo.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
