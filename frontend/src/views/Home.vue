<template>
  <div>
    <h1>home</h1>
    <router-link to="/chat/1">
      <h3>chat 1</h3>
    </router-link>
    <router-link to="/chat/2">
      <h3>chat 2</h3>
    </router-link>
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

<style></style>
