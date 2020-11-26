const getId = () => Math.floor(Math.random() * 10000000);

const getUser = () => JSON.parse(window.localStorage.getItem('loggedChatAppUser')).username;

export default { getId, getUser };
