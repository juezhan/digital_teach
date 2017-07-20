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
import Wrapper from './comm/Wrapper/Wrapper.vue'
import InputCell from './comm/InputCell/InputCell.vue'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.component('search', Search)
Vue.component('wrapper', Wrapper)
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

// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  loadinginstace = ElementUI.Loading.service({fullscreen: true})
  const accessToken = sessionStorage.getItem('access_token')
  const userToken = sessionStorage.getItem('user_token')
  if (accessToken && userToken) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.AccessToken = accessToken
    config.headers.JSESSIONID = userToken
  }
  return config
}, error => {
  loadinginstace.close()
  ElementUI.Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  ElementUI.Message.error({
    message: '加载失败'
  })
  return Promise.reject(error)
})

