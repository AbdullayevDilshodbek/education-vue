import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    data: [],
    active_students: [],
    params: {
        url: "student?page=",
        body: {},
        method: "get",
    },
};
const mutations = {
    SET_STUDENTS: (state, data) => state.data = data,
    SET_ACTIVE_STUDENT: (state, data) => state.active_students = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
};
const getters = {
    getStudents: state => state.data.data,
    getActiveStudents: state => state.active_students,
    getCurrentPage: state => state.data.meta.current_page
};
const actions = {
    getList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('SET_STUDENTS', response.data);
                    state.params.url = params.url;
                    state.params.body = params.body;
                    state.params.method = params.method;
                    return resolve(response)
                }).catch(error => {
                return reject(error)
            })
        })
    },
    universalCrud({state, commit, dispatch},param) {
        return new Promise((resolve, reject) => {
            addTokenToAxios()
            axios[param.method]( param.url, param.body)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err.response.data);
                });
        });
    },
    fetchActiveStudents({commit}, payload) {
        addTokenToAxios();
        axios.post('/student/get_active_students', payload).then(response => {
            commit('SET_ACTIVE_STUDENT', response.data.data);
        }).catch(error => {
            return console.log(error)
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