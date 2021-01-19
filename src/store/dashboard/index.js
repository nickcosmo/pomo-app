import actions from "./actions.js";

const dashboard = {
  state() {
    return {
      dailyGoal: 0,
      totalHours: 0,
      todaysHours: 0,
      weekHours: 0,
      week: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
    };
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
  actions: actions,
};

export default dashboard;
