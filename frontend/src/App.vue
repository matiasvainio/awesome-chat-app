<template>
  <div class="parent-div">
    <div v-if="$route.meta.header === none" id="nav">
      <div>
        <h1>Awesome Chat App Beta</h1>
      </div>
      <div class="nav-links">
        <router-link to="/">
          Login
        </router-link>
        <router-link to="/home">
          Home
        </router-link>
        <a href="#" @click.prevent="logout">Logout</a>
        <a href="#" @click.prevent="showMenu()">
          Menu
        </a>
      </div>
    </div>
    <router-view :foobar="foobar" />
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
      console.log('foobar');
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
  height: 100%;
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
  /* height: 100vh; */
}

#nav {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  padding: 30px;
  background-color: #4c566a;
  color: #eceff4;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #eceff4;
  text-decoration: none;
}

#nav a:hover {
  color: #5e81ac;
}

.nav-links {
  display: flex;
  justify-content: space-evenly;
}

input {
  padding: 10px 12px;
}

@media screen and (max-width: 800px) {
  #nav {
    padding: 10px;
  }

  #nav h1 {
    font-size: 1.5em;
  }
}
</style>
