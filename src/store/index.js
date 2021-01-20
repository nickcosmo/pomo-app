import { createStore } from "vuex";

import authModule from "./auth/index.js";
import timerModule from "./timer/index.js";
import dashModule from "./dashboard/index.js"
import modalModule from "./modals/index.js"

const store = createStore({
  modules: {
    authModule: authModule,
    timerModule: timerModule,
    dashModule: dashModule,
    modalModule: modalModule
  }
});

export default store;