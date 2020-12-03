<template>
  <div class="parent-div">
    <div v-if="$route.meta.header === none" id="nav">
      <div>
        <h1>Awesome Chat App</h1>
      </div>
      <div class="nav-links">
        <router-link to="/">
          Login
        </router-link>
        <router-link to="/home">
          Home
        </router-link>
        <a href="#" @click="logout">Logout</a>
        <a href="#" v-if="!this.$route.name" @click="showMenu">Menu</a>
      </div>
    </div>
    <router-view :menuVisible="menuVisible" />
  </div>
</template>

<script>
import authService from '@/services/auth';
import utils from './utils/utils';
import io from 'socket.io-client';

export default {
  name: 'App',
  data() {
    return {
      isNotLogged: true,
      socket: {},
      menuVisible: false,
    };
  },
  created() {
    // this.socket = io('http://localhost:3000/');
  },
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
    showMenu() {
      this.menuVisible = !this.menuVisible;
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

.parent-div {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

body {
  background-color: #eceff4;
}

button {
  border: none;
  color: white;
  background-color: #4c566a;
  padding: 15px 30px;
  margin: 5px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
}

button:hover {
  background-color: #5e81ac;
  cursor: pointer;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #4c566a;
  color: #eceff4;
  position: fixed;
  width: 100%;
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
