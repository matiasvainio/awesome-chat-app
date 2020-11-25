<template>
  <div id="app">
    <h1>Awesome chat-app</h1>
    <ChatMessages
      class="chat-messages"
      :messages="messages"
    />
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
      messageService.create(message);
    },
    async getMessages() {
      this.messages = await messageService.getAll();
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app .chat-messages {
  margin: auto;
  width: 50%;
}

#app h1 {
  text-align: center;
}
</style>
