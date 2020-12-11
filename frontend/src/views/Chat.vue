<template>
  <div class="chat">
    <div class="users">
      <h3>Users:</h3>
      <div v-for="userItem in users" :key="userItem.id" class="user-item scale-in-center">
        {{ userItem.username }}
      </div>
    </div>
    <ChatMessages
      class="chat-messages"
      :messages="messages"
      @remove-message="removeMessage"
      @modify-message="modifyMessage"
    />
    <MessageForm class="message-form" @add-message="addMessage" />
  </div>
</template>

<script>
import ChatMessages from '@/components/ChatMessages.vue';
import MessageForm from '@/components/MessageForm.vue';
import messageService from '@/services/messages';
import userService from '@/services/users';
import roomService from '@/services/rooms';
import utils from '../utils/utils';
import io from 'socket.io-client';

export default {
  name: 'Chat',
  components: {
    ChatMessages,
    MessageForm,
  },
  data() {
    return {
      room: {},
      messages: [],
      users: [],
      socket: {},
      user: {},
    };
  },
  created() {
    if (process.env.NODE_ENV === 'production') {
      this.socket = io('https://awesome-chat-app-beta.herokuapp.com');
    } else {
      this.socket = io('http://localhost:3000');
    }
  },
  mounted() {
    this.setupRoom();
    this.getMessages();
    this.addRoomTouser();
    this.socket.on('change', (data) => {
      this.getMessages();
    });

    this.socket.on('user-change', (data) => {
      this.setupRoom();
    });
  },
  beforeUnmount() {
    this.removeUserFromRoom();
    this.socket.off('user-change');
  },
  methods: {
    /**
     * Adds message to database and to messages state.
     * @param{object} message Message to be added to db.
     */
    async addMessage(message) {
      const newMessage = await messageService.create(message);
      this.messages = [...this.messages, message];
    },
    /**
     * Gets messages from the database and adds them to messages state.
     */
    async getMessages() {
      const m = await messageService.getAll(this.$route.params.id);
      this.messages = m;
    },
    /**
     * Removes message from the database.
     * @param{string} id Id of the message to be removed.
     */
    async removeMessage(id) {
      await messageService.remove(id);
      await this.getMessages();
    },
    /**
     * Modifies targeted message in the database.
     * @param{object} message Message to be modified.
     */
    async modifyMessage(message) {
      await messageService.modify(message);
    },
    /**
     * Sets up current room on user connect. Adds current rooms users to this.users
     * state by filtering users based on their id. Sets up current user state.
     */
    async setupRoom() {
      const users = await userService.getAll();
      this.users = users.filter((user) => {
        if (user.room) {
          if (user.room.id === this.$route.params.id) {
            return user;
          }
        }
      });
      this.user = this.users.filter((user) => user.id === utils.getUser().data.id);
    },
    /**
     * Removes current user from users collection.
     */
    async removeUserFromRoom() {
      const newUser = this.user[0];
      newUser.room = null;
      await userService.modify(newUser);
    },
    /**
     * Modifies current user by adding room id to it's room key.
     */
    async addRoomTouser() {
      const currUser = await userService.getUser(utils.getUser().data.id);
      const currRoom = this.$route.params.id;
      currUser.room = currRoom;
      userService.modify(currUser);
    },
  },
};
</script>

<style scoped>
.chat {
  height: 100%;
  display: grid;
  grid-template-columns: 50px 0.5fr 1fr 50px;
  grid-template-rows: 1fr 0.01fr;
}

.users {
  position: fixed;
  top: 10em;
  width: 15%;
  height: 100%;
  width: 25%;
  overflow-y: scroll;
  margin-left: 50px;
  height: 67%;
}

.user-item {
  margin: 0.2em;
  background-color: #d8dee9;
  color: #4c566a;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
}

.chat-messages {
  grid-column: 3/4;
}

.message-form {
  background-color: #d8dee9;
  position: sticky;
  bottom: 0;
  padding: 0.8em;
  grid-column: 1/5;
  position: fixed;
}

.scale-in-center {
  -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scale-out-center {
  -webkit-animation: scale-out-center 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: scale-out-center 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-out-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
}

@media screen and (max-width: 1200px) {
  .chat-messages {
    grid-column: 1/5;
  }

  .users {
    display: none;
  }

  .message-form {
    grid-column: 1/5;
  }
}
</style>
