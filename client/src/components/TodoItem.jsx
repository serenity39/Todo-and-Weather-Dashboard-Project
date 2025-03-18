import React, {useState} from 'react';

export default function TodoItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.todo);

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSaveClick() {
        props.onEdit(props.index, editedText);
        setIsEditing(false);
    }

    return (
        <li className="todo-item">
            {isEditing ? (
                <>
                    <input
                        className="edit-input"
                        value={editedText}
                        onChange={function (e) {
                            setEditedText(e.target.value);
                        }}
                        onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                handleSaveClick();
                            }
                        }}
                        autoFocus
                    />
                    <button
                        className="save-button"
                        onClick={handleSaveClick}
                    >
                        Save
                    </button>
                </>
            ) : (
                <div className="todo-item-content">
                    <span>{props.todo}</span>
                    <div className="todo-item-buttons">
                        <button 
                            className="edit-button"
                            onClick={handleEditClick}
                        >
                            ✏️
                        </button>
                        <button
                            className="delete-button"
                            onClick={function () {
                                props.onDelete(props.index);
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}