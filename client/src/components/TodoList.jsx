import React, { useState } from 'react';

export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);

    function handleInputChange(e) {
        setNewTodo(e.target.value);
    }

    function handleAddClick() {
        // Prevent adding an "empty" todo.
        if (newTodo.trim() === '') return;

        setTodos([...todos, newTodo]);
        setNewTodo('');
    }


    return (
        <div>
            <h2>Todo List</h2>
            <div className="todo-input-wrapper">
                <input
                    className="todo-input" 
                    type="text" 
                    value={newTodo}
                    onChange={handleInputChange}
                    placeholder="Enter a todo item"
                />
                <button className="add-button" onClick={handleAddClick}>Add Todo</button>
            </div>
            <div className="todo-section">
                {todos.length === 0 ? (<p className="empty-message">No todos yet!</p>) : (
                    <ul className="todo-list">
                        {todos.map(function (todo, index) {
                            return <li className="todo-item" key={index}>{todo}</li>;
                            })}
                        </ul>
                    )}
            </div>
        </div>
    );
}