<template>
  <div>
    <form @submit.prevent="handleForm">
      <input name="content" v-model="content" type="text" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MessageForm',
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
    },
  },
};
</script>

<style></style>
