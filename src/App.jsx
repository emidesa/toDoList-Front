import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/UserList';
import { ToastContainer } from 'react-toastify';
import UserForm from './components/UserForm';
import TodoList from './pages/toDoList';

const App = () => {
    // Vérifie si un utilisateur est connecté
    const isLoggedIn = !!localStorage.getItem('user');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/users" element={isLoggedIn ? <UserList /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isLoggedIn ? "/users" : "/login"} />} />
                <Route path="/todolist" element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
        </Router>
    );
};

export default App;
