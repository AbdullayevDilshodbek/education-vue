import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    teacher: [],
    teacher_of_subject: []
};
const mutations = {
    SET_TEACHER: (state,data) => state.teacher = data,
    SET_TEACHER_OF_SUBJECT: (state,data) => state.teacher_of_subject = data
};
const getters = {
    getTeachers: state => state.teacher,
    getTeacherOfTheSubject: state => state.teacher_of_subject
};
const actions = {
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
    updateTeacherData({dispatch},payload){
        addTokenToAxios();
        return new Promise(((resolve, reject) => {
            axios.put('/teacher/' + payload.id,payload).then(response =>{
                dispatch('fetchTeacher');
                resolve(response)
            }).catch(error =>{
                reject(error)
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