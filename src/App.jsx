import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/userList';
import LoginForm from './pages/LoginForm';
import ToDoList from './pages/toDoList';

const App = () => {
    // Vérifie si un utilisateur est connecté
    const isLoggedIn = !!localStorage.getItem('user');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/users" />} />
                <Route path="/todolist" element={<ToDoList />} />
                <Route path="/users" element={isLoggedIn ? <UserList /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isLoggedIn ? "/users" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
