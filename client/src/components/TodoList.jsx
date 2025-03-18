import React, { useState } from 'react';
import TodoItem from './TodoItem';

export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);

    function handleInputChange(e) {
        // Update the newTodo state whenever the input changes.
        setNewTodo(e.target.value);
    }

    function handleAddClick() {
        // Add the new todo to the list of todos.
        // Prevent adding an "empty" todo.
        if (newTodo.trim() === '') return;

        setTodos([...todos, {text: newTodo, completed: false}]);
        setNewTodo('');
    }

    function handleDeleteClick(index) {
        // Delete the todo at the given index.
        const updatedTodos = todos.filter(function (_, i) {
            return i !== index;
        });
        setTodos(updatedTodos);
    }

    function handleEditClick(index, editedText) {
        // Edit the todo at the given index.
        const updatedTodos = todos.map(function (todo, i) {
            if (i === index) {
                return editedText.trim() === '' ? todo : {
                    ...todo,
                    text: editedText
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    function handleToggleComplete(index) {
        // Toggle the "completed" status of the todo at the given index.
        const updatedTodos = todos.map(function (todo, i) {
            if (i === index) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    }


    return (
        <div>
            <h2>Todo List:</h2>
            <div className="todo-input-wrapper">
                <input
                    className="todo-input" 
                    type="text" 
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            handleAddClick();
                        }
                    }}
                    placeholder="Enter a todo item"
                />
                <button className="add-button" onClick={handleAddClick}>Add Todo</button>
            </div>
            <div className="todo-section">
                {todos.length === 0 ? (
                    <p className="empty-message">No todos yet!</p>
                ) : (
                    <ul className="todo-list">
                        {todos.map(function (todo, index) {
                            return (
                                <TodoItem
                                    key={index}
                                    todo={todo}
                                    index={index}
                                    onDelete={handleDeleteClick}
                                    onEdit={handleEditClick}
                                    onToggleComplete={handleToggleComplete}
                                />
                            );
                            })}
                    </ul>
                )}
            </div>
        </div>
    );
}