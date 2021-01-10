import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const authModule = {
    // namespaced: true,
    state: () => {
        return {
            isLoggedin: false,
            logOutTime: 10000,
            logOutTimerId: null
        }
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}

export default authModule;