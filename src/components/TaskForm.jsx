import React, { useState } from 'react';
import '../index.css';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !finalDate) {
            alert('Tous les champs doivent être remplis.');
            return;
        }

        const newTask = { title, description, final_date: finalDate };
        onAddTask(newTask);
        setTitle('');
        setDescription('');
        setFinalDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nom de la tâche"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de la tâche"
                required
            />
            <input
                type="date"
                value={finalDate}
                onChange={(e) => setFinalDate(e.target.value)}
                required
            />
            <button type="submit">Ajouter une tâche</button>
        </form>
    );
};

export default TaskForm;
