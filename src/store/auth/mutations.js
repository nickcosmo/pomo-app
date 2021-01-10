const mutations = {
    changeAuthState: (state, payload) => state.isLoggedin = payload,
    updateLogOutTime: (state) => state.logOutTime = state.logOutTime - 1000,
    updateLogOutTimerId: (state, timerId) => state.logOutTimerId = timerId,
    resetLogOutTime: (state) => state.logOutTime = 10000,
};

export default mutations;