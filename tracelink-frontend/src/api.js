import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // This must match your backend's URL
});

export default api;
