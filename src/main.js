// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import axios from './axios/axios-config'
import VueAxios from 'vue-axios'
import store from './store/store'

import Search from './comm/Search/Search.vue'
import Wrapper from './comm/Wrapper/Wrapper.vue'
import KalixDialog from './comm/KalixDialog/KalixDialog.vue'
import InputCell from './comm/InputCell/InputCell.vue'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.component('search', Search)
Vue.component('kalix-wrapper', Wrapper)
Vue.component('input-cell', InputCell)
Vue.component('kalix-dialog', KalixDialog)
Vue.use(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {App}
})
