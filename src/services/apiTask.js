import axios from 'axios';


function GetALLtasks() {
    return axios.get("http://localhost:3001/api/task/allTask");

}


function addTasks(task) {
    return axios.post("http://localhost:3001/api/task/addTask");

}

function updateTask(id, task) {
    return axios.post("http://localhost:3001/api/task/updateTask/:id'");

}


function deleteTask(id) {
    return axios.post("http://localhost:3001/api/task/deleteTask/:id");

}

export default {
    GetALLtasks,
    addTasks,
    updateTask,
    deleteTask,
}


