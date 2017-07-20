/**
 * Created by Administrator on 2017/7/17.
 */

export let dc = getDC()

export function getDC() {
  let d = new Date()
  return d.getTime()
}

export let accessToken = (function () {
  return sessionStorage.getItem('access_token')
})()

export function getAccessToken() {
  return sessionStorage.getItem('access_token')
}
