import React from 'react'; 
// Importe la bibliothèque React pour créer des composants.

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
// Importe les composants nécessaires pour gérer la navigation entre les pages.

import LoginForm from './pages/LoginForm'; 
// Importe le composant de la page de connexion.

import 'react-toastify/dist/ReactToastify.css'; 
// Importe les styles nécessaires pour les notifications (Toastify).

import UserList from './components/UserList'; 
// Importe le composant qui affiche la liste des utilisateurs.

import { ToastContainer } from 'react-toastify'; 
// Importe le conteneur pour les notifications Toastify.

import TodoList from './pages/toDoList'; 
// Importe la page de gestion des tâches (ToDo list).

const App = () => {
    // Vérifie si un utilisateur est connecté en regardant dans le stockage local du navigateur.
    const isLoggedIn = !!localStorage.getItem('user'); 
    // Si une clé "user" est présente, `isLoggedIn` sera `true`. Sinon, il sera `false`.

    return (
        <Router>
            {/* Déclare le routeur qui va gérer les différentes routes de l'application. */}
            <Routes>
                {/* Déclare les différentes routes/pages accessibles dans l'application. */}

                 {/* Redirection vers /login dès l'ouverture du site */}
                 <Route path="/" element={<Navigate to="/login" />} />
                 <Route path="/login" element={<LoginForm />} />

                {/* Route pour la page de connexion */}
                <Route path="/login" element={<LoginForm />} />

                {/* Route pour la liste des utilisateurs */}
                {/* Si l'utilisateur est connecté, il voit la page UserList. Sinon, il est redirigé vers /login */}
                <Route path="/users" element={isLoggedIn ? <UserList /> : <Navigate to="/login" />} />

                {/* Route par défaut : redirige vers la bonne page selon si l'utilisateur est connecté ou non */}
                <Route path="*" element={<Navigate to={isLoggedIn ? "/users" : "/login"} />} />

                {/* Route pour la ToDo list */}
                {/* Seul un utilisateur connecté peut y accéder. Sinon, il est redirigé vers /login */}
                <Route path="/todolist" element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />} />
            </Routes>

            {/* Composant pour afficher les notifications Toastify */}
            <ToastContainer
                position="bottom-right" // Affiche les notifications en bas à droite.
                autoClose={5000} // Chaque notification disparaît automatiquement après 5 secondes.
                hideProgressBar={false} // Affiche une barre de progression dans les notifications.
                newestOnTop={false} // Les notifications les plus récentes ne sont pas affichées en haut.
                closeOnClick // Permet de fermer une notification en cliquant dessus.
                rtl={false} // Désactive l'orientation droite à gauche.
                pauseOnFocusLoss // Les notifications restent affichées si on perd le focus.
                draggable // Les notifications peuvent être déplacées avec la souris.
                pauseOnHover // Les notifications restent visibles tant que la souris est dessus.
                theme="colored" // Définit un thème coloré pour les notifications.
            />
        </Router>
    );
};

export default App;
// Exporte le composant App pour qu'il puisse être utilisé dans d'autres fichiers.
