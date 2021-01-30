import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from "axios"
import token from "./modules/token"
import user from "./modules/users";
import subject from "./modules/subject";
import teacher from "./modules/teacher";
import student from "./modules/student";
import group from "./modules/group";
import group_to_student from "./modules/group_to_student";
import payment from "./modules/payment";
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    token,
    user,
    subject,
    teacher,
    student,
    group,
    group_to_student,
    payment
  }
})
