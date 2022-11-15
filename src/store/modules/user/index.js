import axios from "@/utils/axios";

const state = {
    auth_user: {}
};
const getters = {}
const mutations = {
    'SET_AUTH_DATA': (state,{auth_user}) => {
        state.auth_user = auth_user
    }
}
const actions = {
    async authUser({commit}){
        try {
            const res = await axios.get('/auth_user')
            commit('SET_AUTH_DATA', {auth_user: res})
            localStorage.setItem('auth_user', JSON.stringify(res.data))
            return Promise.resolve(res.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}