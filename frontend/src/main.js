import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueSocketIO from 'vue-socket.io';
import * as io from 'socket.io-client';

const chatApp = createApp(App);
chatApp.use(router);
chatApp.mount('#app');
