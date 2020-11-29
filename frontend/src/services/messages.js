import axios from 'axios';

const baseUrl = 'http://localhost:3000/rooms';
const messageUrl = 'http://localhost:3000/api/messages';

const getAll = async () => {
  const response = await axios.get(messageUrl);
  return response.data;
};

const getRoomMessages = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (object) => {
  const response = await axios.post(messageUrl, object);
  return response.data;
};

export default { getAll, create, getRoomMessages };
