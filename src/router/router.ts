import MainPage from '@/pages/MainPage.vue';
import SettingsPage from '@/pages/SettingsPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/',
    component: MainPage
  },
  {
    name: 'settings',
    path: '/settings',
    component: SettingsPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
