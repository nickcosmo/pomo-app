let timer;
// let autoLogOutTime = 10 * 1000;
let warningTime = 5 * 60 * 1000;
let interval;
let autoLogOutTime = 8 * 60 * 60 * 1000;

const actions = {
  async pushSignIn(context, signInData) {
    const result = await fetch("http://localhost:3000/log-in", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    });
    const resultData = await result.json();
    if (result.status === 200) {
      context.dispatch("setLogOut");
      context.dispatch(
        "updateSettings",
        resultData.settings,
        resultData.settings.dailyGoal
      );
    }
    const response = { status: result.status, ...resultData };
    return response;
  },
  async tryLogIn(context) {
    try {
      const user = await fetch("http://localhost:3000/auto-log-in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (user) {
        const userData = await user.json();
        context.dispatch("setLogOut");
        context.dispatch("updateSettings", userData.settings);
        context.commit("updateDailyGoal", userData.settings.dailyGoal);
      }
    } catch (err) {
      context.commit("updateModalType", "error");
      context.commit("updateModalMessage", err.message);
      context.commit("updateModalStatus");
    }
  },
  async setLogOut(context) {
    if (context.state.logOutTimerId) {
      clearTimeout(context.state.logOutTimerId);
      clearInterval(interval);
      context.commit("resetLogOutTime", autoLogOutTime);
    }
    interval = setInterval(() => {
      context.commit("updateLogOutTime");
      if (context.state.logOutTime === warningTime) {
        context.commit("updateModalType", "logout");
        context.commit(
          "updateModalMessage",
          "You have been studying for a while.  Do you want to continue?"
        );
        context.commit("updateModalStatus");
      }
    }, 1000);
    timer = setTimeout(() => {
      context.commit("updateModalStatus");
      context.dispatch("postLogOut");
    }, autoLogOutTime);
    context.commit("updateLogOutTimerId", timer);
  },
  async postLogOut(context) {
    try {
      const result = await fetch("http://localhost:3000/log-out", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result) {
        context.commit("updateLogInState", false);
        clearTimeout(context.state.logOutTimerId);
        clearInterval(interval);
      }
    } catch (err) {
      context.commit("updateModalType", "error");
      context.commit("updateModalMessage", err.message);
      context.commit("updateModalStatus");
    }
  },
  async postSettings(context) {
    const settings = {
      ...context.rootState.timerModule.timeSettings,
      dailyGoal: context.rootState.timerModule.dailyGoal,
    };
    try {
      const user = await fetch("http://localhost:3000/update-settings", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      const userData = await user.json();
      context.dispatch(
        "updateSettings",
        userData.settings,
        userData.settings.dailyGoal
      );
    } catch (err) {
      context.commit("updateModalType", "error");
      context.commit("updateModalMessage", err.message);
      context.commit("updateModalStatus");
    }
  },
};

export default actions;
