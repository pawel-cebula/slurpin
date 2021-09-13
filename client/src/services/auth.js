import api from '../api';

const url = '/auth';

const register = async (username, email, password) => {
  const response = await api.post(`${url}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await api.post(`${url}/login`, {
    email,
    password,
  });

  return response.data;
};

export default { register, login };
