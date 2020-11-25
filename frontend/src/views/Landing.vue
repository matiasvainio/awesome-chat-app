<template>
  <div>
    <h1>Awesome Chat App</h1>
    <button @click="login = !login">login</button>
    <button>signup</button>
    <LoginForm v-if="login" />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';
export default {
  components: {
    LoginForm,
  },
  data: function() {
    return {
      login: false,
    };
  },
};
</script>

<style></style>
