import axios from 'axios';
import addHeaderToken from "./addTokenToAxios";

const state = {
    data: {
        meta: {
            current_page: 0
        }
    },
    params: {
        url: "group_to_student/students_of_the_group?page=",
        body: {},
        method: "get",
    },
};
const getters = {
    getStudentsOfGrup: state => state.data.data,
    getCurrentPage: state => state.data.meta.current_page
};
const mutations = {
    setItems: (state, data) => state.data = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
};

const actions = {
    getList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addHeaderToken();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('setItems', response.data);
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
    StudentsOfGroup({dispatch},params){
        return new Promise(((resolve, reject) => {
            addHeaderToken();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    return resolve(response)
                }).catch(error => {
                return reject(error)
            })
        }))
    }

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
