<template>
  <div class="chat-messages">
    <ul>
      <li v-for="message in messages" :key="message.id">
        <Message :message="message" />
      </li>
    </ul>
  </div>
</template>

<script>
import Message from '@/components/Message';

export default {
  name: 'ChatMessages',
  components: {
    Message,
  },
  props: ['messages'],
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
