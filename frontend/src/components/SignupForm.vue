<template>
  <div>
    <h3>signup</h3>
    <form @submit.prevent="handleSignup">
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
