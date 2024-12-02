import axios from 'axios'; 
// Importation de la bibliothèque Axios pour effectuer des requêtes HTTP.

const API_URL = "http://localhost:3001/api/task"; 
// L'URL de base pour toutes les requêtes liées aux tâches.

const axiosInstance = axios.create({
  baseURL: API_URL, // Définit l'URL de base pour ce client Axios.
  timeout: 5000,    // Fixe un délai d'attente de 5 secondes pour les requêtes.
});

// **Intercepteur de requêtes**
// Avant qu'une requête soit envoyée, cet intercepteur est appelé.
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Récupère le jeton de l'utilisateur stocké localement.
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; 
    // Ajoute un en-tête Authorization avec le jeton Bearer.
  }
  return config; // Retourne la configuration de la requête.
}, error => {
  console.error('Request error:', error); // Affiche une erreur si la requête échoue avant d'être envoyée.
  return Promise.reject(error); // Rejette la promesse pour gérer l'erreur.
});

// **Intercepteur de réponses**
// Cet intercepteur est appelé après qu'une réponse est reçue.
axiosInstance.interceptors.response.use(response => response, error => {
  console.error('Response error:', error); // Affiche une erreur si la réponse contient une erreur.
  return Promise.reject(error); // Rejette la promesse pour permettre une gestion des erreurs personnalisée.
});

// **Fonction pour récupérer toutes les tâches**
function getAllTasks() {
  return axiosInstance.get('/allTask'); 
  // Effectue une requête GET vers l'endpoint `/allTask`.
}

// **Fonction pour ajouter une nouvelle tâche**
function addTask(task) {
  return axiosInstance.post('/addTask', task); 
  // Effectue une requête POST vers l'endpoint `/addTask` en envoyant les données de la tâche.
}

// **Fonction pour mettre à jour une tâche existante**
function updateTask(id, task) {
  return axiosInstance.put(`/updateTask/${id}`, task); 
  // Effectue une requête PUT vers l'endpoint `/updateTask/{id}` avec les nouvelles données de la tâche.
}

// **Fonction pour supprimer une tâche**
function deleteTask(id) {
  return axiosInstance.delete(`/deleteTask/${id}`); 
  // Effectue une requête DELETE vers l'endpoint `/deleteTask/{id}`.
}

// **Exportation des fonctions**
export default {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
// Permet d'importer ces fonctions dans d'autres fichiers pour interagir avec l'API.
