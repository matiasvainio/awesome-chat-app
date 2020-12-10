import axios from 'axios';

let baseUrl = 'http://localhost:3000/api/login';

if (process.env.NODE_ENV === 'production') {
  baseUrl = '/api/login';
}

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response;
};

const logout = () => {
  window.localStorage.removeItem('loggedChatAppUser');
};

export default { login, logout };
