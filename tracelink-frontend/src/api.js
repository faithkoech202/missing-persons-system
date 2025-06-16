// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Change if your backend uses a different port or is deployed
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
