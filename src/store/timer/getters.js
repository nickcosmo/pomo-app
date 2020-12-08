const getters = {
  displayMinutes(state) {
    if (state.currentTime.minutes <= 9) {
      return `0${state.currentTime.minutes}`;
    }
    return state.currentTime.minutes;
  },
  displaySeconds(state) {
    if (state.currentTime.seconds <= 9) {
      return `0${state.currentTime.seconds}`;
    }
    return state.currentTime.seconds;
  },
};

export default getters;
