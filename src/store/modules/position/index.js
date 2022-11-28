import axios from "@/utils/axios"

const state = {
    data: {
        meta: {
            current_page: 1,
            last_page: 1
        }
    },
    positions: []
}
const getters = {
    get: state => state.data,
    allPositions: state => state.positions
}
const mutations = {
    'SET_POSITIONS': (state, data) => state.data = data,
    'SET_ALL_POSITIONS': (state, data) => state.positions = data.data
}
const actions = {
    async get({ commit }, payload) {
        try {
            const res = await axios.get(`/positions?page=${payload.page}`, {
                params: {
                    search: payload.search
                }
            })
            commit('SET_POSITIONS', res.data)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async create({ }, payload) {
        try {
            const res = await axios.post('/positions', payload)
            return Promise.resolve(res.data);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async update({ }, payload) {
        try {
            const res = await axios.put(`/positions/${payload.id}`, payload)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async changeActive({ }, id) {
        try {
            const res = await axios.put(`position/change_active/${id}`)
            return Promise.resolve(res.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    async allPositions({commit}){
        try {
            const res = await axios.get('position/for_auto_complete') 
            commit('SET_ALL_POSITIONS', res.data)
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