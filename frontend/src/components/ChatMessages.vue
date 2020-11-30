<template>
  <div class="chat-messages">
    <div class="message-list" ref="messageList">
      <button @click="scrollDown">x</button>
      <ul>
        <li v-for="message in messages" :key="message.id">
          <Message :message="message" @remove-message="removeMessage" />
        </li>
      </ul>
    </div>
    <div ref="bottom"></div>
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
  updated() {
    setTimeout(() => {
      this.scrollDown();
    }, 75);
  },
  methods: {
    removeMessage(id) {
      this.$emit('remove-message', id);
    },
    scrollDown() {
      // console.log('scroll height', this.$refs.messageList.scrollHeight);
      window.scrollTo(0, this.$refs.messageList.scrollHeight);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
