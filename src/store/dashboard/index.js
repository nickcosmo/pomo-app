const dashboard = {
  state() {
    return {};
  },
  getters: {},
  mutations: {
    updateDailyGoal: (state, newGoal) => (state.dailyGoal = newGoal),
    updateHours: (state, progress) => {
      state = {
        dailyGoal: state.dailyGoal,
        ...progress,
      };
    },
  },
  actions: {
    updateHours(context) {
      const mins = context.rootState.timerModule.progressSeconds / 60;
      const hours = parseFloat((mins / 60).toFixed(2));
      context.dispatch("pushHours", hours);
    },
    async pushHours(context, hours) {
      try {
        await fetch("http://localhost:3000/update-hours", {
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
  },
};

export default dashboard;
