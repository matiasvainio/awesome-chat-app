<template>
  <div class="chat-messages">
    <form @submit.prevent="handleForm">
      <input v-model="formContent" name="content" type="text" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import utils from '@/utils/utils';

export default {
  name: 'MessageForm',
  emits: ['add-message'],
  data() {
    return {
      message: {
        content: '',
      },
      formContent: '',
    };
  },
  methods: {
    handleForm() {
      const newMessage = {
        id: utils.getId(),
        content: this.formContent,
        date: new Date(),
        user: utils.getUser(),
      };

      console.log(utils.getUser());
      this.$emit('add-message', newMessage);
      this.formContent = '';
    },
  },
};
</script>

<style></style>
