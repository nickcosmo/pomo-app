const actions = {
  startTimer(context) {
    let interval;
    context.state.pause ? context.commit("pauseTimer") : null;
    context.commit("startTracker");
    if (context.state.startCount === 1) {
      interval = setInterval(function() {
        if (!context.state.pause) {
          // calculate total mins for progress bar
          let initMins;
          if (context.state.status === "study") {
            initMins = context.state.timeSettings.studyInterval;
          } else if (context.state.status === "break") {
            initMins = context.state.timeSettings.breakInterval;
          } else {
            initMins = context.state.timeSettings.longBreakInterval;
          }

          // reset timer logic when finished
          if (
            context.state.currentTime.seconds === 0 &&
            context.state.currentTime.minutes === 0
          ) {
            if (
              context.state.status === "study" &&
              localStorage.getItem("loggedIn") === "true"
            ) {
              context.dispatch("updateHours");
            }
            context.dispatch("resetTimer");
            context.dispatch("setTitle");
            return null;
          }

          // logic to decrease mins and reset seconds
          if (context.state.currentTime.minutes >= 0) {
            if (context.state.currentTime.seconds === 0) {
              context.commit("decreaseMinutes");
              context.commit("decreaseSeconds", 59);
            } else {
              context.commit("decreaseSeconds", null);
            }
          }

          // call mutations each cycle
          context.commit("updateProgressSeconds");
          context.commit("updateProgressWidth", initMins);
          context.dispatch("setTitle");
        }
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
  updateSettings(context, newSettings) {
    const settings = {
      studyInterval: newSettings.studyInterval,
      breakInterval: newSettings.breakInterval,
      longBreakInterval: newSettings.longBreakInterval,
    };
    context.commit("updateSettings", settings);
  },
};

export default actions;
