import api from '../api';

const url = '/checkins';

const getAll = async () => {
  const response = await api.get(url);
  return response.data;
};

const addNew = async (checkin) => {
  const response = await api.post(url, checkin);
  return response.data;
};

const like = async (checkinId, personId) => {
  const response = await api.put(`${url}/${checkinId}/like`, {
    personId,
  });
  return response.data;
};

const unlike = async (checkinId, personId) => {
  // on axios.delete, request body needs to be passed in data key
  const response = await api.delete(`${url}/${checkinId}/like`, {
    data: { personId },
  });
  return response.data;
};

export default { getAll, addNew, like, unlike };
