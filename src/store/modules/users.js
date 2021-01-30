import addTokenToAxios from './addTokenToAxios'
import axios from "axios";

const state = {
    data: [],
    params: {
        url: "/users?page=",
        body: {},
        method: "get",
    },
};
const mutations = {
    SET_USER: (state, data) => state.data = data,
    setCurrentPage(state, data) {
        state.data.meta['current_page'] = data;
    },
};
const getters = {
    getUsers: state => state.data.data,
};

const actions = {
    fetchUser({commit},params) {
        addTokenToAxios();
        axios.get('/users')
            .then(response =>{
            commit('SET_USER',response.data)
        }).catch(error =>{
            console.log(error);
        })
    },
    searchUsers({commit},payload) {
        addTokenToAxios();
        axios.get('/users',{
            params:{
                user_id: payload
            }
        }).then(response =>{
            commit('SET_USER',response.data)
        }).catch(error =>{
            console.log(error);
        })
    },
    addUser({dispatch},payload){
      return new Promise(((resolve, reject) => {
          addTokenToAxios();
          axios.post('/users',payload).then(response => {
              dispatch('fetchUser');
              return resolve(response);
          }).catch(error =>{
                return reject(error);
          })
      }))
    },
    updateUser({dispatch},payload){
      return new Promise(((resolve, reject) => {
          addTokenToAxios();
          axios.put('users/' + payload.id,payload).then(response => {
              dispatch('fetchUser');
              return resolve(response)
          }).catch(error=>{
                reject(error)
          })
      }))
    },
    changeStatus({dispatch},payload){
        return new Promise(((resolve, reject) => {
            addTokenToAxios();
            axios.put('user/change_status/' + payload).then(response =>{
                dispatch('fetchUser');
                return resolve(response);
            }).catch(error =>{
                    reject(error)
            })
        }))
    },
    getList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            addTokenToAxios();
            axios[params.method](params.url + params.pageNumber, params.body)
                .then(response => {
                    commit('SET_USER', response.data);
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

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}