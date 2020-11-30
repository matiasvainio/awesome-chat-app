<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">username</label>
        <input v-model="username" type="text" />
      </div>
      <div>
        <label for="password">password</label>
        <input v-model="password" type="password" />
      </div>
      <button>login</button>
    </form>
    <div class="login-notification" v-if="showNotification">
      <h3>Wrong username or password</h3>
    </div>
  </div>
</template>

<script>
import userService from '@/services/users';
import authService from '@/services/auth';
import utils from '../utils/utils';

export default {
  components: {},
  data: function() {
    return {
      users: [],
      username: '',
      password: '',
      showNotification: false,
    };
  },
  mounted() {
    // this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = await userService.getAll();
    },
    async handleLogin() {
      // const username = this.username;
      // const password = this.password;

      // const foundUser = this.users.find((o) => o.username === username);

      // if (foundUser) {
      //   await authService.login({ username, password });
      //   this.$router.push('/home');
      // }
      try {
        const user = await authService.login({ username: this.username, password: this.password });
        this.$router.push('/home');
        utils.setUser(user);
      } catch (exception) {
        this.showNotification = !this.showNotification;
        setTimeout(() => {
          this.showNotification = !this.showNotification;
        }, 2000);
      }
    },
  },
};
</script>

<style></style>
