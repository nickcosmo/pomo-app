export default {
    updateHours(context) {
        let mins = context.rootState.timerModule.progressSeconds/60;
        const hours = parseFloat((mins/60).toFixed(2));
        context.dispatch("pushHours", hours);
    },
    updateDailyGoal(context, goal) {
        context.commit("updateDailyGoal", goal);
    },
    async pushHours(context, hours) {        
        let user = await fetch("http://localhost:3000/update-hours", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hours: hours
            }),
        })

        const userData = await user.json();
        context.commit("updateHours", userData.progress);
    },

}