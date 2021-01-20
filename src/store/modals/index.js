
// import actions from "./actions";
// import mutations from "./mutations";
// import getters from "./getters";

const modalModule = {
  state() {
    return {
        loading: false,
        modalStatus: false
    };
  },
  mutations: {
      load: (state) => state.loading = !state.loading,
      changeModalStatus: (state) => state.modalStatus = !state.modalStatus,
  },
  actions: {},
  getters: {}
};

export default modalModule;
