/**
 * axios 配置文件
 * Created by Administrator on 2017/7/21.
 */
import axios from 'axios'
import ElementUI from 'element-ui'

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
axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  ElementUI.Message.error({
    showClose: true,
    message: '加载失败'
  })
  return Promise.reject(error)
})

export default axios
