<template>
  <div class="chat">
    <ChatMessages class="chat-messages" :messages="messages" />
    <div class="bottom"></div>
    <div class="form-container">
      <MessageForm @add-message="addMessage" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatMessages from '@/components/ChatMessages.vue';
import MessageForm from '@/components/MessageForm.vue';
import messageService from '@/services/messages';

export default {
  name: 'Chat',
  components: {
    ChatMessages,
    MessageForm,
  },
  data() {
    return {
      messages: [],
    };
  },
  window() {},
  mounted() {
    this.getMessages();
    this.scrollDown();
  },
  methods: {
    addMessage(message) {
      console.log(message);
      this.messages = [...this.messages, message];
      messageService.create(message);
    },
    async getMessages() {
      // const m = await messageService.getRoomMessages(this.$route.params.id);
      // this.messages = m.messages;
      const m = await messageService.getAll();
      this.messages = m.filter((o) => o.roomId === this.$route.params.id);
    },
    scrollDown() {
      const el = this.$el.querySelector('bottom');
      console.log(el);

      if (el) {
        el.scrollIntoView(false);
      }
    },
  },
};
</script>

<style scoped>
.chat {
  grid-column: 2/3;
}

.form-container {
  /* position: sticky;
  bottom: 0; */
}
</style>
