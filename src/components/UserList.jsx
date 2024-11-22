import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Utilisation de useNavigate pour la redirection
import LoginForm from '../pages/LoginForm';

const UserList = ({ users, onUpdateUser, onDeleteUser }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Gérer l'état de connexion
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate(); // Hook pour gérer la redirection

    const handleLoginSuccess = (user) => {
        setIsLoggedIn(true); // Mettre à jour l'état de connexion
        setLoggedInUser(user); // Stocker les informations de l'utilisateur connecté
        navigate('/todolist'); // Rediriger vers la page todolist après la connexion
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Réinitialiser l'état de connexion
        setLoggedInUser(null);
        localStorage.removeItem('authToken'); // Supprimer le token si utilisé
        navigate('/login'); // Rediriger vers la page de connexion après déconnexion
    };

    return (
        <div>
            {!isLoggedIn ? (
                // Affiche le formulaire de connexion si l'utilisateur n'est pas connecté
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            ) : (
                // Affiche la liste des utilisateurs si l'utilisateur est connecté
                <div>
                    <h1>Bienvenue, {loggedInUser.name} !</h1>
                    <button onClick={handleLogout}>Se déconnecter</button>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                                <button
                                    onClick={() =>
                                        onUpdateUser(user.id, {
                                            name: 'Updated Name',
                                            email: 'updated@example.com',
                                        })
                                    }
                                >
                                    Mettre à jour
                                </button>
                                <button onClick={() => onDeleteUser(user.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserList;
