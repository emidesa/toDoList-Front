import React, { useState } from 'react'; 
// Importation de React et du hook useState pour gérer l'état local.

import axios from 'axios'; 
// Bibliothèque HTTP pour effectuer des requêtes vers l'API.

import { useNavigate } from 'react-router-dom'; 
// Hook pour la navigation entre les différentes routes de l'application.

import '../Styles/login.css'; 
import { Container } from 'react-bootstrap';
// Importation du fichier CSS pour le style.

const LoginForm = () => {
    // État local pour stocker les valeurs des champs et les erreurs éventuelles.
    const [email, setEmail] = useState(''); // État pour l'email saisi par l'utilisateur.
    const [password, setPassword] = useState(''); // État pour le mot de passe saisi.
    const [error, setError] = useState(null); // État pour gérer les erreurs de connexion.

    const navigate = useNavigate(); 
    // Hook pour rediriger l'utilisateur après une action réussie.

    // **Gestionnaire pour la soumission du formulaire**
    const handleLogin = async (e) => {
        e.preventDefault(); 
        // Empêche le rechargement de la page par défaut lorsque le formulaire est soumis.

        try {
            // Envoi des informations de connexion (email et mot de passe) à l'API.
            const response = await axios.post('http://localhost:3001/api/user/login', { email, password });

            // Vérifie si la réponse contient un utilisateur et un token.
            if (response.data.user && response.data.token) {
                // Stockage des informations de l'utilisateur et du token dans localStorage.
                localStorage.setItem('user', JSON.stringify(response.data.user)); 
                localStorage.setItem('token', response.data.token);

                // Redirection de l'utilisateur vers la page de la liste des tâches après une connexion réussie.
                navigate('/todolist'); 
            } else {
                // Si les informations ne sont pas valides, affiche un message d'erreur.
                setError('Erreur : Informations de connexion invalides.');
            }
        } catch (err) {
            // Gestion des erreurs retournées par l'API ou autres erreurs inattendues.
            setError(err.response?.data?.error || 'Erreur lors de la connexion.');
        }
    };

    // **Gestionnaire pour rediriger vers la page d'inscription**
    const handleGoToSignup = () => {
        e.preventDefault(); // Empêche le rechargement de la page
        navigate('/addUser'); 
        // Redirige l'utilisateur vers le formulaire d'inscription.
    };

    // Rendu du composant
    return (
        <Container className='body-login'>
            {/* Formulaire de connexion */}
            <form onSubmit={handleLogin}>
                <h2>Connexion</h2>
                {/* Affiche un message d'erreur si nécessaire */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <div>
                    {/* Champ pour l'email */}
                    <label>Email :</label>
                    <input
                        type="email" 
                        value={email} // L'état local 'email' contrôle cette valeur.
                        onChange={(e) => setEmail(e.target.value)} 
                        // Met à jour l'état lorsque l'utilisateur tape dans le champ.
                        required // Rend le champ obligatoire.
                    />
                </div>
                <div>
                    {/* Champ pour le mot de passe */}
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password} // L'état local 'password' contrôle cette valeur.
                        onChange={(e) => setPassword(e.target.value)} 
                        // Met à jour l'état lorsque l'utilisateur tape dans le champ.
                        required // Rend le champ obligatoire.
                    />
                </div>
                {/* Bouton pour soumettre le formulaire */}
                <button type="submit">Se connecter</button>
                {/* Bouton pour rediriger l'utilisateur vers le formulaire d'inscription */}
            <button onClick={handleGoToSignup}>Créer un compte</button>
            </form>

            
        </Container>
    );
};

export default LoginForm; 
// Exporte le composant pour qu'il puisse être utilisé dans d'autres fichiers.
