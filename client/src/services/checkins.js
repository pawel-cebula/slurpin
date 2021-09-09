import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/checkins';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async (checkin) => {
  const response = await axios.post(baseUrl, checkin);
  return response.data;
};

const like = async (checkinId, personId) => {
  const response = await axios.put(`${baseUrl}/${checkinId}/like`, {
    personId,
  });
  return response.data;
};

const unlike = async (checkinId, personId) => {
  // on axios.delete, request body needs to be passed in data key
  const response = await axios.delete(`${baseUrl}/${checkinId}/like`, {
    data: { personId },
  });
  return response.data;
};

export default { getAll, addNew, like, unlike };
