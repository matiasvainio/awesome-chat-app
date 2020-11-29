<template>
  <div class="home">
    <h1>home</h1>
    <div class="room-links" v-for="room in rooms" :key="room.id">
      <router-link :to="`/chat/${room.roomId}`">
        <h3>{{ room.roomName }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import messageService from '@/services/messages';

export default {
  name: 'Home',
  data() {
    return {
      rooms: [],
    };
  },
  mounted() {
    this.foo();
  },
  methods: {
    async foo() {
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
  grid-row: 2;
  grid-column: 2/3;
}

a h3 {
  margin: 10px;
  background-color: pink;
}
</style>
