export default {
    updateHours(context) {
        let mins = context.rootState.timeSettings.studyInterval/60;
        const hours = mins.toFixed(2); 
        context.commit("updateHours", hours);
        context.dispatch("pushHours");
    },
    updateDailyGoal(context, goal) {
        context.commit("updateDailyGoal", goal);
    },
    async pushHours(context) {
        const studyData = context.state; 
        
        let user = await fetch("http://localhost:3000/update-hours", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(studyData),
        })

        const userData = await user.json();
        console.log("Updates Completed", userData);
    }
}