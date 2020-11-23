const axios = require('axios');

const baseUrl = 'http://localhost:3000/messages';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async message => {
  const response = await axios.post(baseUrl, message);
  return response.data;
};

export default { getAll, create };
