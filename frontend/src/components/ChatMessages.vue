<template>
  <div class="chat-messages">
    <ul>
      <li v-for="message in messages" :key="message.id">
        <Message :message="message" @remove-message="removeMessage" />
      </li>
    </ul>
  </div>
</template>

<script>
import Message from '@/components/Message';
import messageService from '@/services/messages';

export default {
  name: 'ChatMessages',
  components: {
    Message,
  },
  props: ['messages'],
  methods: {
    removeMessage(id) {
      this.$emit('remove-message', id);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
