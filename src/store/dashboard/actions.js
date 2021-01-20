export default {
  updateHours(context) {
    const mins = context.rootState.timerModule.progressSeconds / 60;
    const hours = parseFloat((mins / 60).toFixed(2));
    context.dispatch("pushHours", hours);
  },
  updateDailyGoal(context, goal) {
    context.commit("updateDailyGoal", goal);
  },
  async pushHours(context, hours) {
    try {
      let user = await fetch("http://localhost:3000/update-hours", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hours: hours,
        }),
      });

      const userData = await user.json();
      context.commit("updateHours", userData.progress);
    } catch (err) {
      this.$store.commit("updateModalType", "error");
      this.$store.commit("updateModalMessage", err.message);
      this.$store.commit("updateModalStatus");
    }
  },
};
