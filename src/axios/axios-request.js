/**
 * axios 请求
 * Created by 桑杨 on 2017/7/21.
 */
import Vue from "vue";
import {getDC} from "api/base";

export default {
  get(_params) {
    return this.request(Object.assign({method: 'GET'}, _params))
  },
  post(_params) {
    return this.request(Object.assign({method: 'POST'}, _params))
  },
  delete(_params) {
    return this.request(Object.assign({method: 'DELETE'}, _params))
  },
  request(_params) {
    let params = _params || {}
    params.params = Object.assign(params.params, {_dc: getDC()})
    return Vue.axios(params)
  }
}
