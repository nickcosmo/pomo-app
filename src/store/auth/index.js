import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const authModule = {
    state: () => {
        return {
            isLoggedin: false,
        }
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}

export default authModule;