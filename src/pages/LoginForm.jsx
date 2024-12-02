import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/user/login', { email, password });

            if (response.data.user && response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                navigate('/todolist');
            } else {
                setError('Erreur : Informations de connexion invalides.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Erreur lors de la connexion.');
        }
    };

    const handleGoToSignup = () => {
        navigate('/addUser');
    };

    return (
        <div>
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

            <button onClick={handleGoToSignup}>Créer un compte</button>
        </div>
    );
};

export default LoginForm;
