<template>
  <div :class="isUser ? 'message' : 'message-notuser'">
    <div>
      {{ message.content }}
    </div>
    <div class="user">
      {{ message.user }}
    </div>
    <div class="date">
      {{ message.date }}
    </div>
    <button @click="removeMessage">x</button>
  </div>
</template>

<script>
import utils from '@/utils/utils';
import messageService from '@/services/messages';

export default {
  name: 'Message',
  props: ['message'],
  data() {
    return {
      isUser: false,
    };
  },
  mounted() {
    this.alignMessages();
  },
  methods: {
    alignMessages() {
      const user = utils.getUser();
      user === this.message.user ? (this.isUser = true) : (this.isUser = false);
    },
    removeMessage() {
      this.$emit('remove-message', this.message.id);
    },
  },
};
</script>

<style scoped>
.message {
  margin: 0.2em;
  border: 2px black solid;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
}
.message-notuser {
  margin: 0.2em;
  border: 2px black solid;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: right;
}
.user {
  font-size: 0.8em;
}
.date {
  font-size: 0.5em;
}
</style>
