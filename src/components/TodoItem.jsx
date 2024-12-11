import React from 'react';

function TodoItem({ todo, toggleTodo, removeHandle }) {
    return (
        <div className="todoitem">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button type="button" onClick={() => removeHandle(todo.id)}>Remove</button>
        </div>
    );
}
export default TodoItem;
