
// import actions from "./actions";
// import mutations from "./mutations";
// import getters from "./getters";

const modalModule = {
  state() {
    return {
        loading: false,
        modalStatus: false,
        modalType: null,
        modalErrors: null,
        modalMessage: ''
    };
  },
  mutations: {
      load: (state) => state.loading = !state.loading,
      updateModalStatus: (state) => state.modalStatus = !state.modalStatus,
      updateModalType: (state, type) => state.modalType = type,
      updateModalErrorData: (state, errors) => state.modalErrors = errors,
      updateModalMessage: (state, message) => state.modalMessage = message,
  },
  actions: {},
  getters: {}
};

export default modalModule;
