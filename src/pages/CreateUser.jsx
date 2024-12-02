import React, { useState } from 'react'; 
// Importation de React et des hooks nécessaires.

import { useNavigate } from 'react-router-dom'; 
// Hook pour la navigation entre les routes.

import apiUser from '../services/apiUser'; 
// Importation du service pour les requêtes utilisateur.

const CreateUser = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    // État local pour gérer les champs du formulaire.

    const navigate = useNavigate(); 
    // Hook pour rediriger l'utilisateur après la soumission du formulaire.

    // **Gestionnaire de soumission**
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page.
        try {
            // Envoi des données du formulaire à l'API.
            const response = await apiUser.addUser({ name, email, password });

            console.log('Utilisateur créé avec succès :', response.data);
            
            // Redirection vers la page TODO de l'utilisateur nouvellement créé.
            navigate(`/todo/${response.data.id}`);
        } catch (err) {
            // Gestion des erreurs avec un message clair en console.
            console.error('Erreur lors de la création de l’utilisateur', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-user-form">
            <h1>Créer un utilisateur</h1>
            
            {/* Champ de saisie pour le nom */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                required
                className="form-input"
            />

            {/* Champ de saisie pour l'email */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="form-input"
            />

            {/* Champ de saisie pour le mot de passe */}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="form-input"
            />

            {/* Bouton de soumission */}
            <button type="submit" className="submit-button">
                Créer
            </button>
        </form>
    );
};

export default CreateUser;
