<template>
  <div id="nav">
    <div>
      <h1>Awesome Chat App</h1>
    </div>
    <div class="nav-links">
      <router-link to="/">
        Login
      </router-link>
      <router-link to="/about">
        About
      </router-link>
      <a href="#" @click="logout">Logout</a>
    </div>
  </div>
  <router-view />
</template>

<script>
import authService from '@/services/auth';

export default {
  name: 'App',
  mounted() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn() {
      const user = window.localStorage.getItem('loggedChatAppUser');
      if (user) {
        this.$router.push('/home');
      }
    },
    logout() {
      authService.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app button {
  border: none;
  color: white;
  background-color: #4c566a;
  padding: 15px 30px;
  margin: 5px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
}

#app button:hover {
  background-color: #5e81ac;
  cursor: pointer;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 5vh 1fr 5vh;
}

#nav {
  padding: 30px;
  background-color: #4c566a;
  color: #eceff4;
  grid-column: 1/4;
  position: sticky;
  top: 0;
}

#nav a {
  font-weight: bold;
  color: #eceff4;
}

#nav a.router-link-exact-active {
  color: #e5e9f0;
}

.nav-links {
  display: flex;
  justify-content: space-evenly;
}

input {
  padding: 10px 12px;
}
</style>
