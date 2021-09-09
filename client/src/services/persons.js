import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/persons';

const getLikes = async (personId) => {
  const response = await axios.get(`${baseUrl}/${personId}/likes`);
  return response.data;
};

export default { getLikes };
