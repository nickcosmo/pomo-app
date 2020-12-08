const mutations = {
  initMinutes(state) {
    if (state.startCount === 0) {
      if (state.status === "study") {
        state.currentTime.minutes = state.timeSettings.studyInterval;
      } else if (state.status === "break") {
        state.currentTime.minutes = state.timeSettings.breakInterval;
      } else {
        state.currentTime.minutes = state.timeSettings.longBreakInterval;
      }
    }
  },
  intervalId: (state, interval) => (state.intId = interval),
  updateProgressSeconds: (state) => state.progressSeconds++,
  updateProgressWidth: (state, initMins) =>
    (state.progressWidth = (state.progressSeconds / (initMins * 60)) * 100),
  trackInterval: (state, interval) => (state.intId = interval),
  startTracker: (state) => state.startCount++,
  decreaseSeconds: (state, num) =>
    num ? (state.currentTime.seconds = num) : state.currentTime.seconds--,
  decreaseMinutes: (state) => state.currentTime.minutes--,
  resetValues(state) {
    state.startCount = 0;
    state.currentTime.seconds = 0;
    state.progressSeconds = 0;
    state.progressWidth = 0;
    if(state.status === "longBreak") {
      state.pomodoroCount = 0;
      state.status = "study";
      state.currentTime.minutes = state.timeSettings.studyInterval;
      return null;
    }
    if (state.status === "study") {
      state.pomodoroCount++;
      if (state.pomodoroCount === 4) {
        state.status = "longBreak";
        state.currentTime.minutes = state.timeSettings.longBreakInterval;
        return null;
      }
      state.status = "break";
      state.currentTime.minutes = state.timeSettings.breakInterval;
      return null
    }
    if(state.status === "break") {
      state.status = "study";
      state.currentTime.minutes = state.timeSettings.studyInterval;
      return null;
    }
  },
};

export default mutations;
