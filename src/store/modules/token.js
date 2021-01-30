import axios from "axios";
const actions = {
    getToken({},payload){
        return new Promise(((resolve, reject) => {
            axios.post(process.env.VUE_APP_AUTH_URL,payload.body).then(response => {
                localStorage.token_type = response.data['token_type'];
                localStorage.token = response.data['access_token'];
                console.log(localStorage.token)
                return resolve(response);
            }).catch(error =>{
               return reject(error)
            })
        }))
    }
}

export default {
    namespaced: true,
    actions,
}