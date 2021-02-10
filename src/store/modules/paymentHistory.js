import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    data: {
        meta: {
            current_page: 0
        }
    },
    params: {
        url: 'paymentHistory/teacher?page=',
        body: {},
        method: 'get'
    }
};
const mutations = {
    SET_HISTORY: (state,data) => state.data = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
};
const getters = {
    getPaymentHistory: state => state.data.data,
    getCurrentPage: state => state.data.meta.current_page
};
const actions = {
    getLists({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('SET_HISTORY', response.data);
                    state.params.url = params.url;
                    state.params.body = params.body;
                    state.params.method = params.method;
                    commit('setCurrentPage', response.data.meta.current_page);
                    return resolve(response)
                }).catch(error => {
                return reject(error)
            })
        })
    },
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

