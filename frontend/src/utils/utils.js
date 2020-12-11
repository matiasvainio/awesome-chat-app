/**
 * Gets current user from window local storage.
 */
const getUser = () => {
  return JSON.parse(window.localStorage.getItem('loggedChatAppUser'));
};

/**
 * Adds current user to window local storage.
 * @param {object} user User to be added.
 */
const setUser = (user) => {
  window.localStorage.setItem('loggedChatAppUser', JSON.stringify(user));
};

export default { getUser, setUser };
