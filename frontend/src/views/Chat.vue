<template>
  <div class="chat">
    <ChatMessages class="chat-messages" :messages="messages" @remove-message="removeMessage" />
    <MessageForm @add-message="addMessage" />
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
    async addMessage(message) {
      const newMessage = await messageService.create(message);
      this.messages = [...this.messages, newMessage];
    },
    async getMessages() {
      const m = await messageService.getAll();
      this.messages = m.filter((o) => o.roomId === parseInt(this.$route.params.id));
    },
    async removeMessage(id) {
      await messageService.remove(id);
      await this.getMessages();
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
.chat-messages {
  margin-left: 2em;
  margin-right: 2em;
}

.form-container {
  /* position: sticky;
  bottom: 0; */
}
</style>
