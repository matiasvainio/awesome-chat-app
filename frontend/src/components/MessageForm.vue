<template>
  <div class="message-form" v-if="user">
    <form @submit.prevent="handleForm" autocomplete="off">
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
      user: utils.getUser(),
    };
  },
  methods: {
    handleForm() {
      const newMessage = {
        id: String,
        roomId: this.$route.params.id,
        content: this.formContent,
        date: new Date(),
        user: utils.getUser().data.username,
      };

      this.$emit('add-message', newMessage);
      this.formContent = '';
    },
  },
};
</script>

<style scoped>
.message-form {
  width: 100%;
}

.message-form input {
  color: pink;
}
</style>
