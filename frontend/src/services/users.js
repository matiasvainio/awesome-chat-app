import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/users';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/users';
}

const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedChatAppUser'));

  if (user && user.data.token) {
    return { Authorization: `bearer ${user.data.token}` };
  }
  return {};
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (object) => {
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const modify = async (user) => {
  const response = await axios.put(`${baseUrl}/${user.id}`, user, { headers: authHeader() });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getUser, create, modify, remove };
