import axios from 'axios';

const API_URL = "http://localhost:3001/api/task";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, 
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => response, error => {
  console.error('Response error:', error);
  return Promise.reject(error);
});

function getAllTasks() {
  return axiosInstance.get('/allTask');
}

function addTask(task) {
  return axiosInstance.post('/addTask', task);
}

function updateTask(id, task) {
  return axiosInstance.put(`/updateTask/${id}`, task);
}

function deleteTask(id) {
  return axiosInstance.delete(`/deleteTask/${id}`);
}

export default {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};

