// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store'

import Search from './comm/Search/Search.vue'
import InputCell from './comm/InputCell/InputCell.vue'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.component('search', Search)
Vue.component('input-cell', InputCell)
Vue.use(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {App}
})
