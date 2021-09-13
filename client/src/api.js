import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

const api = axios.create({ baseURL });

api.interceptors.request.use(
  (config) => {
    if (config.baseURL === baseURL && !config.headers.Authorization) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
