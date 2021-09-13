import api from '../api';

const url = '/places';

const getAll = async () => {
  const response = await api.get(url);
  return response.data;
};

export default { getAll };
