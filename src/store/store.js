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
    count: 1,
    access_token: null
  },
  mutations: {
    increment (state, payload) {
      state.access_token = payload.access_token
      state.user.name = payload.user_name
      state.user.token = payload.user_token
      state.user.id = payload.user_id
      state.count++
    }
  }
})
export default store
