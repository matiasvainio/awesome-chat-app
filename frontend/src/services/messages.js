import axios from 'axios';

let messageUrl = 'http://localhost:3000/api/messages';

if (process.env.NODE_ENV === 'production') {
  messageUrl = '/api/messages';
}

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
  return response.data;
};

export default { getAll, create, remove, modify };
