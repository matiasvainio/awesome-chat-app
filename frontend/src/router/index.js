import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Landing from '../views/Landing.vue';
import Chat from '../views/Chat.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      header: 'none',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat/:id',
    component: Chat,
    name: 'Chat',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
