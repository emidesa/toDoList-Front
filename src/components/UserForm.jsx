// components/UserForm.js
import React, { useState } from 'react';

const UserForm = ({ onAddUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { name, email };
        onAddUser(newUser);
        setName('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
            />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
