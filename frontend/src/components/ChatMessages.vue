<template>
  <div class="chat-messages">
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChatMessages',
  props: ['messages'],
};
</script>

<style scoped></style>
