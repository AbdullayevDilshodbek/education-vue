import axios from "@/utils/axios";

const state = {
    auth_user: {},
    data: {
        data: [],
        meta: {
            current_page: 1,
            last_page: 1
        }
    },
};
const getters = {
    users: state => state.data
}
const mutations = {
    'SET_AUTH_DATA': (state, { auth_user }) => {
        state.auth_user = auth_user
    },
    'SET_USERS': (state, data) => state.data = data
}
const actions = {
    async authUser({ commit }) {
        try {
            const res = await axios.get('/auth_user')
            commit('SET_AUTH_DATA', { auth_user: res })
            localStorage.setItem('auth_user', JSON.stringify(res.data))
            return Promise.resolve(res.data);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    async get({ commit }, payload) {
        try {
            const res = await axios.get(`/users?page=${payload.page}`, {
                params: {
                    search: payload.search
                }
            })
            commit('SET_USERS', res.data)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async create({ }, payload) {
        try {
            const res = await axios.post('users', payload)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async update({ }, payload) {
        try {
            const res = await axios.put(`users/${payload.id}`, payload)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async changeActive({ }, id) {
        try {
            const res = await axios.put(`user/change_active/${id}`)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
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