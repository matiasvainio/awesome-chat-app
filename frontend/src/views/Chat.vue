<template>
  <div class="chat">
    <div class="users">
      <h3>Users:</h3>
      <div v-for="user in users" :key="user" class="user-item">
        {{ user }}
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
    };
  },
  created() {
    if (process.env.NODE_ENV === 'production')
      this.socket = io('https://awesome-chat-app-beta.herokuapp.com');
    else this.socket = io('http://localhost:3000');
    this.getRoom();
    window.addEventListener('beforeunload', this.removeUserAfterClose);
  },
  mounted() {
    this.getMessages();
    this.addUserToRoom();
    this.socket.emit('conn-room', utils.getUser().data.username);
    this.socket.on('change', (data) => {
      this.getMessages();
    });
    this.socket.on('change-user', (data) => {
      this.getRoom();
    });

    this.socket.on('current-users', (data) => {
      if (data.id === this.room.id) {
        messageService.updateRoomUsers(this.$route.params.id, data);
      }
    });
  },
  beforeUnmount() {
    this.removeUserFromRoom();
    this.socket.off('change-user');
  },
  methods: {
    async addMessage(message) {
      const newMessage = await messageService.create(message);
      this.messages = [...this.messages, message];
    },
    async getMessages() {
      const m = await messageService.getAll(this.$route.params.id);
      this.messages = m;
    },
    async removeMessage(id) {
      await messageService.remove(id);
      await this.getMessages();
    },
    async modifyMessage(message) {
      await messageService.modify(message);
    },
    async getRoom() {
      const rooms = await messageService.getRooms();
      const room = rooms.filter((room) => room.id === this.$route.params.id)[0];
      this.room = room;
      this.users = room.users;
    },
    async addUserToRoom() {
      const rooms = await messageService.getRooms();
      const room = rooms.filter((room) => room.id === this.$route.params.id)[0];
      room.users = room.users.concat(utils.getUser().data.username);
      this.room = room;
      this.users = room.users;
      messageService.updateRoomUsers(this.$route.params.id, room);
    },
    removeUserFromRoom() {
      const room = this.room;
      room.users = room.users.filter((user) => user !== utils.getUser().data.username);
      messageService.updateRoomUsers(room.id, room);
    },
    // removeUserAfterClose() {
    //   const room = this.room;
    //   room.users = room.users.filter((user) => user !== utils.getUser().data.username);
    //   messageService.updateRoomUsers(room.id, room);
    //   this.socket.emit('user-disconnect', room);
    // },
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
  /* background-color: #4c566a; */
  background-color: #d8dee9;
  /* color: #eceff4; */
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
