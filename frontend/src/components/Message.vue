<template>
  <div :class="isUser ? 'message-container-user' : 'message-container-notuser'">
    <!-- <div class="icon"></div> -->
    <div :class="isUser ? 'message-user' : 'message-notuser'" @click="showMenuButton">
      <form class="modify-form" @submit.prevent="handleModify">
        <input type="text" v-if="showInput" ref="modInput" v-bind:value="placeholder" />
      </form>
      <div v-if="!showInput">
        {{ message.content }}
      </div>
      <div class="user">
        {{ message.user }}
      </div>
      <div class="date">
        {{ message.date }}
      </div>
      <button v-if="isUser & showMenu" class="menu-button" @click="removeMessage">
        Remove
      </button>
      <button v-if="isUser & showMenu" class="menu-button" @click="showMod">
        {{ mod }}
      </button>
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
      showInput: false,
      mod: 'Modify',
    };
  },
  mounted() {
    this.alignMessages();
  },
  computed: {
    placeholder() {
      return this.message.content;
    },
  },
  methods: {
    alignMessages() {
      const user =
        utils.getUser().data.username === this.message.user
          ? (this.isUser = true)
          : (this.isUser = false);
    },
    removeMessage() {
      this.$emit('remove-message', this.message.id);
    },
    showMod() {
      this.showInput = !this.showInput;
      this.mod = 'Close';
    },
    handleModify() {
      const newMessage = this.message;
      newMessage.content = this.$refs.modInput.value;
      this.$emit('modify-message', newMessage);

      this.showInput = !this.showInput;
      this.showMenu = !this.showMenu;
    },
    showMenuButton() {
      if (!this.showInput) {
        this.showMenu = !this.showMenu;
      }
    },
  },
};
</script>

<style scoped>
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

.message-container-notuser {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}

.message-container-user {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: flex-end;
}

.message-user:hover {
  background-color: #88c0d0;
  cursor: pointer;
}

.message-notuser {
  margin: 0.2em;
  background-color: #5e81ac;
  color: #eceff4;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.user {
  font-size: 0.8em;
}
.date {
  font-size: 0.5em;
}

.container {
  display: flex;
}

.icon {
  background-color: #bf616a;
  width: 50px;
  height: 50px;
  margin: 10px;
}

.menu-button {
  padding: 5px 7px;
  background-color: #bf616a;
}

.modify-form input {
  width: auto;
  border: none;
  height: 2em;
}
</style>
