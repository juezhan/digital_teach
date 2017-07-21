/**
 * Created by Administrator on 2017/7/21.
 */
import ElementUI from 'element-ui'
export default {
  message(_type, _msg, _showClose = true) {
    ElementUI.Message.message({
      type: _type,
      showClose: _showClose,
      message: _msg
    })
  },
  success(_msg, _showClose = true) {
    this.message('success', _msg, _showClose)
  },
  warning(_msg, _showClose = true) {
    this.message('warning', _msg, _showClose)
  },
  error(_msg, _showClose = true) {
    this.message('error', _msg, _showClose)
  },
  info(_msg, _showClose = true) {
    this.message('info', _msg, _showClose)
  }
}
