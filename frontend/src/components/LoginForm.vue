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
      const user = await authService.login({ username: this.username, password: this.password });
      if (user.status === 200) {
        this.$router.push('/home');
        window.localStorage.setItem('loggedChatAppUser', user.data);
      }
    },
  },
};
</script>

<style></style>
