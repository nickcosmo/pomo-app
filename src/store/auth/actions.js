let timer;
let autoLogOutTime = 10 * 1000;
let interval;
// let autoLogOutTime = 12 * 60 * 60 * 1000;

const actions = {
  async pushSignIn(context, signInData) {
    const user = await fetch("http://localhost:3000/log-in", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    });
    if (user) {
      context.dispatch("setLogOut");
      localStorage.setItem("loggedIn", true);
      context.commit("changeAuthState", true);
    }
  },
  async tryLogIn(context) {
    if (localStorage.getItem("loggedIn")) {
      const user = await fetch("http://localhost:3000/auto-log-in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (user) {
        context.dispatch("setLogOut");
        localStorage.setItem("loggedIn", true);
        context.commit("changeAuthState", true);
      }
    }
  },
  async setLogOut(context) {
    if(context.state.logOutTimerId) {
      clearTimeout(context.state.logOutTimerId);
      clearInterval(interval);
      context.commit("resetLogOutTime");
      interval = setInterval(() => {
        context.commit("updateLogOutTime");
      }, 1000);
      timer = setTimeout(() => {
        context.dispatch("postLogOut");
      }, autoLogOutTime);
      context.commit("updateLogOutTimerId", timer);
    } else {
      interval = setInterval(() => {
        context.commit("updateLogOutTime");
      }, 1000);
      timer = setTimeout(() => {
        context.dispatch("postLogOut");
      }, autoLogOutTime);
      context.commit("updateLogOutTimerId", timer);
    }
  },
  async postLogOut(context) {
    const result = await fetch("http://localhost:3000/log-out", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result) {
      clearTimeout(timer);
      localStorage.removeItem("loggedIn");
      context.commit("changeAuthState", false);
    }
  },
};

export default actions;
