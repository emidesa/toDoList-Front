import React, { useState } from 'react';

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEditClick = (task) => {
    setEditingTask({
      ...task,
      final_date: task.final_date.split('T')[0] 
    });
  };

  const handleSaveEdit = () => {
    const updatedTask = {
      ...editingTask,
      final_date: new Date(editingTask.final_date).toISOString().split('T')[0] 
    };
    onUpdateTask(editingTask.id, updatedTask);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div>
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className="task-item">
                    {editingTask && editingTask.id === task.id ? (
                        <div>
                            <input type="text" value={editingTask.title} onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} />
                            <textarea value={editingTask.description} onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}></textarea>
                            <input type="date" value={editingTask.final_date} onChange={(e) => setEditingTask({ ...editingTask, final_date: e.target.value })} />
                            <button onClick={handleSaveEdit}>Enregistrer</button>
                            <button onClick={handleCancelEdit}>Annuler</button>
                        </div>
                    ) : (
                        <div>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p>Date limite: {new Date(task.final_date).toLocaleDateString()}</p>
                            <button onClick={() => handleEditClick(task)}>Modifier</button>
                            <button onClick={() => onDeleteTask(task.id)}>Supprimer</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
  );
};

export default TaskList;

