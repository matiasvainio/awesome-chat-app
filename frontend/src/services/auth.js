import axios from 'axios';

const baseUrl = 'api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response;
};

const logout = () => {
  window.localStorage.removeItem('loggedChatAppUser');
};

export default { login, logout };
