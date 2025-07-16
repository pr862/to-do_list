import React from 'react';

const TodoItem = ({
  todo,
  toggle,
  remove,
  categoryColors,
  isEditing,
  editText,
  setEditText,
  editCategory,
  setEditCategory,
  onEditStart,
  onEditCancel,
  onEditSave
}) => {
  const color = categoryColors[todo.category] || '#999';

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                padding: '6px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: '6px'
              }}
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              style={{
                borderRadius: '6px',
                padding: '6px',
                fontWeight: '500',
                marginBottom: '8px'
              }}
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={onEditSave}>💾 Save</button>
              <button onClick={onEditCancel}>❌ Cancel</button>
            </div>
          </>
        ) : (
          <>
            <span>
              {todo.emoji && <span style={{ marginRight: '8px' }}>{todo.emoji}</span>}
              {todo.text}
            </span>
            <small style={{ color, fontWeight: 'bold' }}>
              📁 {todo.category}
            </small>
          </>
        )}
      </div>

      {!isEditing && (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={toggle}>
            {todo.completed ? '↩️' : '✅'}
          </button>
          <button onClick={onEditStart}>✏️</button>
          <button onClick={remove}>🗑️</button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
