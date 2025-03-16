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
            <input type="text" value={newTodo} onChange={handleInputChange} />
            <button onClick={handleAddClick}>Add Todo</button>
        </div>
    );
}