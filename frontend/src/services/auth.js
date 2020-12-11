import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/login';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/login';
}

/**
 * Handles login for user. Uses HTTP POST method to send user credentials to the server.
 *
 * @param {object} credentials The credentials (username, password) for user.
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response;
};

/**
 * Removes user's credentials from browser's local storage.
 */

const logout = () => {
  window.localStorage.removeItem('loggedChatAppUser');
};

export default { login, logout };
