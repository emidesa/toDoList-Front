import React, { useState } from 'react'; 
// Importe React et le hook useState pour gérer l'état local.

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
    // État pour suivre la tâche actuellement en cours de modification.
    const [editingTask, setEditingTask] = useState(null);

    // Gère le clic sur le bouton "Modifier" pour commencer à éditer une tâche.
    const handleEditClick = (task) => {
        // Initialise l'état `editingTask` avec les données de la tâche.
        setEditingTask({
            ...task, // Copie toutes les propriétés de la tâche.
            final_date: task.final_date.split('T')[0] // Garde uniquement la date (sans l'heure) pour le champ de type `date`.
        });
    };

    // Gère l'enregistrement des modifications apportées à une tâche.
    const handleSaveEdit = () => {
        const updatedTask = {
            ...editingTask, // Copie les modifications locales.
            final_date: new Date(editingTask.final_date).toISOString().split('T')[0] 
            // Convertit la date modifiée au format ISO avant l'envoi à l'API.
        };
        onUpdateTask(editingTask.id, updatedTask); // Appelle la fonction de mise à jour passée en prop.
        setEditingTask(null); // Réinitialise l'état `editingTask` après l'enregistrement.
    };

    // Annule la modification en cours.
    const handleCancelEdit = () => {
        setEditingTask(null); // Réinitialise l'état sans enregistrer les modifications.
    };

    return (
        <div>
            {/* Liste des tâches */}
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        {editingTask && editingTask.id === task.id ? (
                            // Affiche un formulaire d'édition si la tâche est en cours de modification.
                            <div>
                                <input 
                                    type="text" 
                                    value={editingTask.title} 
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} 
                                    // Met à jour le titre dans l'état `editingTask`.
                                />
                                <textarea 
                                    value={editingTask.description} 
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    // Met à jour la description dans l'état `editingTask`.
                                ></textarea>
                                <input 
                                    type="date" 
                                    value={editingTask.final_date} 
                                    onChange={(e) => setEditingTask({ ...editingTask, final_date: e.target.value })} 
                                    // Met à jour la date dans l'état `editingTask`.
                                />
                                <button onClick={handleSaveEdit}>Enregistrer</button>
                                <button onClick={handleCancelEdit}>Annuler</button>
                            </div>
                        ) : (
                            // Affiche les détails de la tâche si elle n'est pas en cours de modification.
                            <div>
                                <h4>{task.title}</h4> {/* Affiche le titre */}
                                <p>{task.description}</p> {/* Affiche la description */}
                                <p>Date limite: {new Date(task.final_date).toLocaleDateString()}</p> 
                                {/* Convertit la date ISO en format lisible pour l'utilisateur. */}
                                <button onClick={() => handleEditClick(task)}>Modifier</button>
                                {/* Passe la tâche au mode édition */}
                                <button onClick={() => onDeleteTask(task.id)}>Supprimer</button>
                                {/* Supprime la tâche en appelant la fonction passée en prop */}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList; 
// Exporte le composant pour l'utiliser dans d'autres parties de l'application.
