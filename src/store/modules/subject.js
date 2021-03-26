import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    subject: [],
    params: {
        url: "/subject?page=",
        body: {},
        method: "get",
    },
}
const mutations = {
    SET_SUBJECT: (state,data) => state.subject = data
}
const actions = {
    fetchSubject({commit}){
        addTokenToAxios();
        axios.get('/subject').then(response =>{
            commit('SET_SUBJECT',response.data)
        }).catch(error =>{
            console.log(error)
        })
    },
    addNewSubject({dispatch},payload){
      return new Promise(((resolve, reject) => {
          addTokenToAxios()
          axios.post('/subject', payload).then(response =>{
               dispatch('getList')
              return resolve(response)
          }).catch(error =>{
                return reject(error)
          })
      }))
    },
    updateSubjectData({dispatch},payload){
        return new Promise(((resolve, reject) => {
            addTokenToAxios()
            axios.put('subject/' + payload.id,payload).then(response => {
                dispatch('getList');
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
        }))
    },
    changeSubjectStatus({dispatch},payload){
        return new Promise(((resolve, reject) => {
            addTokenToAxios()
            axios.put('subject/change_status/'+ payload).then(response => {
                dispatch('getList');
                return resolve(response)
            }).catch(error =>{
                return reject(error)
            })
        }))
    },
    getList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('SET_SUBJECT', response.data);
                    state.params.url = params.url;
                    state.params.body = params.body;
                    state.params.method = params.method;
                    return resolve(response)
                }).catch(error => {
                return reject(error)
            })
        })
    },
}
const getters = {
    getSubjects: state => state.subject.data
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}