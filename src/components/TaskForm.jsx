import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !finalDate) {
            toast.error('Tous les champs doivent être remplis.');
            return;
        }

        const newTask = { 
            title, 
            description, 
            final_date: new Date(finalDate).toISOString()
        };

        try {
            await onAddTask(newTask);
            
            
            setTitle('');
            setDescription('');
            setFinalDate('');
            toast.success('Tâche ajoutée avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
            toast.error(`Erreur lors de l'ajout de la tâche: ${error.message}`);
        }
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

