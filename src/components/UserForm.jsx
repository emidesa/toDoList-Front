import React, { useState } from 'react'; 
// Importation de React et du hook `useState` pour gérer l'état local.

import { useNavigate } from 'react-router-dom'; 
// Importation de `useNavigate` pour rediriger l'utilisateur après l'ajout.

import axios from 'axios'; 
// Importation d'Axios pour effectuer des requêtes HTTP.

import { toast } from 'react-toastify'; 
// Importation de `toast` pour afficher des notifications visuelles.

const UserForm = () => {
    // **États locaux pour gérer les champs du formulaire**
    const [name, setName] = useState(''); // Nom de l'utilisateur
    const [email, setEmail] = useState(''); // Email de l'utilisateur
    const [password, setPassword] = useState(''); // Mot de passe de l'utilisateur

    const navigate = useNavigate(); // Permet de rediriger l'utilisateur.

    // **Gestion de la soumission du formulaire**
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Empêche le rechargement de la page lors de la soumission.

        // Vérifie si tous les champs sont remplis.
        if (!name || !email || !password) {
            toast.error('Veuillez remplir tous les champs'); 
            // Affiche une erreur si des champs sont vides.
            return;
        }

        // **Création de l'objet utilisateur**
        const newUser = { name, email, password };

        try {
            // **Requête POST vers l'API pour ajouter un utilisateur**
            await axios.post('http://localhost:3001/api/user/addUser', newUser);
            toast.success('Utilisateur ajouté avec succès'); 
            // Affiche un message de succès.

            navigate('/login'); 
            // Redirige l'utilisateur vers la page de connexion après ajout.
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            toast.error('Erreur lors de l\'ajout de l\'utilisateur'); 
            // Affiche une notification d'erreur.
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            {/* Champ pour le nom */}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Met à jour l'état `name`
                placeholder="Nom de l'utilisateur"
                required
                className="form-input"
            />
            {/* Champ pour l'email */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'état `email`
                placeholder="Email de l'utilisateur"
                required
                className="form-input"
            />
            {/* Champ pour le mot de passe */}
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état `password`
                placeholder="Mot de passe"
                required
                className="form-input"
            />
            {/* Bouton pour soumettre le formulaire */}
            <button type="submit" className="submit-button">Ajouter l'utilisateur</button>
        </form>
    );
};

export default UserForm;
