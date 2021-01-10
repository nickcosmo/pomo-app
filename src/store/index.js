import { createStore } from "vuex";

import authModule from "./auth/index.js";
import timerModule from "./timer/index.js";
import dashModule from "./dashboard/index.js"

const store = createStore({
  modules: {
    authModule: authModule,
    timerModule: timerModule,
    dashModule: dashModule
  }
});

export default store;