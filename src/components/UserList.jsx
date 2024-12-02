import React, { useState } from 'react'; 
// Importation de React et du hook `useState` pour gérer les utilisateurs.

import UserForm from './UserForm'; 
// Importation du composant `UserForm` pour le formulaire d'ajout d'utilisateur.

import apiUser from '../services/apiUser'; 
// Importation du service pour les requêtes liées aux utilisateurs.

const UserList = () => {
    const [users, setUsers] = useState([]); 
    // État local pour stocker la liste des utilisateurs.

    // **Ajout d'un nouvel utilisateur**
    const handleAddUser = async (newUser) => {
        try {
            // Envoie du nouvel utilisateur à l'API
            const response = await apiUser.addUser(newUser);
            console.log('Utilisateur ajouté :', response.data);
            
            // Mise à jour de l'état `users` pour inclure le nouvel utilisateur.
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (error) {
            // Gestion des erreurs lors de l'ajout.
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    return (
        <div>
            <h1>Ajouter un Utilisateur</h1>
            {/* Composant de formulaire avec gestionnaire pour l'ajout */}
            <UserForm onAddUser={handleAddUser} />
        </div>
    );
};

export default UserList;

