import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const authModule = {
    // namespaced: true,
    state: () => {
        return {
            logOutTime: 10000,
            logOutTimerId: null,
            isLoggedIn: false,
        }
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}

export default authModule;