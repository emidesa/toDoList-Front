import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Envoi des informations d'identification à l'API
            const response = await axios.post('http://localhost:3001/api/user/login', { email, password });

            if (response.data.user) {
                // Stocker les informations de l'utilisateur dans le localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // Rediriger vers la liste des utilisateurs après connexion réussie
                navigate('/todolist');
            } else {
                setError('Erreur : Utilisateur non trouvé.');
            }
        } catch (err) {
            // Gestion des erreurs, par exemple mauvais identifiants ou problème serveur
            setError(err.response?.data?.error || 'Erreur lors de la connexion.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Email :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Mot de passe :</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;
