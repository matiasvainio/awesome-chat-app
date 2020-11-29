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
  mounted() {
    this.getMessages();
  },
  methods: {
    async addMessage(message) {
      const newMessage = await messageService.create(message);
      console.log('newmessage', newMessage);
      this.messages = [...this.messages, newMessage];
    },
    async getMessages() {
      const m = await messageService.getAll();
      this.messages = m.filter((o) => o.roomId === parseInt(this.$route.params.id));
    },
    async removeMessage(id) {
      messageService.remove(id);
      this.messages = this.getMessages();
    },
  },
};
</script>

<style scoped>
.chat {
  grid-column: 2/3;
}
</style>
