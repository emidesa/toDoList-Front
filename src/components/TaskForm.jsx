import React, { useState } from 'react'; 
// Importe React et le hook useState pour gérer l'état local.

import { toast } from 'react-toastify'; 
// Importe Toastify pour afficher des notifications.



const TaskForm = ({ onAddTask }) => {
    // États pour stocker les valeurs des champs du formulaire.
    const [title, setTitle] = useState(''); // Titre de la tâche.
    const [description, setDescription] = useState(''); // Description de la tâche.
    const [finalDate, setFinalDate] = useState(''); // Date limite de la tâche.

    // Fonction appelée lorsque le formulaire est soumis.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission.

        // Vérifie que tous les champs sont remplis.
        if (!title || !description || !finalDate) {
            toast.error('Tous les champs doivent être remplis.'); // Affiche une erreur si un champ est vide.
            return;
        }

        // Crée un objet pour la nouvelle tâche.
        const newTask = { 
            title, // Titre de la tâche.
            description, // Description de la tâche.
            final_date: new Date(finalDate).toISOString() // Convertit la date au format ISO pour l'API.
        };

        try {
            // Appelle la fonction `onAddTask` pour ajouter la tâche.
            await onAddTask(newTask);

            // Réinitialise les champs du formulaire après l'ajout.
            setTitle('');
            setDescription('');
            setFinalDate('');

            toast.success('Tâche ajoutée avec succès !'); // Affiche un message de succès.
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error); // Affiche l'erreur dans la console.
            toast.error(`Erreur lors de l'ajout de la tâche: ${error.message}`); // Affiche un message d'erreur à l'utilisateur.
        }
    };

    return (
        <div className="task-form">
            
            <form style={{margin:"none"}}onSubmit={handleSubmit}>
                <h3>Add New Task</h3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task name"
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
        </div>
    );
};

export default TaskForm; 
// Exporte le composant pour qu'il puisse être utilisé dans d'autres fichiers.

