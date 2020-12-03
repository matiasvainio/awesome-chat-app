<template>
  <div class="chat">
    <div class="chat-messages">
      <ChatMessages
        :messages="messages"
        @remove-message="removeMessage"
        @modify-message="modifyMessage"
      />
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
      key: this.id,
    };
  },
  created() {
    this.socket = io('http://localhost:3000');
    console.log('params', this.$route.params);
  },
  mounted() {
    this.getMessages();
    this.socket.on('change', (data) => {
      this.getMessages();
    });
  },
  methods: {
    async addMessage(message) {
      const newMessage = await messageService.create(message);
      this.messages = [...this.messages, message];
    },
    async getMessages() {
      const m = await messageService.getAll(this.$route.params.id);
      this.messages = m;
    },
    async removeMessage(id) {
      await messageService.remove(id);
      await this.getMessages();
    },
    async modifyMessage(message) {
      await messageService.modify(message);
    },
  },
};
</script>

<style scoped>
.chat {
  margin-bottom: 8em;
}

.chat-messages {
  margin-left: 1em;
  margin-right: 1em;
}

.message-form {
  background-color: #d8dee9;
  position: fixed;
  bottom: 0;
  padding: 0.8em;
}
</style>
