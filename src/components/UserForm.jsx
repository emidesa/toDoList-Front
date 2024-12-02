import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }

        const newUser = { name, email, password };

        try {
            await axios.post('http://localhost:3001/api/user/addUser', newUser);
            toast.success('Utilisateur ajouté avec succès');
            navigate('/login'); 
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
            toast.error('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom de l'utilisateur"
                required
                className="form-input"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email de l'utilisateur"
                required
                className="form-input"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
                className="form-input"
            />
            <button type="submit" className="submit-button">Ajouter l'utilisateur</button>
        </form>
    );
};

export default UserForm;
