import axios from 'axios';
import { authHeader } from './authHeader';

let baseUrl = 'http://localhost:3000/api/rooms';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/rooms';
}

/**
 * Uses HTTP GET method to get all rooms from database.
 */
const getRooms = async () => {
  const response = await axios.get(baseUrl, { headers: authHeader() });
  return response.data;
};

/**
 * Uses HTTP GET method to get single room from the database.
 *
 * @param {string} id Id of the room.
 */
const getRoom = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

/**
 * Uses HTTP PUT method to update a room in database.
 *
 * @param {object} newRoom New room -object which replaces the old one.
 */

const updateRoomUsers = async (newRoom) => {
  const response = await axios.put(`${baseUrl}/${newRoom.id}`, newRoom, {
    headers: authHeader(),
  });
  return response.data;
};

export default { getRooms, getRoom, updateRoomUsers };
