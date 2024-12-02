import axios from "axios"; 
// Importation de la bibliothèque Axios pour effectuer des requêtes HTTP.

// **Fonction pour récupérer tous les utilisateurs**
function GetALLUser() {
    return axios.get("http://localhost:3001/api/user/allUser");
    // Effectue une requête GET vers l'endpoint `/allUser` pour obtenir la liste de tous les utilisateurs.
}

// **Fonction pour ajouter un nouvel utilisateur**
function addUser(user) {
    return axios.post("http://localhost:3001/api/user/addUser", user);  
    // Effectue une requête POST vers l'endpoint `/addUser` avec les données du nouvel utilisateur.
}

// **Fonction pour mettre à jour un utilisateur existant**
function UpdateUser(id, user) {
    return axios.put(`http://localhost:3001/api/user/updateUser/${id}`, user); 
    // Effectue une requête PUT vers l'endpoint `/updateUser/{id}` avec les nouvelles données de l'utilisateur.
}

// **Fonction pour supprimer un utilisateur**
function deleteUser(id) {
    return axios.delete(`http://localhost:3001/api/user/deleteUser/${id}`); 
    // Effectue une requête DELETE vers l'endpoint `/deleteUser/{id}` pour supprimer un utilisateur spécifique.
}

// **Exportation des fonctions**
export default {
    GetALLUser,
    addUser,
    UpdateUser,
    deleteUser,
};
// Permet d'importer ces fonctions dans d'autres fichiers pour interagir avec l'API utilisateur.
