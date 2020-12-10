<template>
  <div
    v-if="user"
    class="home"
  >
    <h1>Home</h1>
    <h3>Welcome {{ user }}</h3>
    <div class="room-links">
      <div
        v-for="room in rooms"
        :key="room.id"
      >
        <router-link :to="`/chat/${room.id}`">
          <h3>{{ room.roomName }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import messageService from '@/services/messages';
import roomService from '@/services/rooms';
import utils from '../utils/utils';

export default {
  name: 'Home',
  data() {
    return {
      rooms: [],
      user: '',
    };
  },
  created() {
    this.getCurrentUser();
  },
  mounted() {
    this.getRooms();
    this.getCurrentUser();
  },
  methods: {
    async getRooms() {
      this.rooms = await roomService.getRooms();
    },
    getCurrentUser() {
      const user = utils.getUser();
      if (user) this.user = utils.getUser().data.username;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('../res/bg2.jpg');
  background-size: cover;
  height: 88vh;
}

.room-links {
  width: 12em;
  margin-top: 5em;
  margin-left: auto;
  margin-right: auto;
}

a h3:hover {
  background-color: #5e81ac;
}

a h3 {
  margin: 10px;
  border: none;
  color: white;
  background-color: #4c566a;
  padding: 15px 30px;
  margin: 5px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
}

a {
  text-decoration: none;
}
</style>
