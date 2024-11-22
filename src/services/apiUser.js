import axios from "axios";

function GetALLUser() {
    return axios.get("http://localhost:3001/api/user/allUser");
}

function addUser(user) {
    return axios.post("http://localhost:3001/api/user/addUser", user);  // Assurez-vous d'envoyer 'user' dans le corps de la requête
}

function UpdateUser(id, user) {
    return axios.put(`http://localhost:3001/api/user/updateUser/${id}`, user);  // Utilisez une interpolation de chaîne pour l'ID
}

function deleteUser(id) {
    return axios.delete(`http://localhost:3001/api/user/deleteUser/${id}`);  // Utilisez une interpolation de chaîne pour l'ID
}

export default {
    GetALLUser,
    addUser,
    UpdateUser,
    deleteUser,
};
