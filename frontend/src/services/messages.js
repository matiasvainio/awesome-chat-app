import axios from 'axios';
import { authHeader } from './authHeader';

let messageUrl = 'http://localhost:3000/api/messages';

if (process.env.NODE_ENV === 'production') {
  messageUrl = '/api/messages';
}

/**
 * Uses HTTP GET method to get all messages for the current room.
 *
 * @param {string} id Room id
 * @name messages.getAll
 */

const getAll = async (id) => {
  const response = await axios.get(messageUrl, {
    params: { id },
    headers: authHeader(),
  });

  console.log(response);

  return response.data;
};

/**
 * Uses HTTP POST method to add a message to the database.
 *
 * @param {object} message New message object.
 */

const create = async (message) => {
  const response = await axios.post(messageUrl, message, { headers: authHeader() });
  return response.data;
};

/**
 * Uses HTTP DELETE method to remove a message.
 *
 * @param {string} id Id of the message.
 */

const remove = async (id) => {
  const response = await axios.delete(`${messageUrl}/${id}`, { headers: authHeader() });
  return response.data;
};

/**
 * Uses HTTP PUT method to update a message.
 *
 * @param {object} message Message object which replaces the old one.
 */
const modify = async (message) => {
  const response = await axios.put(`${messageUrl}/${message.id}`, message, {
    headers: authHeader(),
  });
  return response.data;
};

export default { getAll, create, remove, modify };
