export default {
  updateDailyGoal: (state, newGoal) => (state.dailyGoal = newGoal),
  updateHours: (state, progress) => {
    state = {
      dailyGoal: state.dailyGoal,
      ...progress,
    };
  },
};
