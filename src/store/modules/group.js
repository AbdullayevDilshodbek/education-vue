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
    },
    attendance: []
};
const mutations = {
    SET_GROUP: (state, data) => state.data = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
    SET_ONE_GROUP: (state,data) => state.group = new Array(1).fill(data),
    SET_ATTENDANCE: (state,data) => state.attendance = data
};
const getters = {
    getGroups: state => state.data.data,
    getGroup: state => state.group,
    getCurrentPage: state => state.data.meta.current_page,
    getAttendance: state => state.attendance
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
        addTokenToAxios();
        axios.get('/group/' + student_id).then(response => {
            commit('SET_ONE_GROUP', response.data.data)
        }).catch(error => {
            console.log(error)
        })
    },
    fetchAttendance({commit},group_id){
        addTokenToAxios();
        return new Promise((resolve, reject) => {
            axios.get('/attendance',{
                params: {
                    group_id: group_id
                }
            }).then(response =>{
                commit('SET_ATTENDANCE',response.data.data)
                resolve(response)
            }).catch(error =>{
                reject(error)
            })
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}