<template>
  <div class="home">
    <h1>Awesome chat-app</h1>
    <ChatMessages class="chat-messages" :messages="messages" />
    <MessageForm @add-message="addMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import ChatMessages from '@/components/ChatMessages.vue';
import MessageForm from '@/components/MessageForm.vue';
import messageService from '@/services/messages';

export default {
  name: 'Home',
  components: {
    ChatMessages,
    MessageForm,
  },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    addMessage(message) {
      this.messages = [...this.messages, message];
      messageService.create(message);
    },
    async getMessages() {
      this.messages = await messageService.getAll();
    },
  },
};
</script>

<style scoped></style>
