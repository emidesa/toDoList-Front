import axios from "axios";

function GetALLUser() {
    return axios.get("http://localhost:3001/api/user/allUser");
}

function addUser(user) {
    return axios.post("http://localhost:3001/api/user/addUser", user);  
}

function UpdateUser(id, user) {
    return axios.put(`http://localhost:3001/api/user/updateUser/${id}`, user); 
}

function deleteUser(id) {
    return axios.delete(`http://localhost:3001/api/user/deleteUser/${id}`); 
}

export default {
    GetALLUser,
    addUser,
    UpdateUser,
    deleteUser,
};
