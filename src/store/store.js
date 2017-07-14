/**
 * Created by Administrator on 2017/7/12.
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: '',
      token: '',
      id: 0
    },
    access_token: ''
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
export default store
