<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">username</label>
        <div>
          <input v-model="username" type="text"/>
        </div>
      </div>
      <div>
        <label for="password">password</label>
        <div>
          <input v-model="password" type="password" />
        </div>
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

<style>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
