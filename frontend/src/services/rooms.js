import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/rooms';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/rooms';
}

const authHeader = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedChatAppUser'));

  if (user && user.data.token) {
    return { Authorization: `bearer ${user.data.token}` };
  }
  return {};
};

const getRooms = async () => {
  const response = await axios.get(baseUrl, { headers: authHeader() });
  return response.data;
};

const updateRoomUsers = async (roomId, newRoom) => {
  const response = await axios.put(`${baseUrl}/${roomId}`, newRoom, { headers: authHeader() });
  return response.data;
};

export default { getRooms, updateRoomUsers };
