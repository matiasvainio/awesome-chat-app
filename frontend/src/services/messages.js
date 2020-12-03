import axios from 'axios';

const baseUrl = 'api/rooms';
const messageUrl = 'api/messages';

const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedChatAppUser'));

  if (user && user.data.token) {
    return { Authorization: `bearer ${user.data.token}` };
  }
  return {};
};

const getAll = async (id) => {
  const response = await axios.get(messageUrl, {
    params: { id },
    headers: authHeader(),
  });

  return response.data;
};

const getRooms = async () => {
  const response = await axios.get(baseUrl, { headers: authHeader() });
  return response.data;
};

const updateRoomUsers = async () => {
  const response = await axios.put(baseUrl);
  return response.data;
};

const create = async (object) => {
  const response = await axios.post(messageUrl, object, { headers: authHeader() });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${messageUrl}/${id}`, { headers: authHeader() });
  return response.data;
};

const modify = async (message) => {
  const response = await axios.put(`${messageUrl}/${message.id}`, message, {
    headers: authHeader(),
  });

  console.log(response);

  return response.data;
};

export default { getAll, create, getRooms, remove, modify };
