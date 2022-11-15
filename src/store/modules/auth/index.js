import axios from "axios";

const state = {}
const getters = {};
const mutations = {};

const actions = {
    getToken(context, payload) {
        return new Promise(((resolve, reject) => {
            axios.post(process.env.VUE_APP_TOKEN, payload).then(response => {
                localStorage.access_token = response.data['access_token'];
                return resolve(response);
            }).catch(error => {
                return reject(error)
            })
        }))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}