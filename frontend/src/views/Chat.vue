<template>
  <div class="chat">
    <div class="chat-messages">
      <ChatMessages :messages="messages" @remove-message="removeMessage" />
    </div>
    <MessageForm class="message-form" @add-message="addMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import ChatMessages from '@/components/ChatMessages.vue';
import MessageForm from '@/components/MessageForm.vue';
import messageService from '@/services/messages';
import io from 'socket.io-client';

export default {
  name: 'Chat',
  components: {
    ChatMessages,
    MessageForm,
  },
  data() {
    return {
      messages: [],
      socket: {},
    };
  },
  created() {
    this.socket = io('http://localhost:3000');
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    async addMessage(message) {
      const newMessage = await messageService.create(message);
      this.messages = [...this.messages, newMessage];
      this.socket.emit('message', newMessage);
    },
    async getMessages() {
      const m = await messageService.getAll();
      this.messages = m.filter((o) => o.roomId === parseInt(this.$route.params.id));
    },
    async removeMessage(id) {
      await messageService.remove(id);
      await this.getMessages();
    },
  },
};
</script>

<style scoped>
.chat {
  margin-bottom: 7em;
}

.chat-messages {
  margin-left: 2em;
  margin-right: 2em;
}

.message-form {
  background-color: #d8dee9;
  position: fixed;
  bottom: 0;
  padding: 0.8em;
}
</style>
