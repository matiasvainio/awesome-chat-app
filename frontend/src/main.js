import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const chatApp = createApp(App);
chatApp.use(router);
chatApp.mount('#app');
