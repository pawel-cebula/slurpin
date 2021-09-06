import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/checkins';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
