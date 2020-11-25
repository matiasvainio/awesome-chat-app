<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">username</label>
        <input v-model="formUsername" type="text" />
      </div>
      <div>
        <label for="password">password</label>
        <input type="password" />
      </div>
      <button>login</button>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      username: 'Batman',
      formUsername: '',
    };
  },
  methods: {
    handleLogin() {
      if (this.username === this.formUsername) {
        this.$router.push('/home');
      }
    },
  },
};
</script>

<style></style>
