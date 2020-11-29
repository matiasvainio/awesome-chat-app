import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/rooms';
const messageUrl = 'http://localhost:3000/api/messages';

const getAll = async () => {
  const response = await axios.get(messageUrl);
  return response.data;
};

const getRooms = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (object) => {
  const response = await axios.post(messageUrl, object);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${messageUrl}/${id}`);
  return response.data;
};

export default { getAll, create, getRooms, remove };
