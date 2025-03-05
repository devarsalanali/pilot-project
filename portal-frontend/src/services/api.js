// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
});

// Attach the API key header to every request
api.interceptors.request.use((config) => {
  config.headers['api-key'] =
    process.env.REACT_APP_API_KEY || 'mysecretapikey';
  return config;
});

export default api;
