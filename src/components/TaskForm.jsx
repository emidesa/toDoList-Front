import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier si les champs obligatoires sont remplis
        if (!title || !description || !finalDate) {
            alert('Tous les champs doivent être remplis.');
            return;
        }

        const newTask = { title, description, final_date: finalDate };
        onAddTask(newTask);  // Ajouter la tâche via la fonction passée en props
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
                placeholder="Task title" 
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Task description" 
                required 
            />
            <input 
                type="date" 
                value={finalDate} 
                onChange={(e) => setFinalDate(e.target.value)} 
                required 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
