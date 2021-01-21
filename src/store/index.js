import { createStore } from "vuex";

import authModule from "./auth/index.js";
import timerModule from "./timer/index.js";
import modalModule from "./modals/index.js"

const store = createStore({
  modules: {
    authModule: authModule,
    timerModule: timerModule,
    modalModule: modalModule
  }
});

export default store;