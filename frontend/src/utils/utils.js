const getUser = () => {
  return JSON.parse(window.localStorage.getItem('loggedChatAppUser'));
};

const setUser = (user) => {
  window.localStorage.setItem('loggedChatAppUser', JSON.stringify(user));
};

export default { getUser, setUser };
