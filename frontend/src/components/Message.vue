<template>
  <div class="message" :class="isUser ? 'message-user' : 'message-notuser'">
    <div>
      {{ message.content }}
    </div>
    <div class="user">
      {{ message.user }}
    </div>
    <div class="date">
      {{ message.date }}
    </div>
    <button class="menu-button" v-if="isUser" @click="removeMessage">x</button>
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
      console.log(this.message.date);
      const user =
        utils.getUser().data.username === this.message.user
          ? (this.isUser = true)
          : (this.isUser = false);
    },
    removeMessage() {
      this.$emit('remove-message', this.message.id);
    },
  },
};
</script>

<style>
.message-user {
  margin: 0.2em;
  background-color: #4c566a;
  color: #eceff4;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

.menu-button {
  padding: 5px 7px;
  background-color: red;
}
</style>
