import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import Account from '@/pages/Account.vue';
import Home from '@/pages/Home.vue';

import App from './App.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', component: Home },
    { path: '/account/:address', component: Account },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
