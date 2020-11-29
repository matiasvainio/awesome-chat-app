<template>
  <div class="chat">
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
    addMessage(message) {
      console.log(message);
      this.messages = [...this.messages, message];
      messageService.create(message);
    },
    async getMessages() {
      // const m = await messageService.getRoomMessages(this.$route.params.id);
      // this.messages = m.messages;
      const m = await messageService.getAll();
      this.messages = m.filter((o) => o.roomId === parseInt(this.$route.params.id));
    },
  },
};
</script>

<style scoped>
.chat {
  grid-column: 2/3;
}
</style>
