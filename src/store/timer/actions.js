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
              context.rootState.authModule.isLoggedIn === true
            ) {
              context.dispatch("updateHours");
            }
            context.dispatch("resetTimer");
            context.dispatch("setTitle");
            return null;
          }

          // decrease mins and reset seconds
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

  //update settings
  updateSettings(context, newSettings, goal) {
    const settings = {
      studyInterval: newSettings.studyInterval,
      breakInterval: newSettings.breakInterval,
      longBreakInterval: newSettings.longBreakInterval,
    };
    context.commit("updateSettings", settings);
    if(goal) {
      context.commit("updateDailyGoal", goal);
    }
  },

  //pushing hours
  updateHours(context) {
    const mins = context.rootState.timerModule.progressSeconds / 60;
    const hours = parseFloat((mins / 60)).toFixed(2);
    context.dispatch("pushHours", hours);
  },
  async pushHours(context, hours) {
    try {
      await fetch(`${process.env.VUE_APP_API}/update-hours`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hours: hours,
        }),
      });
    } catch (err) {
      this.$store.commit("updateModalType", "error");
      this.$store.commit("updateModalMessage", err.message);
      this.$store.commit("updateModalStatus");
    }
  },
};

export default actions;
