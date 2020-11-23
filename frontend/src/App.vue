<template>
  <div id="app">
    <h1>Awesome chat-app</h1>
    <ChatMessages :messages="messages" />
    <MessageForm @add-message="addMessage" />
  </div>
</template>

<script>
import ChatMessages from '@/components/ChatMessages.vue';
import MessageForm from '@/components/MessageForm.vue';
import messageService from './services/messages';

export default {
  name: 'App',
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
    },
    async getMessages() {
      this.messages = await messageService.getAll();
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
