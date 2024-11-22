import React, { useState } from 'react';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState({});

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setUpdatedTask({ ...task }); // Pré-remplir le formulaire avec les valeurs actuelles
    };

    const handleSaveClick = () => {
        onUpdateTask(editingTaskId, updatedTask);
        setEditingTaskId(null); // Quitte le mode édition après la sauvegarde
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {editingTaskId === task.id ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={updatedTask.title || ''}
                                    onChange={handleChange}
                                    placeholder="Title"
                                />
                                <textarea
                                    name="description"
                                    value={updatedTask.description || ''}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                                <input
                                    type="date"
                                    name="final_date"
                                    value={updatedTask.final_date || ''}
                                    onChange={handleChange}
                                />
                                <button onClick={handleSaveClick} disabled={!updatedTask.title || !updatedTask.description || !updatedTask.final_date}>
                                    Save
                                </button>
                                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>{task.final_date}</p>
                                <button onClick={() => handleEditClick(task)}>Edit</button>
                                <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
