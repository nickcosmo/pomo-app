const mutations = {
  updateLogOutTime: (state) => (state.logOutTime = state.logOutTime - 1000),
  updateLogOutTimerId: (state, timerId) => (state.logOutTimerId = timerId),
  resetLogOutTime: (state) => (state.logOutTime = 10000),
  updateLogInState: (state, payload) => state.isLoggedIn = payload,
};

export default mutations;
