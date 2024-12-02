import React, { useState } from 'react';
import UserForm from './UserForm';
import apiUser from '../services/apiUser';

const UserList = () => {
    const [users, setUsers] = useState([]);

    const handleAddUser = async (newUser) => {
        try {
            const response = await apiUser.addUser(newUser);
            console.log('Utilisateur ajouté :', response.data);
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
    };

    return (
        <div>
            <h1>Ajouter un Utilisateur</h1>
            <UserForm onAddUser={handleAddUser} />
        </div>
    );
};

export default UserList;
