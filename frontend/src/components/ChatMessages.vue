<template>
  <div class="chat-messages">
    <div
      ref="messageList"
      class="message-list"
    >
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
        >
          <Message
            :message="message"
            @remove-message="removeMessage"
            @modify-message="modifyMessage"
          />
        </li>
      </ul>
    </div>
    <div ref="bottom" />
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
  props: {
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['remove-message', 'modify-message'],

  updated() {
    setTimeout(() => {
      this.scrollDown();
    }, 75);
  },
  methods: {
    removeMessage(id) {
      this.$emit('remove-message', id);
    },
    modifyMessage(message) {
      this.$emit('modify-message', message);
    },
    scrollDown() {
      window.scrollTo(0, this.$refs.messageList.scrollHeight);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.message-list {
  margin-bottom: 80px;
}
</style>
