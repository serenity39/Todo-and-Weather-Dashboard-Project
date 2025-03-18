import React from 'react';

export default function TodoItem(props) {
    return (
        <li className="todo-item">
            {props.todo}
            <button
                className="delete-button"
                onClick={function () { props.onDelete(props.index); }}
            >
                🗑️
            </button>
        </li>
    );
}
