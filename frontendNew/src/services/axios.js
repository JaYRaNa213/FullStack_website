// src/services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ✅ use consistent token key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
