import axios from 'axios';

const baseUrl = 'http://localhost:3000/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (object) => {
  const response = axios.post(baseUrl, object);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { getAll, create, login };
