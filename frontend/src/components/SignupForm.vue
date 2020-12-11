<template>
  <div>
    <h3>signup</h3>
    <form @submit.prevent="handleSignup">
      <div id="formInputs">
        <div>
          <label for="username">username</label>
          <div>
            <input
              v-model="username"
              type="text"
              name="username"
              pattern="[A-Za-z1-9]{2,}"
              title="Must contain atleast two characters. No special characters!"
              required
            >
          </div>
        </div>
        <div>
          <label for="password">password</label>
          <div id="passwordDiv">
            <input
              v-model="password"
              :type="passwordFieldType"
              class="input"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            >
            <button
              id="togglePass"
              type="button"
              :class="eyeClass"
              aria-hidden="true"
              @click="toggleVisibility"
            />
          </div>
        </div>
      </div>
      <button>signup</button>
    </form>
  </div>
</template>

<script>
/**
 * Component that handles user sign up operations.
 */
import userService from '@/services/users';
import authService from '@/services/auth';
import utils from '@/utils/utils';

export default {
  data: function() {
    return {
      username: '',
      password: '',
      passwordFieldType: 'password',
      eyeClass: 'fa fa-eye',
    };
  },
  methods: {
    /**
     * Handles sign up forms submit action.
     *
     * Creates new user object which gets passed to database. After creation
     * the user is saved to browser's local storage. User is logged in.
     */
    async handleSignup() {
      const newUser = {
        username: this.username,
        password: this.password,
      };

      const response = await userService.create(newUser);

      const user = await authService.login({
        username: newUser.username.toLowerCase(),
        password: newUser.password,
      });

      utils.setUser(user);
      this.$router.push('/home');
    },
    /**
     * Toggles whether the password is shown to the user.
     */
    toggleVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      this.eyeClass = this.eyeClass === 'fa fa-eye' ? 'fa fa-eye-slash' : 'fa fa-eye';
    },
  },
};
</script>

<style scoped>
#formInputs {
  justify-content: center;
}
input:valid {
  border: 2px solid green;
}
#passwordDiv {
  position: relative;
  margin-bottom: 10px;
  left: 13px;
}
#togglePass {
  position: relative;
  right: 25px;
  border: none;
  border-radius: 100%;
  outline: none;
  text-align: center;
  padding: 2px;
  font-size: 0.8em;
  color: black;
  background: none;
}
#passwordDiv {
  display: flex;
  flex-direction: row;
  margin: 0;
  justify-content: center;
}
#passwordDiv.input {
  flex-grow: 2;
  border: none;
}
</style>
