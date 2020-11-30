const getId = () => Math.floor(Math.random() * 10000000);

const getUser = () => {
  return JSON.parse(window.localStorage.getItem('loggedChatAppUser'));
};

const setUser = (user) => {
  console.log(user);
  window.localStorage.setItem('loggedChatAppUser', JSON.stringify(user));
};

export default { getId, getUser, setUser };
