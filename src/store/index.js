import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth/index';
import user from './modules/user/index';
import organization from './modules/organization/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    organization
  }
})
