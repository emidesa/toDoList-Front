import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import apiTask from '../services/apiTask';
import { toast } from 'react-toastify';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const fetchTasks = useCallback(async () => {
        try {
            const response = await apiTask.getAllTasks();
            console.log('Réponse de l\'API:', response);
            console.log('Données des tâches:', response.data);

            if (Array.isArray(response.data)) {
                setTasks(response.data);
                console.log('Tâches récupérées:', response.data);
            } else {
                console.error('Les données ne sont pas un tableau.');
                toast.error('Erreur dans la structure des données.');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches :', error);
            toast.error('Impossible de récupérer les tâches.');
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);
    
    const handleAddTask = async (newTask) => {
        try {
            const response = await apiTask.addTask(newTask);
            console.log('Nouvelle tâche ajoutée:', response.data);
        
            // Mettre à jour l'état local avec la nouvelle tâche
            setTasks(prevTasks => [...prevTasks, response.data]);
        
            toast.success('Tâche ajoutée avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche :', error);
            toast.error('Erreur lors de l\'ajout de la tâche.');
        }
    };

    const handleUpdateTask = useCallback(async (id, updatedTask) => {
        try {
            const response = await apiTask.updateTask(id, updatedTask);
            setTasks(prevTasks => prevTasks.map(task => 
                task.id === id ? response.data : task
            ));
            toast.success('Tâche mise à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
            toast.error('Erreur lors de la mise à jour.');
        }
    }, []);

    const handleDeleteTask = useCallback(async (id) => {
        try {
            await apiTask.deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            toast.success('Tâche supprimée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
            toast.error('Erreur lors de la suppression.');
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h2>Ma To-Do List</h2>
            <button onClick={handleLogout}>Déconnexion</button>
            <TaskForm onAddTask={handleAddTask} />
            <TaskList 
                tasks={tasks} 
                onUpdateTask={handleUpdateTask} 
                onDeleteTask={handleDeleteTask} 
            />
        </div>
    );
};

export default TodoList;

