import api from '../api';

const url = '/persons';

const getLikes = async (personId) => {
  const response = await api.get(`${url}/${personId}/likes`);
  return response.data;
};

export default { getLikes };
