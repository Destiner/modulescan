import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import Account from '@/pages/Account.vue';
import Home from '@/pages/Home.vue';
import Module from '@/pages/Module.vue';

import App from './App.vue';

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/account/:chain/:address', name: 'account', component: Account },
    { path: '/module/:chain/:address', name: 'module', component: Module },
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');

export { routerHistory, router };
