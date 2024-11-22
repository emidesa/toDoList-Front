import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUser from '../services/apiUser';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiUser.addUser({ name, email, password });
            navigate(`/todo/${response.data.id}`);
        } catch (err) {
            console.error('Erreur lors de la création de l’utilisateur', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Créer un utilisateur</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />
            <button type="submit">Créer</button>
        </form>
    );
};

export default CreateUser;
