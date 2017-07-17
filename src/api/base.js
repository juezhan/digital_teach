/**
 * Created by Administrator on 2017/7/17.
 */

export let dc = getDC()

export function getDC() {
  let d = new Date()
  return d.getTime()
}

export const accessToken = sessionStorage.getItem('access_token')
