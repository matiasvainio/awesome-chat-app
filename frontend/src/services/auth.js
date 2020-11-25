import axios from 'axios';

const baseUrl = 'http://localhost:3000/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  window.localStorage.setItem('loggedChatAppUser', JSON.stringify(response.data));
  return response.data;
};

const logout = () => {
  window.localStorage.removeItem('loggedChatAppUser');
};

export default { login, logout };
