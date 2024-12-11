import React from 'react';
import TodoItem from './TodoItem';
function TodoList({ todos, toggleTodo, removeHandle }) {
    return (
        <div>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeHandle={removeHandle} />
            ))}
        </div>
    );
}
export default TodoList;