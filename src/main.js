import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";


import Timer from './components/Timer.vue';
import Signin from './components/Signin.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/timer" },
    { path: "/timer", component: Timer },
    { path: "/signin", component: Signin },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
