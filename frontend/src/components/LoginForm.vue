<template>
  <div class="login-container">
    <h3>login</h3>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">username</label>
        <div>
          <input
            id="username"
            v-model="username"
            type="text"
          >
        </div>
      </div>
      <label for="password">password</label>
      <div id="passwordDiv">
        <div>
          <input
            v-model="password"
            :type="passwordFieldType"
          >
        </div>
        <button
          id="togglePass"
          type="button"
          :class="eyeClass"
          aria-hidden="true"
          @click="toggleVisibility"
        />
      </div>
      <button>login</button>
    </form>
    <div
      v-if="showNotification"
      class="login-notification"
    >
      <h3>Wrong username or password</h3>
    </div>
  </div>
</template>

<script>
import userService from '@/services/users';
import authService from '@/services/auth';
import utils from '../utils/utils';

/**
 * Handles user login.
 */

export default {
  data: function() {
    return {
      users: [],
      username: '',
      password: '',
      passwordFieldType: 'password',
      eyeClass: 'fa fa-eye',
      showNotification: false,
    };
  },
  methods: {
    /**
     * Handles user login. Converts username and password into lowercase. Sets user to window local storage.
     */
    async handleLogin() {
      try {
        const usernameLowerCase = this.username.toLowerCase();
        const user = await authService.login({
          username: usernameLowerCase,
          password: this.password,
        });

        utils.setUser(user);
        this.$router.push('/home');
      } catch (exception) {
        this.showNotification = !this.showNotification;
        setTimeout(() => {
          this.showNotification = !this.showNotification;
        }, 2000);
      }
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

<style>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.login-notification {
  border: none;
  color: white;
  background-color: #4c566a;
  padding: 15px 30px;
  margin: 5px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  width: 50%;
  margin: auto;
}
</style>
