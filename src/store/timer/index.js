import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      timeSettings: {
        studyInterval: 25,
        breakInterval: 5,
        longBreakInterval: 15,
      },
      currentTime: {
        minutes: 0,
        seconds: 0,
      },
      status: "study",
      startCount: 0,
      intId: null,
      progressSeconds: 0,
      progressWidth: 0,
      pomodoroCount: 0,
    };
  },
  mutations: {
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
    startTracker(state) {
      state.startCount++;
    },
    setTitle(state) {
        let displayMins;
        let displaySecs;
      if (state.currentTime.minutes <= 9) {
        displayMins = `0${state.currentTime.minutes}`;
      } else {
        displayMins = state.currentTime.minutes;
      }
      if (state.currentTime.seconds <= 9) {
        displaySecs = `0${state.currentTime.seconds}`;
      } else {
        displaySecs = state.currentTime.seconds;
      }
      return document.title = `${displayMins}:${displaySecs}`;
    },
    incrementTimer(state) {
      let initMins;
      if (state.status === "study") {
        initMins = state.timeSettings.studyInterval;
      } else if (state.status === "break") {
        initMins = state.timeSettings.breakInterval;
      } else {
        initMins = state.timeSettings.longBreakInterval;
      }
      if (state.currentTime.seconds === 0 && state.currentTime.minutes === 0) {
        return null; // add reset feature here
      }
      if (state.currentTime.minutes >= 0) {
        if (state.currentTime.seconds === 0) {
          state.currentTime.seconds = 59;
          state.currentTime.minutes--;
        } else {
          state.currentTime.seconds--;
        }
      }
      state.progressSeconds++;
      state.progressWidth = (state.progressSeconds / (initMins * 60)) * 100;
    },
  },
  actions: {
    startTimer(context) {
      context.commit("startTracker");
      if (context.state.startCount === 1) {
        setInterval(function() {
          context.commit("incrementTimer");
          context.commit("setTitle");
        }, 1000);
      }
    },
  },
  getters: {
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
  },
});

export default store;
