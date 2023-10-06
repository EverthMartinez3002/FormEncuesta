import axios from 'axios';
import store from '../../../store';

const api = axios.create({
  baseURL:'http://161.35.53.104:3000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getters.getToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
