<template>
  <div class="landing">
    <h1>Awesome Chat App</h1>
    <button id="login" @click="handleShow">login</button>
    <button id="signup" @click="handleShow">signup</button>
    <LoginForm v-if="login" />
    <SignupForm v-if="signup" />
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
    handleShow(event) {
      event.target.id === 'login' ? ((this.login = true), (this.signup = false)) : null;
      event.target.id === 'signup' ? ((this.signup = true), (this.login = false)) : null;
    },
  },
};
</script>

<style scoped>
.landing {
  grid-column: 2/3;
}
</style>
