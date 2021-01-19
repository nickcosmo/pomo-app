const mutations = {
  changeAuthState: (state, payload) => (state.isLoggedIn = payload),
  updateLogOutTime: (state) => (state.logOutTime = state.logOutTime - 1000),
  updateLogOutTimerId: (state, timerId) => (state.logOutTimerId = timerId),
  resetLogOutTime: (state) => (state.logOutTime = 10000),
  newSignIn: (state, payload) => {
    state.newSignIn = !state.newSignIn;
    payload ? (state.name = payload) : null;
  },
  newSignUp: (state, payload) => {
    state.newSignUp = !state.newSignUp;
    payload ? (state.name = payload) : null;
  },
  removeName: (state) => (state.name = null),
};

export default mutations;
