import React from 'react';
import '../index.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    return (
        <ul className="task-list">
            {tasks.map((task, index) => (
                <li key={index} className="task-item">
                    <div className="task-info">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>À finir avant : {task.final_date}</p>
                    </div>
                    <div className="task-buttons">
                        <input
                            type="checkbox"
                            className="status-checkbox"
                            onChange={(e) => {
                                const completed = e.target.checked;
                                onUpdateTask({ ...task, completed });
                            }}
                        />
                        <button className="edit-button" onClick={() => onUpdateTask(task)}>Modifier</button>
                        <button className="delete-button" onClick={() => onDeleteTask(task.id)}>Supprimer</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
