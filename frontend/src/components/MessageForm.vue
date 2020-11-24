<template>
  <div class="chat-messages">
    <form @submit.prevent="handleForm">
      <input v-model="content" name="content" type="text" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MessageForm',
  emits: ['add-message'],
  data() {
    return {
      message: {
        content: '',
      },
    };
  },
  methods: {
    handleForm() {
      const getId = () => Math.floor(Math.random() * 10000000);

      const newMessage = {
        id: getId(),
        content: this.content,
        date: new Date(),
      };
      this.$emit('add-message', newMessage);
      content = '';
    },
  },
};
</script>

<style></style>
