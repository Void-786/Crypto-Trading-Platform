import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5454",
});

const token = localStorage.getItem('jwt');

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;