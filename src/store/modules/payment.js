import axios from 'axios';
import addHeaderToken from "./addTokenToAxios";

const state = {
    payment: []
};
const mutations = {
    SET_PAYMENT: (state,data) => state.payment = data
};
const actions = {
    fetchPayment({commit},params){
        addHeaderToken();
        // axios.get('')
    },
    PaymentActions({dispatch},params){
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
const getters = {
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}