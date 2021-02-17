import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import { VueMaskDirective } from 'v-mask';
import excel from 'vue-json-excel';

Vue.use(excel)
Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
Vue.directive('mask', VueMaskDirective);
new Vue({
  router,
  store,
  vuetify,
  axios,
  render: function (h) { return h(App) }
}).$mount('#app')
