<template>
  <h3>signup</h3>
  <div>
    <form @submit.prevent="handleSignup">
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
import utils from '@/utils/utils';

export default {
  data: function() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleSignup() {
      const newUser = {
        id: utils.getId(),
        username: this.username,
        password: this.password,
      };

      userService.create(newUser);
      this.$router.push('/home');
    },
  },
};
</script>
