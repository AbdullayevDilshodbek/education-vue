import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    data: {
        meta: {
            current_page: 0
        }
    },
    group: [],
    params: {
        url: 'group?page=',
        body: {},
        method: 'get'
    }
};
const mutations = {
    SET_GROUP: (state, data) => state.data = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
    SET_ONE_GROUP: (state,data) => state.group = new Array(1).fill(data)
};
const getters = {
    getGroups: state => state.data.data,
    getGroup: state => state.group,
    getCurrentPage: state => state.data.meta.current_page

};
const actions = {
    getList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('SET_GROUP', response.data);
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
    GroupAction({dispatch},params){
        return new Promise(((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    return resolve(response)
                }).catch(error => {
                return reject(error)
            })
        }))
    },
    fetchGroup({commit},student_id) {
        axios.get('/group/' + student_id).then(response => {
            commit('SET_ONE_GROUP', response.data.data)
        }).catch(error => {
            console.log(error)
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