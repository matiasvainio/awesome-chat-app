<template>
  <div>
    <h3>signup</h3>
    <form @submit.prevent="handleSignup">
      <div>
        <label for="username">username</label>
        <div>
          <input v-model="username" type="text" name="username" pattern="[A-Za-z1-9]{2,}"
          title="Must contain atleast two characters. No special characters!" required/>
        </div>
      </div>
      <div>
        <label for="password">password</label>
        <div>
          <input v-model="password" type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  required/>
        </div>
      </div>
      <button>signup</button>
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

<style scoped>
input:valid {
    border: 2px solid green;
}
</style>