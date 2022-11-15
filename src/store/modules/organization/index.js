import axios from "@/utils/axios"

const state = {
    data: {
        meta: {
            current_page: 1
        }
    },
    organizations: []
}
const getters = {
    get: state => state.data,
    organizations: state => state.organizations
}
const mutations = {
    'SET_ORGANIZATION': (state, data) => state.data = data,
    'SET_AUTOCOMPLETE_DATA': (state, data) => state.organizations = data
}
const actions = {
    async get({ commit }, payload) {
        try {
            const organizations = await axios.get(`/organizations?page=${payload.page}`, {
                params: {
                    search: payload.search
                }
            })
            commit('SET_ORGANIZATION', organizations.data)
            return Promise.resolve(organizations.data)
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async loadOrganizationTree({ commit }, id) {
        try {
            const data = await axios.get(`organization/for_auto_complete`, {
                params: {
                    id
                }
            })
            commit('SET_AUTOCOMPLETE_DATA', data.data)
            return Promise.resolve(data.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },

    async update({ dispatch }, payload) {
        try {
            const res = await axios.put(`/organizations/${payload.id}`, {
                ...payload
            })
            dispatch('get')
            return Promise.resolve(res)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async changeActive({ dispatch }, id) {
        try {
            const res = await axios.put(`organization/change_active/${id}`)
            return Promise.resolve(res)
        } catch (error) {
            Promise.reject(error)
        }
    },
    async create({ dispatch }, payload) {
        try {
            const res = await axios.post('organizations', payload)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}