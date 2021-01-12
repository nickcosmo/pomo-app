import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const dashboard = {
  state() {
    return {
      dailyGoal: 0,
      totalHours: 0,
      todaysHours: 0,
      weeklyHours: 0,
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
  getters: getters,
  mutations: mutations,
  actions: actions
};

export default dashboard;
