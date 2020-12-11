<template>
  <div :class="isUser ? 'message-container-user' : 'message-container-notuser'">
    <div
      :class="isUser ? 'message-user' : 'message-notuser'"
      class="scale-in-bottom"
      @click="showMenuButton"
    >
      <form
        class="modify-form"
        @submit.prevent="handleModify"
      >
        <input
          v-if="showInput"
          ref="modInput"
          type="text"
          :value="placeholder"
        >
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
      <button
        v-if="isUser & showMenu"
        class="menu-button"
        @click="removeMessage"
      >
        Remove
      </button>
      <button
        v-if="isUser & showMenu"
        class="menu-button"
        @click="showMod"
      >
        {{ mod }}
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Component which represents single message.
 */
import utils from '@/utils/utils';
import messageService from '@/services/messages';

export default {
  name: 'Message',
  props: {
    /**
     * Content of message. (user, content and date)
     */
    message: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['remove-message', 'modify-message'],
  data() {
    return {
      isUser: false,
      showMenu: false,
      showInput: false,
      mod: 'Modify',
    };
  },
  computed: {
    /**
     * Sets current the messages content as placeholder.
     * @returns message content.
     */
    placeholder() {
      return this.message.content;
    },
  },
  mounted() {
    this.alignMessages();
  },
  methods: {
    /**
     * Aligns messages on the page based on who sent them.
     */
    alignMessages() {
      const user =
        utils.getUser().data.username === this.message.user
          ? (this.isUser = true)
          : (this.isUser = false);
    },
    /**
     * Handles remove message click. Sends remove-message event.
     */
    removeMessage() {
      this.$emit('remove-message', this.message.id);
    },
    /**
     * Handles whether modify button reads modify or close.
     */
    showMod() {
      if (this.mod === 'Close') this.mod = 'Modify';
      else this.mod = 'Close';
      this.showInput = !this.showInput;
    },
    /**
     * Handles modify button action. Sends modify-message event.
     */
    handleModify() {
      const newMessage = this.message;
      newMessage.content = this.$refs.modInput.value;
      this.$emit('modify-message', newMessage);

      this.showInput = !this.showInput;
      this.showMenu = !this.showMenu;
    },
    /**
     * Handles message click. Shows menu which has remove and modify buttons.
     */
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
  max-width: 700px;
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
  max-width: 700px;
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

.scale-in-bottom {
  animation: scale-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes scale-in-bottom {
  0% {
    transform: scale(0);
    transform-origin: 50% 100%;
    opacity: 1;
  }
  100% {
    transform: scale(1);
    transform-origin: 50% 100%;
    opacity: 1;
  }
}
</style>
