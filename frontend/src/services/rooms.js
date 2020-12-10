import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/rooms';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/rooms';
}

const getRooms = async () => {
  const response = await axios.get(baseUrl, { headers: authHeader() });
  return response.data;
};

const updateRoomUsers = async (roomId, newRoom) => {
  const response = await axios.put(`${baseUrl}/${roomId}`, newRoom, { headers: authHeader() });
  return response.data;
};

export default { getRooms, updateRoomUsers };
