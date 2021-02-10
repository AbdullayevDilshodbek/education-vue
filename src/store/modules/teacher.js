import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
        data: {
            meta: {
                current_page: 0
            }
        },
    teacher_of_subject: [],
    params: {
        url: 'teacher?page=',
        body: {},
        method: 'get'
    }
};
const mutations = {
    SET_TEACHER: (state,data) => state.data = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
    SET_TEACHER_OF_SUBJECT: (state,data) => state.teacher_of_subject = data,
};
const getters = {
    getTeachers: state => state.data.data,
    getTeacherOfTheSubject: state => state.teacher_of_subject,
    getCurrentPage: state => state.data.meta.current_page
};
const actions = {
    getList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('SET_TEACHER', response.data);
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
    fetchTeacher({commit}){
        addTokenToAxios();
        axios.get('/teacher').then(response =>{
            commit('SET_TEACHER',response.data.data)
        }).catch(error =>{
            console.log(error)
        })
    },
    //bu tanlangan fanga oid o`qituvchilarni olib
    fetchTeacherOfSubject({commit},payload){
      addTokenToAxios();
      axios.get('/teachers_of_subject',{
          params:{
              subject_id: payload
          }
      }).then(response =>{
          commit('SET_TEACHER_OF_SUBJECT',response.data.data)
      }).catch(error =>{
          console.log(error)
      })
    },
    addNewTeacher({dispatch},payload){
        return new Promise(((resolve, reject) => {
            addTokenToAxios();
            axios.post('/teacher',payload).then(response =>{
                dispatch('fetchTeacher');
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
        }))
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}