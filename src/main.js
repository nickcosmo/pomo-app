import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Timer from "./components/Timer.vue";
import Signin from "./components/Signin.vue";
import Signup from "./components/Signup.vue";
import Dashboard from "./components/Dashboard.vue";
import Settings from "./components/Settings.vue";

import store from "./store/timer/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/timer" },
    { path: "/timer", component: Timer },
    { path: "/signin", component: Signin },
    { path: "/signup", component: Signup },
    { path: "/dashboard", component: Dashboard },
    { path: "/settings", component: Settings },
  ],
});

const app = createApp(App);

app.use(store);

app.use(router);

app.mount("#app");
