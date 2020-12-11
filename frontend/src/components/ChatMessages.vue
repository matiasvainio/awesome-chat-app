<template>
  <div class="chat-messages">
    <div ref="messageList" class="message-list">
      <ul>
        <li v-for="message in messages" :key="message.id">
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
/**
 * Component which lists messages sent on current channel.
 */
import Message from '@/components/Message';
import messageService from '@/services/messages';

export default {
  name: 'ChatMessages',
  components: {
    Message,
  },
  props: {
    /**
     * The list which contains the message objects.
     */
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
    /**
     * Emits id of the message to be removed to parent component.
     * @params Id Id of the message.
     */
    removeMessage(id) {
      this.$emit('remove-message', id);
    },

    /**
     * Emits message which gets sent to
     */
    modifyMessage(message) {
      this.$emit('modify-message', message);
    },
    /**
     * Automatically scrolls the viewport down when new messages are sent.
     */
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
