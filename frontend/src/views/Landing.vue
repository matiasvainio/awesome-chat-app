<template>
  <div class="landing">
    <h1>Awesome Chat App Beta</h1>
    <div class="landing-forms">
      <LoginForm v-if="login" />
      <SignupForm v-if="signup" />
    </div>
    <div class="buttons">
      <button
        id="login"
        @click="handleShow"
      >
        login
      </button>
      <div>
        <button
          id="signup"
          @click="handleShow"
        >
          sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

export default {
  components: {
    LoginForm,
    SignupForm,
  },
  data: function() {
    return {
      login: false,
      signup: false,
    };
  },
  methods: {
    /**
     * Handles which form (login or sign up) is shown to the user. Pressing buttons toggles
     * between login and sign up.
     */
    handleShow(event) {
      event.target.id === 'login' ? ((this.login = true), (this.signup = false)) : null;
      event.target.id === 'signup' ? ((this.signup = true), (this.login = false)) : null;
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 3em;
}

.landing {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-image: url('../res/bg2.jpg');
  background-size: cover;
}

button {
  width: 12em;
}

.buttons {
  width: 100%;
}
</style>
