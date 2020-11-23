<template>
  <div id="app">
    <h1>Awesome chat-app</h1>
    <ChatMessages :messages="messages" />
    <MessageForm @add-message="addMessage" />
  </div>
</template>

<script>
import axios from 'axios';

import ChatMessages from '@/components/ChatMessages.vue';
import MessageForm from '@/components/MessageForm.vue';

const baseUrl = 'http://localhost:3000/messages';

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
      const response = await axios.get(baseUrl);
      this.messages = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
