import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    student: [],
    students: [],
    active_students: []
};
const mutations = {
    SET_STUDENT: (state, data) => state.student = data,
    SET_STUDENTS: (state, data) => state.students = data,
    SET_ACTIVE_STUDENT: (state, data) => state.active_students = data
};
const getters = {
    getStudent: state => state.student,
    getStudents: state => state.students,
    getActiveStudents: state => state.active_students
};
const actions = {
    fetchStudent({commit}) {
        addTokenToAxios();
        axios.get('/student').then(response => {
            commit('SET_STUDENTS', response.data.data)
        }).catch(error => {
            console.log(error)
        })
    },
    fetchOneStudent({commit},student_id){
        addTokenToAxios();
        axios.get('/student/' + student_id).then(response => {
            commit('SET_STUDENT', response.data.data)
        }).catch(error => {
            console.log(error)
        })
    },
    fetchActiveStudents({commit}, payload) {
            addTokenToAxios();
            axios.post('/student/get_active_students', payload).then(response => {
                commit('SET_ACTIVE_STUDENT', response.data.data);
            }).catch(error => {
                return console.log(error)
            })
    },
    addNewStudent({dispatch}, payload) {
        return new Promise(((resolve, reject) => {
            addTokenToAxios();
            axios.post('/student', payload).then(response => {
                dispatch('fetchStudent');
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        }))
    },
    updateStudentData({dispatch}, payload) {
        return new Promise(((resolve, reject) => {
            addTokenToAxios();
            axios.put('student/' + payload.id, payload).then(response => {
                dispatch('fetchStudent');
                return resolve(response)
            }).catch(error => {
                return reject(error)
            })
        }))
    },
    changeStudentStatus({dispatch}, payload) {
        return new Promise(((resolve, reject) => {
            addTokenToAxios();
            axios.put('student/change_status/' + payload).then(response => {
                dispatch("fetchStudent");
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
    mutations,
    actions,
    getters
}