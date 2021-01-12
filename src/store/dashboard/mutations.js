export default {
    updateDailyGoal: (state, newGoal) => state.dailyGoal = newGoal,
    updateHours: (state, hours) => {
        state.totalHours = state.totalHours + hours;
        state.todaysHours = state.todaysHours + hours;
        state.weeklyHours = state.weeklyHours + hours;
        //add logic for updating day of week
        const day = new Date;
        const today = day.getDay();

        if(today === 0) {
            state.week.sunday = state.week.sunday + hours;
        } else if(today === 1) {
            state.week.monday = state.week.monday + hours;
        } else if(today === 2) {
            state.week.tuesday = state.week.tuesday + hours;
        } else if(today === 3) {
            state.week.wednesday = state.week.wednesday + hours;            
        } else if(today === 4) {
            state.week.thursday = state.week.thursday + hours;            
        } else if(today === 5) {
            state.week.friday = state.week.friday + hours;
        } else if(today === 6) {
            state.week.saturday = state.week.saturday + hours;
        }
    }
}