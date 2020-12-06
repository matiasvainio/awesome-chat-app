<template>
  <div class="chat">
    <div class="users">
      <h3>Users:</h3>
      <div class="user-item" v-for="user in users" :key="user">
        {{ user }}
      </div>
    </div>
    <div class="chat-messages">
      <ChatMessages
        :messages="messages"
        @remove-message="removeMessage"
        @modify-message="modifyMessage"
      />
    </div>
    <MessageForm class="message-form" @add-message="addMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
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
    // this.socket = io('https://awesome-chat-app-beta.herokuapp.com');
    this.socket = io('http://localhost:3000');
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
      messageService.updateRoomUsers(this.$route.params.id, data);
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
    removeUserAfterClose() {
      const room = this.room;
      room.users = room.users.filter((user) => user !== utils.getUser().data.username);
      messageService.updateRoomUsers(room.id, room);
      this.socket.emit('user-disconnect', room);
    },
  },
};
</script>

<style scoped>
.chat {
  height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: 1fr 0.2fr;
}

.user-item {
  margin: 0.2em;
  background-color: #4c566a;
  color: #eceff4;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
}

.chat-messages {
  margin-left: 1em;
  margin-right: 1em;
}

.message-form {
  background-color: #d8dee9;
  position: sticky;
  bottom: 0;
  padding: 0.8em;
  margin-top: 3em;
  grid-column: 1/3;
}
</style>
