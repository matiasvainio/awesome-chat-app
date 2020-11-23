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

export default {
  name: 'App',
  components: {
    ChatMessages,
    MessageForm,
  },
  data() {
    return {
      messages: [
        {
          id: 1,
          content: 'Lorem ipsum dolor sit amet.',
        },
        {
          id: 2,
          content: 'Suspendisse vehicula lacus ut tellus.',
        },
        {
          id: 3,
          content: 'Vivamus malesuada egestas urna, ac.',
        },
      ],
    };
  },
  methods: {
    addMessage(message) {
      this.messages = [...this.messages, message];
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
