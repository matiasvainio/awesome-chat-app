<template>
  <div class="home">
    <h1>home</h1>
    <h3>{{ user }}</h3>
    <div class="room-links" v-for="room in rooms" :key="room.id">
      <router-link :to="`/chat/${room.roomId}`">
        <h3>{{ room.roomName }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import messageService from '@/services/messages';
import utils from '../utils/utils';

export default {
  name: 'Home',
  data() {
    return {
      rooms: [],
      user: utils.getUser(),
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = await messageService.getRooms();
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

a h3 {
  margin: 10px;
  background-color: pink;
}
</style>
