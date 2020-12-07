<template>
  <div
    v-if="user"
    class="message-form"
  >
    <form
      autocomplete="off"
      @submit.prevent="handleForm"
    >
      <input
        v-model="formContent"
        name="content"
        type="text"
        placeholder="Message.."
      >
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
      date: '',
    };
  },
  updated() {
    this.date = new Date();
  },
  methods: {
    handleForm() {
      const newMessage = {
        id: String,
        roomId: this.$route.params.id,
        content: this.formContent,
        date: this.createDateString(),
        user: utils.getUser().data.username,
      };

      this.$emit('add-message', newMessage);
      this.formContent = '';
    },
    createDateString() {
      const minutes = this.date.getMinutes();
      const hours = this.date.getHours();

      if (minutes < 10) {
        return hours + ':' + '0' + minutes;
      }
      return hours + ':' + minutes;
    },
  },
};
</script>

<style scoped>
.message-form {
  width: 100%;
}

.message-form input {
  width: 70%;
  border: none;
}
</style>
