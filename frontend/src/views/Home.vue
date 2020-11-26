<template>
  <div class="home">
    <h1>home</h1>
    <div class="chat-links">
      <router-link to="/chat/1">
        <h3>chat 1</h3>
      </router-link>
      <router-link to="/chat/2">
        <h3>chat 2</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import messageService from '@/services/messages';

export default {
  name: 'Home',
  mounted() {
    this.foo();
  },
  methods: {
    async foo() {},
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-row: 2;
  grid-column: 2/3;
}

a h3 {
  margin: 10px;
  background-color: pink;
}
</style>
