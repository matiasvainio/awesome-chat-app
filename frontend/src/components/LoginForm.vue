<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">username</label>
        <div>
          <input v-model="username" type="text" />
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
  </div>
</template>

<script>
import userService from '@/services/users';
import authService from '@/services/auth';

export default {
  components: {},
  data: function() {
    return {
      users: [],
      username: '',
      password: '',
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = await userService.getAll();
    },
    async handleLogin() {
      const username = this.username;
      const password = this.password;

      const foundUser = this.users.find((o) => o.username === username);

      if (foundUser) {
        await authService.login({ username, password });
        this.$router.push('/home');
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
