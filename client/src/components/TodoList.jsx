import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';


export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filterType, setFilterType] = useState('all'); // "all", "completed", "incomplete"

    // Load todos from localStorage on mount
    useEffect(function () {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        setIsLoaded(true);
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(function () {
        if (isLoaded) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

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

    function handleClearAllClick() {
        // Clear all todos.
        setTodos([]);
        localStorage.removeItem("todos");
    }

    const filteredTodos = todos.filter(function (todo) {
        // Filter the todos based on the selected filter type.
        if (filterType === "incomplete") {
            return !todo.completed;
        } else if (filterType === "completed") {
            return todo.completed;
        } else {
            return true; // "all"
        }
    });

    return (
        <div>
            <h2>Todo List:</h2>
            {/* Input field and Add button */}
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

            {/* Filter buttons */}
            <div className="filters-container">
                <div>
                    <span>Filters:</span>
                    <button className={`filter-button ${filterType === "all" ? "active" : ""}`} onClick={function () {setFilterType("all")}}>All</button>
                    <button className={`filter-button ${filterType === "incomplete" ? "active" : ""}`} onClick={function () {setFilterType("incomplete")}}>Incomplete</button>
                    <button className={`filter-button ${filterType === "completed" ? "active" : ""}`} onClick={function () {setFilterType("completed")}}>Completed</button>
                </div>
                
                <span className="seperator">|</span>

                {/* Clear all button */}
                <button className="clear-all" onClick={handleClearAllClick}>Clear All</button>
            </div>
            
            {/* Todo list */}
            <div className="todo-section">
                {todos.length === 0 ? (
                    <p className="empty-message">No todos yet!</p>
                ) : (
                    <ul className="todo-list">
                        {filteredTodos.map(function (todo, index) {
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