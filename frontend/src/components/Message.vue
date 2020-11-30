<template>
  <div class="message-container" @click="showMenuButton">
    <div :class="isUser ? 'message-user' : 'message-notuser'">
      <div>
        {{ message.content }}
      </div>
      <div class="user">
        {{ message.user }}
      </div>
      <div class="date">
        {{ message.date }}
      </div>
      <button class="menu-button" v-if="isUser & showMenu" @click="removeMessage">Remove</button>
    </div>
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
      showMenu: false,
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
    showMenuButton() {
      this.showMenu = !this.showMenu;
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
  flex-direction: column;
}

.message-user:hover {
  background-color: #88c0d0;
}

.message-notuser {
  margin: 0.2em;
  background-color: #5e81ac;
  color: #eceff4;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: right;
  display: flex;
  flex-direction: column;
}
.user {
  font-size: 0.8em;
}
.date {
  font-size: 0.5em;
}

.menu-button {
  padding: 5px 7px;
  background-color: #bf616a;
}
</style>
