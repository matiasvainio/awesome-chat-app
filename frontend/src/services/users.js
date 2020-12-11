import axios from 'axios';
import { authHeader } from './authHeader';

let baseUrl = 'http://localhost:3000/api/users';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/users';
}

/**
 * Uses HTTP GET method to get all users from the database.
 *
 * @name users.getAll
 */
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

/**
 * Uses HTTP GET method and id to get a single user from database.
 *
 * @param {string} id Id of the user.
 */

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

/**
 * Uses HTTP POST method to add a user to the database.
 *
 * @param {object} user User to be added to database.
 */

const create = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

/**
 * Uses HTTP PUT method to update user in the database.
 *
 * @param {object} user User object which replaces the old one.
 */

const modify = async (user) => {
  const response = await axios.put(`${baseUrl}/${user.id}`, user, { headers: authHeader() });
  return response.data;
};

/**
 * Uses HTTP DELETE method to remove user from the database.
 *
 * @param {string} id Id of the user.
 */

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getUser, create, modify, remove };
