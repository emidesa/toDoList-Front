import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/taskForm';
import TaskList from '../components/taskList';


const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté, sinon rediriger vers la page de connexion
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login'); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        }

        // Récupérer les tâches sauvegardées dans localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks); // Charger les tâches dans le state
    }, [navigate]);

    // Fonction pour ajouter une tâche
    const handleAddTask = (newTask) => {
        const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Sauvegarder les tâches dans localStorage
    };

    // Fonction pour mettre à jour une tâche
    const handleUpdateTask = (id, updatedTask) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, ...updatedTask } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Sauvegarder les tâches dans localStorage
    };

    // Fonction pour supprimer une tâche
    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Sauvegarder les tâches dans localStorage
    };

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('user'); // Supprimer les informations de l'utilisateur de localStorage
        navigate('/login'); // Rediriger vers la page de connexion
    };

    return (
        <div>
            <h2>Ma To-Do List</h2>

            {/* Bouton de déconnexion */}
            <button onClick={handleLogout}>Déconnexion</button>

            {/* Formulaire pour ajouter une tâche */}
            <TaskForm onAddTask={handleAddTask} />

            {/* Liste des tâches */}
            <TaskList 
                tasks={tasks} 
                onUpdateTask={handleUpdateTask} 
                onDeleteTask={handleDeleteTask} 
            />
        </div>
    );
};

export default TodoList;
