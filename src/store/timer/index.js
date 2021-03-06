
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const timerModule = {
  state() {
    return {
      dailyGoal: 0,
      timeSettings: {
        studyInterval: 25,
        breakInterval: 5,
        longBreakInterval: 15,
      },
      currentTime: {
        minutes: 0,
        seconds: 0,
      },
      pause: false,
      status: "study",
      startCount: 0,
      intId: null,
      progressSeconds: 0,
      progressWidth: 0,
      pomodoroCount: 0,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
};

export default timerModule;
