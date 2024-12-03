import React, { useState, useEffect, useCallback } from 'react'; 
// Importe React et des hooks nécessaires pour gérer l'état et les effets.

import { useNavigate } from 'react-router-dom'; 
// Permet de naviguer entre les pages.

import TaskForm from '../components/TaskForm'; 
// Composant pour le formulaire permettant d'ajouter une tâche.

import TaskList from '../components/TaskList'; 
// Composant pour afficher la liste des tâches.

import apiTask from '../services/apiTask'; 
// Service qui contient les appels à l'API pour gérer les tâches.

import { toast } from 'react-toastify'; 
// Permet d'afficher des notifications à l'utilisateur.

import '../Styles/todo.css';



const TodoList = () => {
    // État local pour stocker les tâches.
    const [tasks, setTasks] = useState([]);

    // Hook pour gérer la navigation.
    const navigate = useNavigate();

    // Fonction pour récupérer les tâches depuis l'API.
    const fetchTasks = useCallback(async () => {
        try {
            const response = await apiTask.getAllTasks(); 
            // Appelle la méthode pour obtenir toutes les tâches.
            
            if (Array.isArray(response.data)) {
                // Si les données sont un tableau, met à jour l'état.
                setTasks(response.data);
                
            } else {
         
                toast.error('Erreur dans la structure des données.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            toast.error('Impossible de récupérer les tâches.');
        }
    }, []); // `useCallback` évite que la fonction ne soit recréée inutilement.

    // Appelle `fetchTasks` dès que le composant est monté.
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]); 

    // Fonction pour ajouter une nouvelle tâche.
    const handleAddTask = async (newTask) => {
        try {
            const response = await apiTask.addTask(newTask); 
            // Appelle l'API pour ajouter une tâche.

            // Met à jour la liste des tâches avec la nouvelle.
            setTasks(prevTasks => [...prevTasks, response.data]);

            toast.success('Tâche ajoutée avec succès !');
        } catch (error) {
            toast.error('Erreur lors de l\'ajout de la tâche.');
        }
    };

    // Fonction pour mettre à jour une tâche existante.
    const handleUpdateTask = useCallback(async (id, updatedTask) => {
        try {
            const response = await apiTask.updateTask(id, updatedTask); 
            // Met à jour la tâche via l'API.

            // Met à jour la tâche localement.
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === id ? response.data : task
                )
            );

            toast.success('Tâche mise à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            toast.error('Erreur lors de la mise à jour.');
        }
    }, []); 

    // Fonction pour supprimer une tâche.
    const handleDeleteTask = useCallback(async (id) => {
        try {
            await apiTask.deleteTask(id); 
            // Supprime la tâche via l'API.

            // Met à jour la liste localement en filtrant la tâche supprimée.
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

            toast.success('Tâche supprimée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
            toast.error('Erreur lors de la suppression.');
        }
    }, []); 

    // Fonction pour déconnecter l'utilisateur.
    const handleLogout = useCallback(() => {
        localStorage.removeItem('user'); 
        localStorage.removeItem('token'); 
        // Supprime les informations de l'utilisateur stockées localement.

        navigate('/login'); 
        // Redirige vers la page de connexion.
    }, [navigate]); 

    return (
        <div>{/* Titre de la page */}
            <h2 style={{marginTop:"64px"}}>Ma To-Do List</h2> 
            
            <button style={{width:"424px", }} onClick={handleLogout}>Déconnexion</button> 

            
            <div className='content'>
            {/* Bouton pour déconnecter l'utilisateur */}

            <TaskForm onAddTask={handleAddTask} /> 
            {/* Formulaire pour ajouter une tâche */}

            <TaskList 
                tasks={tasks} 
                onUpdateTask={handleUpdateTask} 
                onDeleteTask={handleDeleteTask} 
            />
            {/* Liste des tâches avec des fonctions pour mettre à jour ou supprimer */}
        </div>
   </div> 
   );
};

export default TodoList; 
// Exporte le composant pour pouvoir l'utiliser dans d'autres fichiers.
