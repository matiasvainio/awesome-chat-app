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
  </div>
</template>

<script>
import utils from '@/utils/utils';

export default {
  name: 'Message',
  props: ['message'],
  data: function() {
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
  },
};
</script>

<style scoped>
.message {
  margin: 0.2em;
  background-color: #4c566a;
  color: #eceff4;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
}
.message-notuser {
  margin: 0.2em;
  background-color: #5e81ac;
  color: #eceff4;
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
