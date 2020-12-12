const actions = {
  startTimer(context) {
    let interval;
    context.commit("startTracker");
    if (context.state.startCount === 1) {
      interval = setInterval(function() {
        let initMins;
        if (context.state.status === "study") {
          initMins = context.state.timeSettings.studyInterval;
        } else if (context.state.status === "break") {
          initMins = context.state.timeSettings.breakInterval;
        } else {
          initMins = context.state.timeSettings.longBreakInterval;
        }
        if (
          context.state.currentTime.seconds === 0 &&
          context.state.currentTime.minutes === 0
        ) {
          context.dispatch("resetTimer");
        }
        if (context.state.currentTime.minutes >= 0) {
          if (context.state.currentTime.seconds === 0) {
            context.commit("decreaseMinutes");
            context.commit("decreaseSeconds", 59);
          } else {
            context.commit("decreaseSeconds", null);
          }
        }
        context.commit("updateProgressSeconds");
        context.commit("updateProgressWidth", initMins);
        context.dispatch("setTitle");
      }, 1000);
      context.commit("intervalId", interval);
    }
  },
  resetTimer(context) {
      clearInterval(context.state.intId);
      context.commit("resetStartCount");
      context.commit("resetValues");
      context.dispatch("setTitle");
  },
  setTitle(context) {
    return (document.title = `${context.getters.displayMinutes}:${context.getters.displaySeconds}`);
  },
  updateSettings(context, values) {
    if (values[1] === "study") {
      context.commit("updateStudyInterval", values[0]);
    } else if (values[1] === "break") {
      context.commit("updateBreakInterval", values[0]);
    } else {
      context.commit("updateLongBreakInterval", values[0]);
    }
  },
  // resetValues(context) {
  //   state.startCount = 0;
  //   state.currentTime.seconds = 0;
  //   state.progressSeconds = 0;
  //   state.progressWidth = 0;
  //   if(state.status === "longBreak") {
  //     state.pomodoroCount = 0;
  //     state.status = "study";
  //     state.currentTime.minutes = state.timeSettings.studyInterval;
  //     return null;
  //   }
  //   if (state.status === "study") {
  //     state.pomodoroCount++;
  //     if (state.pomodoroCount === 4) {
  //       state.status = "longBreak";
  //       state.currentTime.minutes = state.timeSettings.longBreakInterval;
  //       return null;
  //     }
  //     state.status = "break";
  //     state.currentTime.minutes = state.timeSettings.breakInterval;
  //     return null
  //   }
  // }
};

export default actions;
