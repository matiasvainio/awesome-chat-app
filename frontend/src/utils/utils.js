const getId = () => Math.floor(Math.random() * 10000000);

const getUser = () => window.localStorage.getItem('loggedChatAppUser');

export default { getId, getUser };
