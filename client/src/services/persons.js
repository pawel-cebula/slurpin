import api from '../api';

const url = '/persons';

const getById = async (personId) => {
  const response = await api.get(`${url}/${personId}`);
  return response.data;
};

const editById = async (personId, person) => {
  const response = await api.patch(`${url}/${personId}`, person);
  return response.data;
};

const getLikes = async (personId) => {
  const response = await api.get(`${url}/${personId}/likes`);
  return response.data;
};

export default { getById, editById, getLikes };
