let timer;

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
    timer = setTimeout(() => {
      context.dispatch("postLogOut");
    }, 12 * 60 * 60 * 1000);
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
